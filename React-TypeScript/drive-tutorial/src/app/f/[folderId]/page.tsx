import DriveUI from '~/components/drive-ui'
import { db } from '~/server/db'
import {
  files as filesSchema,
  folders as foldersSchema,
} from '~/server/db/schema'
import { eq } from 'drizzle-orm'
import { cache } from 'react'

export default async function DriveItemPage(props: {
  params: Promise<{ folderId: string }>
}) {
  const params = await props.params
  const parsedFolderId = parseInt(params.folderId)

  if (isNaN(parsedFolderId) || parsedFolderId <= 0) {
    return (
      <div className="flex h-full w-full items-center justify-center p-4">
        <h1 className="text-2xl font-bold">Invalid folder ID</h1>
      </div>
    )
  }

  try {
    const getFiles = cache(async (folderId: number) => {
      return await db
        .select()
        .from(filesSchema)
        .where(eq(filesSchema.parentId, folderId))
        .orderBy(filesSchema.name)
    })
    const files = await getFiles(parsedFolderId)

    const getFolders = cache(async (folderId: number) => {
      return await db
        .select()
        .from(foldersSchema)
        .where(eq(foldersSchema.parentId, folderId))
        .orderBy(foldersSchema.name)
    })
    const folders = await getFolders(parsedFolderId)

    return <DriveUI files={files} folders={folders} />
  } catch (error) {
    console.error('Error loading files and folders from db', error)
    return <DriveUI files={[]} folders={[]} />
  }
}
