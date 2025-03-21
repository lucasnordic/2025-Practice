'use client'

import { useState } from 'react'

import Header from '~/components/drive/header'
import Breadcrumbs from './drive/breadcrumbs'
import Actions from './drive/actions'
import FilesFolders, { type ViewType } from './drive/files-folders'
import { ThemeProvider } from 'styled-components'
import { theme } from '~/lib/theme'

export default function DriveUI() {
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [viewType, setViewType] = useState<ViewType>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [clicked, setClicked] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <ThemeProvider theme={theme}>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <div className="mb-6 flex items-center gap-2"></div>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <Header
            clicked={clicked}
            setClicked={setClicked}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewType={viewType}
            setViewType={setViewType}
          />

          {/* Breadcrumbs and actions */}
          <div className="flex items-center border-b p-4">
            <Breadcrumbs
              currentPath={currentPath}
              setCurrentPath={setCurrentPath}
            />
            <Actions />
          </div>

          {/* Files and folders */}
          <FilesFolders
            currentPath={currentPath}
            setCurrentPath={setCurrentPath}
            searchQuery={searchQuery}
            viewType={viewType}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </ThemeProvider>
  )
}
