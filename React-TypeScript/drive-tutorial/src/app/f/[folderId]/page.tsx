import DriveUI from '~/components/drive-ui'
import { type DbFolder } from '~/types/drive-types'
import { db } from '~/server/db'
import {
  files as filesSchema,
  folders as foldersSchema,
} from '~/server/db/schema'
import { eq } from 'drizzle-orm'

async function getAllParents(folderId: number): Promise<DbFolder[]> {
  const parents: DbFolder[] = []
  let currentId: number | null = folderId

  while (currentId !== null) {
    const folder = await db
      .selectDistinct()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, currentId))

    if (!folder[0]) {
      throw new Error('Parent folder not found')
    }

    parents.push(folder[0])
    currentId = folder[0]?.parentId
  }

  return parents
}

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
    const filesPromise = db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parentId, parsedFolderId))
      .orderBy(filesSchema.name)

    const foldersPromise = db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parentId, parsedFolderId))
      .orderBy(foldersSchema.name)

    const parentsPromise = getAllParents(parsedFolderId)

    const [folders, files, parents] = await Promise.all([
      foldersPromise,
      filesPromise,
      parentsPromise,
    ])

    return <DriveUI files={files} folders={folders} parents={parents} />
  } catch (error) {
    console.error('Error loading files and folders from db', error)
    return <DriveUI files={[]} folders={[]} parents={[]} />
  }
}
