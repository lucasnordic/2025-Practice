import 'server-only'

import type { DbFile, DbFolder } from '~/types/drive-types'
import { db } from '~/server/db'
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from '~/server/db/schema'
import { eq } from 'drizzle-orm'
import { ROOT_FOLDER_ID } from '~/utils/drive'

export const QUERIES = {
  getAllParentsForFolder: async function (
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
  },

  getFiles: function (folderId: number): Promise<DbFile[]> {
    return db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parentId, folderId))
      .orderBy(filesSchema.name)
  },

  getFolders: function (folderId: number): Promise<DbFolder[]> {
    return db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parentId, folderId))
      .orderBy(foldersSchema.name)
  },
}

// TODO: define another type for createfileinput?
export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string
      size: number
      url: string
    }
    userId: string
  }) {
    return await db.insert(filesSchema).values({
      ...input.file,
      parentId: ROOT_FOLDER_ID,
    })
  },
}
