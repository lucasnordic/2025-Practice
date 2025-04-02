import { type DbFolder } from '~/types/drive-types'
import { db } from '~/server/db'
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from '~/server/db/schema'
import { eq } from 'drizzle-orm'

export async function getAllParentsForFolder(
  folderId: number
): Promise<DbFolder[]> {
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

    parents.unshift(folder[0])
    currentId = folder[0]?.parentId
  }

  return parents
}

export async function getFiles(folderId: number) {
  return db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parentId, folderId))
    .orderBy(filesSchema.name)
}

export async function getFolders(folderId: number) {
  return db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parentId, folderId))
    .orderBy(foldersSchema.name)
}
