'use server'

import { eq, and } from 'drizzle-orm'
import { db } from './db'
import { files_table, folders_table } from './db/schema'
import { auth } from '@clerk/nextjs/server'
import { UTApi } from 'uploadthing/server'
import { cookies } from 'next/headers'

const utApi = new UTApi()
const URL = 'https://lzsl120kv7.ufs.sh/f/'

export async function deleteFile(id: number) {
  const session = await auth()
  if (!session.userId) throw new Error('User not authenticated')

  const [file] = await db
    .select()
    .from(files_table)
    .where(and(eq(files_table.id, id), eq(files_table.ownerId, session.userId)))

  if (!file) throw new Error('File not found or not owned by user')

  try {
    const resultOfDelete = await utApi.deleteFiles([file.url.replace(URL, '')])

    const dbDeleteResult = await db
      .delete(files_table)
      .where(
        and(eq(files_table.id, id), eq(files_table.ownerId, session.userId))
      )

    console.log('Result of deleteFiles:', resultOfDelete)
    console.log('DB delete result:', dbDeleteResult)

    const c = await cookies()

    c.set('force-refresh', JSON.stringify(Math.random()))
  } catch (error) {
    console.log(error)
  }

  return { success: true, message: 'File deleted successfully' }
}
