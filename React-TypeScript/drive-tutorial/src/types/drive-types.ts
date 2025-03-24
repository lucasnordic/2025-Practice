export type FolderId = string

export interface BaseItem {
  id: string
  name: string
  type: 'file' | 'folder'
  parentId: FolderId | null
  createdAt: Date
  updatedAt: Date
  size: number
}

export interface FileItem extends BaseItem {
  type: 'file'
  url: string
}

export interface FolderItem extends BaseItem {
  type: 'folder'
}

export type DriveItem = FileItem | FolderItem
