"use client"

import { useState } from "react"

import Header from "~/components/drive/header"
import Breadcrumbs from "./drive/breadcrumbs"
import Actions from "./drive/actions"
import FilesFolders from "./drive/files-folders"

export default function DriveUI() {
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [viewType, setViewType] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="flex items-center gap-2 mb-6">
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
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
        <div className="p-4 flex items-center border-b">
          <Breadcrumbs currentPath={currentPath} setCurrentPath={setCurrentPath}/>
          <Actions/>
        </div>

        {/* Files and folders */}
        <FilesFolders 
          currentPath={currentPath} 
          setCurrentPath={setCurrentPath}
          searchQuery={searchQuery}
          viewType={viewType}
        />
      </div>
    </div>
  )
}

