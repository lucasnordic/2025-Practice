import DriveUI from '~/components/drive-ui'
import { db } from '~/server/db'
import {
  files as filesSchema,
  folders as foldersSchema,
} from '~/server/db/schema'

export default async function Home() {
  try {
    const files = await db.select().from(filesSchema).orderBy(filesSchema.name)
    const folders = await db
      .select()
      .from(foldersSchema)
      .orderBy(foldersSchema.name)

    return <DriveUI files={files} folders={folders} />
  } catch (error) {
    console.error('Error loading files and folders from db', error)
    return <DriveUI files={[]} folders={[]} />
  }
}
