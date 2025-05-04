'use client'

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@radix-ui/react-hover-card'
import { Cloud, Grid2X2, List, Moon, Sun } from 'lucide-react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { VIEW_OPTIONS } from '~/lib/constants'
import styled from 'styled-components'
import { useMemo } from 'react'
import { debounce } from 'lodash'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

// Types
interface HeaderProps {
  clicked: boolean
  setClicked: React.Dispatch<React.SetStateAction<boolean>>
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  viewType: 'list' | 'grid'
  setViewType: React.Dispatch<React.SetStateAction<'list' | 'grid'>>
  darkMode: boolean
  onToggleDarkMode: () => void
}

export default function Header({
  clicked,
  setClicked,
  searchQuery,
  setSearchQuery,
  viewType,
  setViewType,
  darkMode,
  onToggleDarkMode,
}: HeaderProps) {
  // Debounced Search Input Handling, prevent excessive re-renders when updating search
  const handleSearch = useMemo(
    () => debounce((query: string) => setSearchQuery(query), 300),
    [setSearchQuery]
  )

  return (
    <HeaderContainer>
      <TitleContainer>
        {/* fill with white */}
        <Cloud
          size={36}
          color="hsl(var(--primary))"
          fill="hsl(var(--primary))"
        />
      </TitleContainer>

      {/* Search Bar */}
      <SearchContainer>
        <Input
          placeholder="Search in Drive"
          defaultValue={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </SearchContainer>

      <div className={twStyles.container}>
        {/* Dark mode toggle */}
        <DarkModeToggle
          darkMode={darkMode}
          onToggleDarkMode={onToggleDarkMode}
        />

        {/* View Toggle Component */}
        <ViewToggle
          viewType={viewType}
          setViewType={setViewType}
          clicked={clicked}
          setClicked={setClicked}
        />

        {/* Clerk Auth */}
        <div className='ml-2' >
          <SignedOut>
            <SignInButton>
              <Button variant="ghost">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div style={{ justifyContent: 'center' }}>
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
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
      <div
        className={twStyles.viewToggleContainer}
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
      </div>
    )
  }
}

function DarkModeToggle({
  darkMode,
  onToggleDarkMode,
}: {
  darkMode: boolean
  onToggleDarkMode: () => void
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggleDarkMode}
      className={twStyles.darkModeToggleContainer}
    >
      {darkMode ? <Sun /> : <Moon />}
    </Button>
  )
}

// Styled Components
const twStyles = {
  container: 'flex gap-2',
  viewToggleContainer: 'flex gap-2 ml-auto',
  darkModeToggleContainer: 'pl-2.5 pr-2.5 ml-auto',
}

const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: auto 4fr 2.5rem 2.5rem 2.8rem;
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
  max-width: 100%;
`

const HoverCardStyled = styled(HoverCardContent)`
  width: 9rem;
  border-radius: 0.375rem;
  background: hsl(var(--background-lighter));
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
    background: hsl(var(--secondary));
  }
`
