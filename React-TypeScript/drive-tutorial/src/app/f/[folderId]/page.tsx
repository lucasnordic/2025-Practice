import { auth } from '@clerk/nextjs/server'
import DriveUI from '~/components/drive-ui'
import { QUERIES } from '~/server/db/queries'

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
    const user = await auth()
    if (!user.userId) throw new Error('Unauthorized')
    const folder = await QUERIES.getFolderById(parsedFolderId)
    if (!folder) throw new Error('Folder not found')
    if (folder.ownerId !== user.userId) throw new Error('Unauthorized')

    const [files, folders, parents] = await Promise.all([
      QUERIES.getFiles(parsedFolderId),
      QUERIES.getFolders(parsedFolderId),
      QUERIES.getAllParentsForFolder(parsedFolderId),
    ])

    return (
      <DriveUI
        files={files}
        folders={folders}
        parents={parents}
        currentFolderId={parsedFolderId}
      />
    )
  } catch (error) {
    console.error('Error loading files and folders from db', error)
    return (
      <DriveUI
        files={[]}
        folders={[]}
        parents={[]}
        currentFolderId={parsedFolderId}
      />
    )
  }
}
