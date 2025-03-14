'use client'

import { Button } from '~/components/ui/button'

type BreadcrumbsProps = {
  currentPath: string[]
  setCurrentPath: React.Dispatch<React.SetStateAction<string[]>>
}

export default function Breadcrumbs({
  currentPath,
  setCurrentPath,
}: BreadcrumbsProps) {
  const breadcrumbs = ['My Drive', ...currentPath]

  const navigateUp = () => {
    setCurrentPath(currentPath.slice(0, -1))
  }

  return (
    <div className="flex items-center gap-2">
      {currentPath.length > 0 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={navigateUp}
          className="mr-2"
        >
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
  )
}
