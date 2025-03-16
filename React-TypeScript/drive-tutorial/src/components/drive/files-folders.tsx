import { File, Folder, MoreVertical } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { mockFiles } from '~/lib/constants'
import type { DriveItem, FileItem, FolderItem } from '~/lib/types'
import styled, { css } from 'styled-components'
import { type ThemeType } from '~/lib/theme'

const ITEMS_PER_PAGE = 10

// Types
export type ViewType = 'grid' | 'list'

type FilesFoldersProps = {
  searchQuery: string
  viewType: ViewType
  currentPath: string[]
  setCurrentPath: (path: string[]) => void
  currentPage: number
  setCurrentPage: (page: number) => void
}

export default function FilesFolders({
  currentPath,
  setCurrentPath,
  searchQuery,
  viewType,
  currentPage,
  setCurrentPage,
}: FilesFoldersProps) {
  let currentItems = mockFiles

  // Get current folder content based on path
  const getCurrentContent = () => {
    for (const folder of currentPath) {
      const foundFolder = currentItems.find(
        (item) => item.type === 'folder' && item.name === folder
      ) as FolderItem
      if (foundFolder) {
        currentItems = foundFolder.contents
      } else {
        return []
      }
    }

    // Filter by search query if present
    return searchQuery
      ? currentItems.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : currentItems
  }

  const navigateToFolder = (folderName: string) => {
    setCurrentPath([...currentPath, folderName])
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
                item={item}
                viewType={viewType}
                onClick={() => navigateToFolder(item.name)}
              />
            ) : (
              <FileItem key={item.id} item={item} viewType={viewType} />
            )
          )}
        </ContentGrid>
      )}
    </div>
  )
}

// Reusable Components

const EmptyFolderMessage = () => (
  <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
    <Folder className="mb-4 h-16 w-16 opacity-20" />
    <p>This folder is empty</p>
  </div>
)

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
}) => {
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const renderPagination = () => {
    let pages = [currentPage - 1, currentPage, currentPage + 1].filter(
      (page) => page > 0 && page <= totalPages
    )

    if (currentPage === 1) pages = [1, 2, 3]
    if (currentPage === totalPages)
      pages = [totalPages - 2, totalPages - 1, totalPages]

    return pages.filter((page) => page > 0 && page <= totalPages)
  }

  return (
    <PaginationContainer>
      {/* Previous Button */}
      <PageButton
        onClick={handlePreviousPage}
        disabled={currentPage <= 1}
        aria-label="Go to previous page"
      >
        &lt; Previous
      </PageButton>

      {/* Page Numbers */}
      {renderPagination().map((page) => (
        <PageButton
          key={page}
          onClick={() => setCurrentPage(page)}
          active={currentPage === page}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </PageButton>
      ))}

      {/* Next Button */}
      <PageButton
        onClick={handleNextPage}
        disabled={currentPage >= totalPages || totalPages === 0}
        aria-label="Go to next page"
      >
        Next &gt;
      </PageButton>
    </PaginationContainer>
  )
}

// Folder Item Component
const FolderItem = ({
  item,
  viewType,
  onClick,
}: {
  item: FolderItem
  viewType: ViewType
  onClick: () => void
}) => (
  <ItemContainer viewType={viewType} onClick={onClick}>
    <Folder className="icon" />
    <ItemText viewType={viewType}>{item.name}</ItemText>
  </ItemContainer>
)

// File Item Component
const FileItem = ({
  item,
  viewType,
}: {
  item: FileItem
  viewType: ViewType
}) => (
  <ItemContainer viewType={viewType}>
    <File className="icon" />
    <ItemText viewType={viewType}>{item.name}</ItemText>
  </ItemContainer>
)

// Styled Components
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
    border-color: ${(props) => props.theme.colors.primary};
  }

  .icon {
    width: ${(props) => (props.viewType === 'list' ? '20px' : '40px')};
    height: ${(props) => (props.viewType === 'list' ? '20px' : '40px')};
    color: ${({ theme }) => theme.colors.primary};
  }
`

const ItemText = styled.p<{ viewType: ViewType }>`
  font-size: ${(props) => (props.viewType === 'list' ? '14px' : '16px')};
  text-align: ${(props) => (props.viewType === 'list' ? 'left' : 'center')};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 8px;
  gap: 8px;
`

const PageButton = styled.button<{ active?: boolean; theme: ThemeType }>`
  background: transparent;
  color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.primary};
  border: ${({ active, theme }) =>
    active ? `1px solid ${theme.colors.primary}` : 'none'};
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  min-width: 40px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
