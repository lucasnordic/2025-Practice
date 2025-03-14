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

type HeaderProps = {
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
  return (
    <header className="border-b p-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <Cloud className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">My Drive</h1>
        </div>

        {/* SEARCH BAR */}
        <div className="ml-5 mr-5 flex flex-grow justify-end">
          <Input
            placeholder="Search in Drive"
            className="max-w-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* LIST / GRID view button */}
        <div
          className="ml-auto flex items-center gap-2"
          onMouseLeave={() => setTimeout(() => setClicked(false), 300)} // 300ms delay
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
              <HoverCardContent
                align="end"
                className="w-36 rounded-md bg-white p-2 shadow-md"
              >
                {VIEW_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setViewType(option.id as 'grid' | 'list')}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-gray-100"
                  >
                    {option.icon}
                    {option.label}
                  </button>
                ))}
              </HoverCardContent>
            )}
          </HoverCard>
        </div>
      </div>
    </header>
  )
}
