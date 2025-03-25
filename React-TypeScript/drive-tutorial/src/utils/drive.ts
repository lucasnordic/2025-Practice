// utils/drive.ts
import type {
  DriveItem,
  FileItem,
  FolderItem,
  FolderId,
} from '../types/drive-types'

export const ROOT_FOLDER_ID = 'root'

export function isFile(item: DriveItem): item is FileItem {
  return item.type === 'file'
}

export function isFolder(item: DriveItem): item is FolderItem {
  return item.type === 'folder'
}

export function isRootFolder(id: FolderId | null): id is typeof ROOT_FOLDER_ID {
  return id === ROOT_FOLDER_ID
}

export function getParentFolderId(
  items: DriveItem[],
  currentFolderId: FolderId
): FolderId | null {
  const currentFolder = items.find((item) => item.id === currentFolderId)
  return currentFolder?.parentId ?? null
}

export function getFolderPath(
  items: DriveItem[],
  currentFolderId: FolderId
): DriveItem[] {
  const path: DriveItem[] = []
  let currentId: FolderId | null = currentFolderId

  while (currentId && !isRootFolder(currentId)) {
    const item = items.find((item) => item.id === currentId)
    if (item) {
      path.unshift(item)
      currentId = item.parentId
    } else {
      break
    }
  }

  return path
}
