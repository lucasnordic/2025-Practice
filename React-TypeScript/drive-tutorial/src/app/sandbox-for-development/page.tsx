import { db } from '~/server/db'

import { mockDriveFolders } from './mock-data'
import { folders_table as folders } from '~/server/db/schema'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'

export default async function SandboxPage() {
  const user = await auth()
  if (!user.userId) {
    throw new Error('Unauthorized or user not found')
  }
  const foldersNew = await db
    .select()
    .from(folders)
    .where(eq(folders.ownerId, user.userId))

  console.log(foldersNew)

  const handleSubmit = async () => {
    'use server'

    const user = await auth()
    if (!user.userId) {
      throw new Error('Unauthorized or user not found')
    }

    try {
      const rootFolder = await db
        .insert(folders)
        .values({
          name: 'root',
          ownerId: user.userId,
          parentId: null,
        })
        .$returningId()

      const iterableFolders = mockDriveFolders.map((folder) => ({
        name: folder.name,
        ownerId: user.userId,
        parentId: rootFolder[0]!.id,
      }))

      await db.insert(folders).values(iterableFolders)

      // log
      console.log('Inserted')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1>Seed Function</h1>
      <form action={handleSubmit}>
        <button type="submit">Seed</button>
      </form>
    </div>
  )
}

// const folderInsert = await db.insert(folders).values(
//   mockDriveFolders.map((folder, index) => ({
//     id: index + 1,
//     name: folder.name,
//     parentId: index !== 0 ? 1 : 1, // TODO: fix this
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     size: 0,
//   }))
// )

// const fileInsert = await db.insert(files).values(
//   mockDriveFiles.map((file, index) => ({
//     id: index + 1,
//     name: file.name,
//     parentId: (index % 3) + 1,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     size: 0,
//     url: file.url,
//   }))
// )

// const folderIndex = 7

// // insert a folder in the 7th folder, then another folder in that folder, 10 times
// for (let i = folderIndex; i < folderIndex + 10; i++) {
//   await db.insert(folders).values({
//     id: i + 1,
//     name: `Folder ${i + 1}`,
//     parentId: i,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     size: 0,
//   })
// }

// console.log(folderInsert, fileInsert)
