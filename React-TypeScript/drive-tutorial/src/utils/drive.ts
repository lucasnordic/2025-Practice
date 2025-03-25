// utils/drive.ts
import type {
  DriveItem,
  FileItem,
  FolderItem,
  FolderId,
} from '../types/drive-types'
import type { folders } from '~/server/db/schema'

export const ROOT_FOLDER_ID = 1 // equal to the id of the root folder in the database

export function isFile(item: DriveItem): item is FileItem {
  return item.type === 'file'
}

export function isFolder(item: DriveItem): item is FolderItem {
  return item.type === 'folder'
}

export const isRootFolder = (id: FolderId): boolean => {
  return id === ROOT_FOLDER_ID
}

export const getParentFolderId = (
  items: (typeof folders.$inferInsert)[],
  id: FolderId
): FolderId => {
  const item = items.find((item) => item.id === id)
  return item?.parentId ?? ROOT_FOLDER_ID
}

export const getFolderPath = (
  items: (typeof folders.$inferInsert)[],
  targetId: FolderId
): (typeof folders.$inferInsert)[] => {
  const path: (typeof folders.$inferInsert)[] = []
  let currentId: FolderId | null = targetId

  while (currentId !== ROOT_FOLDER_ID) {
    const item = items.find((item) => item.id === currentId)
    if (!item) break
    path.unshift(item)
    currentId = item.parentId ?? null
  }

  return path
}
