'use client'

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@radix-ui/react-hover-card'
import { Cloud, Grid2X2, List } from 'lucide-react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { VIEW_OPTIONS } from '~/lib/constants'
import styled from 'styled-components'
import { useMemo } from 'react'
import { debounce } from 'lodash'

// Types
interface HeaderProps {
  clicked: boolean
  setClicked: React.Dispatch<React.SetStateAction<boolean>>
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  viewType: 'list' | 'grid'
  setViewType: React.Dispatch<React.SetStateAction<'list' | 'grid'>>
}

export default function Header({
  clicked,
  setClicked,
  searchQuery,
  setSearchQuery,
  viewType,
  setViewType,
}: HeaderProps) {
  // Debounced Search Input Handling, prevent excessive re-renders when updating search
  const handleSearch = useMemo(
    () => debounce((query: string) => setSearchQuery(query), 300),
    [setSearchQuery]
  )

  return (
    <HeaderContainer>
      <TitleContainer>
        <Cloud size={24} color="var(--primary)" />
        <h1>My Drive</h1>
      </TitleContainer>

      {/* Search Bar */}
      <SearchContainer>
        <Input
          placeholder="Search in Drive"
          defaultValue={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </SearchContainer>

      {/* View Toggle Component */}
      <ViewToggle
        viewType={viewType}
        setViewType={setViewType}
        clicked={clicked}
        setClicked={setClicked}
      />
    </HeaderContainer>
  )

  // Toggles view between grid and list
  function ViewToggle({
    viewType,
    setViewType,
    clicked,
    setClicked,
  }: {
    viewType: 'list' | 'grid'
    setViewType: React.Dispatch<React.SetStateAction<'list' | 'grid'>>
    clicked: boolean
    setClicked: React.Dispatch<React.SetStateAction<boolean>>
  }) {
    return (
      <ViewToggleContainer
        onMouseLeave={() => setTimeout(() => setClicked(false), 300)}
      >
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setViewType(viewType === 'grid' ? 'list' : 'grid')
                setClicked(true)
              }}
            >
              {viewType === 'grid' ? <Grid2X2 /> : <List />}
            </Button>
          </HoverCardTrigger>
          {!clicked && (
            <HoverCardStyled align="end">
              {VIEW_OPTIONS.map((option) => (
                <ViewToggleButton
                  key={option.id}
                  onClick={() => setViewType(option.id as 'grid' | 'list')}
                >
                  {option.icon}
                  {option.label}
                </ViewToggleButton>
              ))}
            </HoverCardStyled>
          )}
        </HoverCard>
      </ViewToggleContainer>
    )
  }
}

// Styled Components
const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--border);
  background: var(--background);
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const SearchContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  margin: 0 1rem;
`

const ViewToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
`

const HoverCardStyled = styled(HoverCardContent)`
  width: 9rem;
  border-radius: 0.375rem;
  background: var(--background);
  padding: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const ViewToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  background: none;
  border: none;
  width: 100%;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: var(--muted);
  }
`
