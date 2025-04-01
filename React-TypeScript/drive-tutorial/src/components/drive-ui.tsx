'use client'

import { useEffect, useState } from 'react'

import Header from '~/components/drive/header'
import Breadcrumbs from './drive/breadcrumbs'
import FilesFolders, { type ViewType } from './drive/files-folders'
import { ThemeProvider } from 'styled-components'
import { theme } from '~/styles/theme'
import { ROOT_FOLDER_ID } from '~/utils/drive'
import type { DbFile, DbFolder } from '~/types/drive-types'

export default function DriveUI(props: {
  files: DbFile[]
  folders: DbFolder[]
  parents: DbFolder[]
}) {
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(
    ROOT_FOLDER_ID
  )
  const [viewType, setViewType] = useState<ViewType>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [clicked, setClicked] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [darkMode, setDarkMode] = useState(true)
  const [systemDarkMode, setSystemDarkMode] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    if (systemDarkMode) {
      setDarkMode(mediaQuery.matches)
    }

    const handler = (e: MediaQueryListEvent) => {
      if (systemDarkMode) {
        setDarkMode(e.matches)
      }
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [systemDarkMode])

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
            darkMode={darkMode}
            onToggleDarkMode={() => {
              setDarkMode(!darkMode)
              setSystemDarkMode(false)
            }}
          />

          {/* Breadcrumbs and actions */}
          <div className={twStyles.subHeader}>
            <Breadcrumbs
              currentFolderId={currentFolderId}
              setCurrentFolderId={setCurrentFolderId}
              props={props}
            />
          </div>

          {/* Files and folders */}
          <FilesFolders
            currentFolderId={currentFolderId}
            searchQuery={searchQuery}
            viewType={viewType}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            props={props}
          />
        </div>
      </div>
    </ThemeProvider>
  )
}

const twStyles = {
  subHeader: 'flex items-center pl-4 pr-4 pb-1 border-b-2',
}
