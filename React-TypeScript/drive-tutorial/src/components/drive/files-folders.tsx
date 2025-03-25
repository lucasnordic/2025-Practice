import { File, Folder } from 'lucide-react'
import styled from 'styled-components'

import type {
  FileItem,
  FolderItem,
  DbFile,
  DbFolder,
  DriveItem,
} from '~/types/drive-types'
import { type ThemeType } from '~/styles/theme'
import Pagination from './pagination'
import { useMemo } from 'react'
const ITEMS_PER_PAGE = 10

/**
 * Types
 */
export type ViewType = 'grid' | 'list'

type FilesFoldersProps = {
  searchQuery: string
  viewType: ViewType
  currentFolderId: number | null
  setCurrentFolderId: (id: number | null) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  props: {
    files: DbFile[]
    folders: DbFolder[]
  }
}

//
const sortItems = (a: DriveItem, b: DriveItem) => {
  return a.name.localeCompare(b.name)
}

/**
 * Files and Folders Component
 * @param param0
 * @returns
 */
export default function FilesFolders({
  currentFolderId,
  setCurrentFolderId,
  searchQuery,
  viewType,
  currentPage,
  setCurrentPage,
  props,
}: FilesFoldersProps) {
  // Combine and filter items
  const currentContent = useMemo(() => {
    if (currentFolderId == null || currentFolderId === undefined) {
      console.error('No folder ID provided')
      return []
    }

    const folders = props.folders.map((folder) => ({
      ...folder,
      type: 'folder' as const,
    }))

    const files = props.files.map((file) => ({
      ...file,
      type: 'file' as const,
    }))

    const allItems = [...folders, ...files]

    // Filter by parent, search
    const filteredItems = allItems
      .filter((item) => item.parentId === currentFolderId)
      .filter((item) =>
        searchQuery
          ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
          : true
      )

    return filteredItems
  }, [props.folders, props.files, currentFolderId, searchQuery])

  const totalPages = Math.ceil(currentContent.length / ITEMS_PER_PAGE)
  const paginatedContent = currentContent.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="flex-1 overflow-auto p-4">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      {currentContent.length === 0 ? (
        <EmptyFolderMessage />
      ) : (
        <ContentGrid viewType={viewType}>
          {paginatedContent.map((item) =>
            item.type === 'folder' ? (
              <FolderItem
                key={`folder-${item.id}`}
                folder={item}
                viewType={viewType}
                setCurrentFolderId={setCurrentFolderId}
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
  setCurrentFolderId: (id: number | null) => void
}

type FileItemProps = {
  file: DbFile & { type: 'file' }
  viewType: ViewType
}

const FolderItem = ({
  folder,
  viewType,
  setCurrentFolderId,
}: FolderItemProps) => {
  const navigateToFolder = (folderId: number) => {
    setCurrentFolderId(folderId)
  }

  return (
    <ItemContainer
      viewType={viewType}
      onClick={() => navigateToFolder(folder.id)}
    >
      <Folder className="folder-icon" />
      <ItemText viewType={viewType}>{folder.name}</ItemText>
    </ItemContainer>
  )
}

const FileItem = ({ file, viewType }: FileItemProps) => {
  const navigateToFile = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <ItemContainer viewType={viewType} onClick={() => navigateToFile(file.url)}>
      <File className="file-icon" />
      <ItemText viewType={viewType}>{file.name}</ItemText>
    </ItemContainer>
  )
}

/*
 * Styled Components
 */
const ContentGrid = styled.div<{ viewType: ViewType }>`
  display: ${(props) => (props.viewType === 'grid' ? 'grid' : 'flex')};
  grid-template-columns: ${(props) =>
    props.viewType === 'grid'
      ? 'repeat(auto-fill, minmax(150px, 1fr))'
      : 'none'};
  gap: 0.18rem;
  flex-direction: ${(props) =>
    props.viewType === 'grid' ? 'unset' : 'column'};
  /* background-color: hsl(var(--background-light)); */
  border-radius: 8px;
`

const ItemContainer = styled.div<{ viewType: ViewType; theme: ThemeType }>`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  gap: ${(props) => (props.viewType === 'list' ? '10px' : '5px')};
  background-color: hsl(var(--background-lighter));

  &:hover {
    color: hsl(var(--hover-dark-blue));
  }

  .folder-icon {
    width: ${(props) => (props.viewType === 'list' ? '20px' : '40px')};
    height: ${(props) => (props.viewType === 'list' ? '20px' : '40px')};
    fill: hsl(var(--accent-light-orange));
  }

  .file-icon {
    width: ${(props) => (props.viewType === 'list' ? '20px' : '40px')};
    height: ${(props) => (props.viewType === 'list' ? '20px' : '40px')};
  }
`

const ItemText = styled.a<{ viewType: ViewType }>`
  font-size: ${(props) => (props.viewType === 'list' ? '14px' : '16px')};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
