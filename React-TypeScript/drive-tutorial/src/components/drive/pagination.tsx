import { styled } from 'styled-components'
import { type ThemeType } from '~/lib/theme'

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
}) {
  const handlePageClick = (direction: 'previous' | 'next') => {
    if (direction === 'previous') {
      setCurrentPage(currentPage - 1)
    } else {
      setCurrentPage(currentPage + 1)
    }
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
        onClick={() => handlePageClick('previous')}
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
        onClick={() => handlePageClick('next')}
        disabled={currentPage >= totalPages || totalPages === 0}
        aria-label="Go to next page"
      >
        Next &gt;
      </PageButton>
    </PaginationContainer>
  )
}

// styled components
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
