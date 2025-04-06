import { auth } from '@clerk/nextjs/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { z } from 'zod'
import { MUTATIONS, QUERIES } from '~/server/db/queries'
const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .input(z.object({ folderId: z.number() }))

    // Set permissions and file types for this FileRoute
    .middleware(async ({ input }) => {
      const user = await auth()

      // eslint-disable-next-line @typescript-eslint/only-throw-error
      if (!user.userId) throw new UploadThingError('Unauthorized')
      const folder = await QUERIES.getFolderById(input.folderId)
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      if (!folder) throw new UploadThingError('Folder not found')
      if (folder.ownerId !== user.userId)
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw new UploadThingError('Unauthorized')

      return { userId: user.userId, parentId: input.folderId } // What is returned here is accessible in onUploadComplete as `metadata`
    })

    // This code RUNS ON YOUR SERVER after upload
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId)
      console.log('file url', file.ufsUrl)

      await MUTATIONS.createFile({
        file: {
          name: file.name,
          size: file.size,
          url: file.ufsUrl,
          parentId: metadata.parentId, // TODO: use the folderId from the client
        },
        userId: metadata.userId,
      })

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
