"use client"

import { useState } from "react"
import { File, Folder, Cloud, Upload, Plus, MoreVertical, Grid2X2, List } from "lucide-react"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@radix-ui/react-hover-card"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { MOCK_DATA, NAVIGATION_ITEMS, VIEW_OPTIONS } from "~/lib/constants"
import type { FileItem, FolderItem } from "~/lib/types"

export default function DriveUI() {
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [viewType, setViewType] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [clicked, setClicked] = useState(false);

  // Get current folder content based on path
  const getCurrentContent = () => {
    let current = MOCK_DATA

    for (const folder of currentPath) {
      const foundFolder = current.find((item) => item.type === "folder" && item.name === folder) as FolderItem

      if (foundFolder) {
        current = foundFolder.contents
      } else {
        return []
      }
    }

    // Filter by search query if present
    if (searchQuery) {
      return current.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return current
  }

  const navigateToFolder = (folderName: string) => {
    setCurrentPath([...currentPath, folderName])
  }

  const navigateUp = () => {
    setCurrentPath(currentPath.slice(0, -1))
  }

  const handleUpload = () => {
    // Mock upload functionality
    alert("Upload functionality would open a file picker here")
  }

  const currentContent = getCurrentContent()
  const breadcrumbs = ["My Drive", ...currentPath]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
        <div className="flex items-center gap-2 mb-6">
        </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b p-4">
          <div className="flex items-center justify-between w-full">  
            <div className="flex items-center gap-4">
              <Cloud className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">My Drive</h1>
            </div>

            {/* SEARCH BAR */}
            <div className="flex-grow flex justify-end mr-5 ml-5">
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
              <HoverCard >
                <HoverCardTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => {
                      setViewType(viewType === "grid" ? "list" : "grid");
                      setClicked(true);
                    }}
                  >
                    {viewType === "grid" ? <Grid2X2/> : <List/>}
                  </Button>
                </HoverCardTrigger>
                {!clicked && (
                  <HoverCardContent 
                    align="end" 
                    className="p-2 bg-white shadow-md rounded-md w-36"
                  >
                  {VIEW_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setViewType(option.id as "grid" | "list")}
                      className="flex items-center gap-2 px-2 py-1 w-full hover:bg-gray-100 rounded-md text-sm"
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

        {/* Breadcrumbs and actions */}
        <div className="p-4 flex items-center border-b">
          <div className="flex items-center gap-2">
            {currentPath.length > 0 && (
              <Button variant="ghost" size="icon" onClick={navigateUp} className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>
            )}
            <div className="flex items-center gap-1">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <span className="mx-1">/</span>}
                  <Button
                    variant="ghost"
                    className="h-auto p-1"
                    onClick={() => {
                      if (index === 0) {
                        setCurrentPath([])
                      } else {
                        setCurrentPath(currentPath.slice(0, index - 1))
                      }
                    }}
                  >
                    {crumb}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2" id="new-dropdown-trigger">
                  <Plus className="h-4 w-4" />
                  New
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end"
                className="p-2 bg-white shadow-md rounded-md w-36"
              >
                <DropdownMenuItem className="flex items-center gap-2 px-2 py-1 w-full hover:bg-gray-100 rounded-md text-sm">
                  <Folder className="h-4 w-4 mr-2" />
                  New Folder
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 px-2 py-1 w-full hover:bg-gray-100 rounded-md text-sm">
                  <File className="h-4 w-4 mr-2" />
                  New Doc
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={handleUpload} className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>

        {/* Files and folders */}
        <div className="flex-1 p-4 overflow-auto">
          {currentContent.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Folder className="h-16 w-16 mb-4 opacity-20" />
              <p>This folder is empty</p>
            </div>
          ) : (
            <div
              className={
                viewType === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                  : "space-y-2"
              }
            >
              {currentContent.map((item) => (
                <div
                  key={item.id}
                  className={`
                    border rounded-lg overflow-hidden hover:border-primary transition-colors
                    ${viewType === "list" ? "flex items-center p-2" : ""}
                  `}
                >
                  {item.type === "folder" ? (
                    <div
                      className={`
                        cursor-pointer p-4
                        ${viewType === "list" ? "flex items-center w-full" : ""}
                      `}
                      onClick={() => navigateToFolder(item.name)}
                    >
                      <div
                        className={`${viewType === "list" ? "flex items-center gap-4 w-full" : "flex flex-col items-center gap-2"}`}
                      >
                        <Folder className={`${viewType === "list" ? "h-5 w-5" : "h-12 w-12"} text-primary`} />
                        <div className={viewType === "list" ? "flex-1" : "text-center"}>
                          <p className="font-medium truncate">{item.name}</p>
                          {viewType === "list" && (
                            <p className="text-xs text-muted-foreground">
                              {(item).contents.length} items
                            </p>
                          )}
                        </div>
                        {viewType === "list" && (
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={`#file-${item.id}`}
                      className={`
                        block p-4
                        ${viewType === "list" ? "flex items-center w-full" : ""}
                      `}
                    >
                      <div
                        className={`${viewType === "list" ? "flex items-center gap-4 w-full" : "flex flex-col items-center gap-2"}`}
                      >
                        <File className={`${viewType === "list" ? "h-5 w-5" : "h-12 w-12"} text-muted-foreground`} />
                        <div className={viewType === "list" ? "flex-1" : "text-center"}>
                          <p className="font-medium truncate">{item.name}</p>
                          {viewType === "list" && (
                            <p className="text-xs text-muted-foreground">Modified {(item).modified}</p>
                          )}
                        </div>
                        {viewType === "list" && (
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

