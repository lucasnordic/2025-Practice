import { File, Folder } from 'lucide-react'
import styled from 'styled-components'

import { mockDriveItems } from '~/lib/mock-data'
import type {
  DriveItem,
  FileItem,
  FolderItem,
  FolderId,
} from '~/types/drive-types'
import { type ThemeType } from '~/lib/theme'
import Pagination from './pagination'

const ITEMS_PER_PAGE = 10

/**
 * Types
 */
export type ViewType = 'grid' | 'list'

type FilesFoldersProps = {
  searchQuery: string
  viewType: ViewType
  currentFolderId: FolderId | null
  setCurrentFolderId: (id: FolderId | null) => void
  currentPage: number
  setCurrentPage: (page: number) => void
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
}: FilesFoldersProps) {
  const currentItems = mockDriveItems

  // Get current folder content based on parentId
  const getCurrentContent = () => {
    let filteredItems = currentItems.filter(
      (item) => item.parentId === currentFolderId
    )

    if (searchQuery) {
      filteredItems = filteredItems.filter((item) => {
        return item.name.toLowerCase().includes(searchQuery.toLowerCase())
      })
    }

    return filteredItems
  }

  const currentContent = getCurrentContent()
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
          {paginatedContent.map((item: DriveItem) =>
            item.type === 'folder' ? (
              <FolderItem
                key={item.id}
                folder={item}
                viewType={viewType}
                setCurrentFolderId={setCurrentFolderId}
              />
            ) : (
              <FileItem key={item.id} file={item} viewType={viewType} />
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

// Folder Item Component
const FolderItem = ({
  folder,
  viewType,
  setCurrentFolderId,
}: {
  folder: FolderItem
  viewType: ViewType
  setCurrentFolderId: (id: FolderId | null) => void
}) => {
  const navigateToFolder = (folderId: FolderId) => {
    setCurrentFolderId(folderId)
  }

  return (
    <ItemContainer
      viewType={viewType}
      onClick={() => navigateToFolder(folder.id)}
    >
      <Folder className="icon" />
      <ItemText viewType={viewType}>{folder.name}</ItemText>
    </ItemContainer>
  )
}

// File Item Component
const FileItem = ({
  file,
  viewType,
}: {
  file: FileItem
  viewType: ViewType
}) => {
  const navigateToFile = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <ItemContainer viewType={viewType} onClick={() => navigateToFile(file.url)}>
      <File className="icon" />
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
  gap: 1rem;
  flex-direction: ${(props) =>
    props.viewType === 'grid' ? 'unset' : 'column'};
`

const ItemContainer = styled.div<{ viewType: ViewType; theme: ThemeType }>`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  gap: ${(props) => (props.viewType === 'list' ? '10px' : '5px')};

  &:hover {
    border-color: #777777;
  }

  .icon {
    width: ${(props) => (props.viewType === 'list' ? '20px' : '40px')};
    height: ${(props) => (props.viewType === 'list' ? '20px' : '40px')};
  }
`

const ItemText = styled.a<{ viewType: ViewType }>`
  font-size: ${(props) => (props.viewType === 'list' ? '14px' : '16px')};
  text-align: ${(props) => (props.viewType === 'list' ? 'left' : 'center')};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
