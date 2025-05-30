'use client'

import {
  File,
  Folder,
  Trash2Icon,
  EllipsisVerticalIcon,
  BanIcon,
} from 'lucide-react'
import styled from 'styled-components'
import { deleteFile } from '~/server/actions'
import type {
  FileItem,
  FolderItem,
  DbFile,
  DbFolder,
} from '~/types/drive-types'
import { type ThemeType } from '~/styles/theme'
import { useMemo } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import DialogPopupImage from '../ui/dialog-popup-image'

/**
 * Types
 */
export type ViewType = 'grid' | 'list'

type FilesFoldersProps = {
  searchQuery: string
  viewType: ViewType
  currentPage: number
  setCurrentPage: (page: number) => void
  props: {
    files: DbFile[]
    folders: DbFolder[]
  }
}

/**
 * Vars
 */
const CURRENT_LOCALE = 'en-US'
const DATE_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
} as const

/**
 * Files and Folders Component
 * @param param0
 * @returns
 */
export default function FilesFolders({
  searchQuery,
  viewType,
  props,
}: FilesFoldersProps) {
  // Combine and filter items
  const currentContent = useMemo(() => {
    const folders = props.folders.map((folder) => ({
      ...folder,
      type: 'folder' as const,
    }))

    const files = props.files.map((file) => ({
      ...file,
      type: 'file' as const,
    }))

    const allItems = [...folders, ...files]

    return allItems.filter((item) =>
      searchQuery
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
  }, [props.folders, props.files, searchQuery])

  return (
    <div className="flex-1 overflow-auto pb-4 pl-4 pr-4 pt-2">
      {viewType === 'list' && (
        <ItemRow>
          <div className=""></div>
          <div className="">Name</div>
          <div className="">Type</div>
          <div className="">Size</div>
          <div className="">Modified</div>
          <div className="">Created</div>
          {/* TODO: Make interactable/usable? */}
          <EllipsisVerticalIcon size={24} className="pl-2" />
        </ItemRow>
      )}
      {currentContent.length === 0 ? (
        <EmptyFolderMessage />
      ) : (
        <ContentGrid $viewType={viewType}>
          {currentContent.map((item) =>
            item.type === 'folder' ? (
              <FolderItem
                key={`folder-${item.id}`}
                folder={item}
                viewType={viewType}
              />
            ) : (
              <FileItem
                key={`file-${item.id}`}
                file={item}
                viewType={viewType}
              />
            )
          )}
        </ContentGrid>
      )}
    </div>
  )
}

/**
 * Reusable Components
 */
const EmptyFolderMessage = () => (
  <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
    <Folder className="mb-4 h-16 w-16 opacity-20" />
    <p>This folder is empty</p>
  </div>
)

// Update component prop types
type FolderItemProps = {
  folder: DbFolder & { type: 'folder' }
  viewType: ViewType
}

type FileItemProps = {
  file: DbFile & { type: 'file' }
  viewType: ViewType
}

const FolderItem = ({ folder, viewType }: FolderItemProps) => {
  return (
    <Link href={`/f/${folder.id}`}>
      <Item $viewType={viewType}>
        <Folder className="folder-icon" />
        <ItemText $viewType={viewType}>{folder.name}</ItemText>
        {viewType === 'list' && (
          <>
            <ItemText $viewType={viewType}>{folder.type}</ItemText>
            <ItemText $viewType={viewType}>{folder.size}</ItemText>
            <ItemText $viewType={viewType}>
              {folder.updatedAt?.toLocaleDateString(
                CURRENT_LOCALE,
                DATE_OPTIONS
              )}
            </ItemText>{' '}
            <ItemText $viewType={viewType}>
              {folder.createdAt?.toLocaleDateString(
                CURRENT_LOCALE,
                DATE_OPTIONS
              )}
            </ItemText>
            <ItemText $viewType={viewType} className="no-ellipsis">
              <Button
                variant="ghost"
                className="p-2.5"
                style={{ cursor: 'not-allowed' }}
                aria-label="Delete folder and content within"
                onClick={async (e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // TODO: Delete folder and any files in folder
                }}
              >
                <BanIcon />
              </Button>
            </ItemText>
          </>
        )}
      </Item>
    </Link>
  )
}

const FileItem = ({ file, viewType }: FileItemProps) => {
  const isImage = /\.(jpeg|jpg|png|gif)$/i.test(file.name)

  // Render the common content.
  const content = (
    <Item $viewType={viewType}>
      <File className="file-icon" />
      <ItemText $viewType={viewType}>{file.name}</ItemText>
      {viewType === 'list' && (
        <>
          <ItemText $viewType={viewType}>{file.type}</ItemText>
          <ItemText $viewType={viewType}>{file.size}</ItemText>
          <ItemText $viewType={viewType}>
            {file.updatedAt?.toLocaleDateString(CURRENT_LOCALE, DATE_OPTIONS)}
          </ItemText>
          <ItemText $viewType={viewType}>
            {file.createdAt?.toLocaleDateString(CURRENT_LOCALE, DATE_OPTIONS)}
          </ItemText>
          <ItemText $viewType={viewType} className="no-ellipsis">
            <Button
              variant="ghost"
              className="p-2.5"
              aria-label="Delete file"
              onClick={async (e) => {
                e.preventDefault()
                e.stopPropagation()
                await deleteFile(file.id)
              }}
            >
              <Trash2Icon />
            </Button>
          </ItemText>
        </>
      )}
    </Item>
  )

  return isImage ? (
    <DialogPopupImage
      dialogTriggerName={file.name}
      dialogTitle={file.name}
      descriptionText=""
      file={file}
    >
      {content}
    </DialogPopupImage>
  ) : (
    <Link
      href={file.url || '#'} // fallback for undefined file.url
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </Link>
  )
}

/*
 * Styled Components
 */
const ContentGrid = styled.div<{ $viewType: ViewType }>`
  display: ${(props) => (props.$viewType === 'grid' ? 'grid' : 'flex')};
  grid-template-columns: ${(props) =>
    props.$viewType === 'grid'
      ? 'repeat(auto-fill, minmax(200px, 1fr))'
      : 'none'};
  gap: 0.18rem;
  flex-direction: ${(props) =>
    props.$viewType === 'grid' ? 'unset' : 'column'};
  /* background-color: hsl(var(--background-light)); */
  border-radius: 8px;
`

const Item = styled.div<{ $viewType: ViewType; theme: ThemeType }>`
  display: ${(props) => (props.$viewType === 'list' ? 'grid' : 'flex')};
  gap: ${(props) => (props.$viewType === 'list' ? '10px' : '5px')};
  ${(props) =>
    props.$viewType === 'list' &&
    `
    justify-content: space-between;
    text-align: left;
    grid-template-columns: auto 1fr repeat(4, 0.5fr) 0.08fr;
  `}
  padding: 5px;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: hsl(var(--background-lighter));
  align-items: center;

  &:hover {
    color: hsl(var(--hover-dark-blue));
  }

  .folder-icon {
    width: ${(props) => (props.$viewType === 'list' ? '20px' : '40px')};
    height: ${(props) => (props.$viewType === 'list' ? '20px' : '40px')};
    fill: hsl(var(--accent-light-orange));
    color: hsl(var(--accent-light-orange));
  }

  .file-icon {
    width: ${(props) => (props.$viewType === 'list' ? '20px' : '40px')};
    height: ${(props) => (props.$viewType === 'list' ? '20px' : '40px')};
  }
`

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr repeat(4, 0.5fr) 0.08fr; // dependant on Item
  padding: 5px;
  gap: 10px;
`

const ItemText = styled.div<{ $viewType: ViewType }>`
  font-size: ${(props) => (props.$viewType === 'list' ? '14px' : '14px')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &.no-ellipsis {
    overflow: visible;
    white-space: normal;
    text-overflow: clip;
  }
`
