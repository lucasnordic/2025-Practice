import type { InferSelectModel } from 'drizzle-orm'
import { type files, type folders } from '~/server/db/schema'

// Database types
export type DbFile = InferSelectModel<typeof files>
export type DbFolder = InferSelectModel<typeof folders>

// Application types
export type FolderId = number | null // Using number to match schema's bigint

export interface BaseItem {
  id: number
  name: string
  type: 'file' | 'folder'
  parentId: FolderId
  createdAt: Date
  updatedAt: Date | null
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

// Helper type for creating new items
export type CreateFileInput = Omit<FileItem, 'id' | 'createdAt' | 'updatedAt'>
export type CreateFolderInput = Omit<
  FolderItem,
  'id' | 'createdAt' | 'updatedAt'
>
