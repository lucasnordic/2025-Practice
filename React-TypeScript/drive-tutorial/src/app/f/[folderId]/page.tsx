import DriveUI from '~/components/drive-ui'
import {
  getFiles,
  getFolders,
  getAllParentsForFolder,
} from '~/server/db/queries'

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
    const [folders, files, parents] = await Promise.all([
      getFiles(parsedFolderId),
      getFolders(parsedFolderId),
      getAllParentsForFolder(parsedFolderId),
    ])

    return <DriveUI files={files} folders={folders} parents={parents} />
  } catch (error) {
    console.error('Error loading files and folders from db', error)
    return <DriveUI files={[]} folders={[]} parents={[]} />
  }
}
