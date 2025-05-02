// utils/drive.ts
import { Root } from '@radix-ui/react-slot'
import type {
  DriveItem,
  FileItem,
  FolderItem,
  FolderId,
} from '../types/drive-types'
import type { folders_table as folders } from '~/server/db/schema'

export function isFile(item: DriveItem): item is FileItem {
  return item.type === 'file'
}

export function isFolder(item: DriveItem): item is FolderItem {
  return item.type === 'folder'
}

export const getParentFolderId = (
  items: (typeof folders.$inferInsert)[],
  id: FolderId
): FolderId => {
  const item = items.find((item) => item.id === id)
  return item?.parentId ?? null
}

export const getFolderPath = (
  items: (typeof folders.$inferInsert)[],
  targetId: FolderId,
  RootFolderId: number
): (typeof folders.$inferInsert)[] => {
  const path: (typeof folders.$inferInsert)[] = []
  let currentId: FolderId | null = targetId

  while (currentId !== RootFolderId) {
    const item = items.find((item) => item.id === currentId)
    if (!item) break
    path.unshift(item)
    currentId = item.parentId ?? null
  }

  return path
}
