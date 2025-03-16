export interface BaseItem {
  id: string
  name: string
  type: 'file' | 'folder'
}

export interface FileItem extends BaseItem {
  type: 'file'
  modified: string
  size: string
}

export interface FolderItem extends BaseItem {
  type: 'folder'
  contents: (FileItem | FolderItem)[]
}

export type DriveItem = FileItem | FolderItem
