'use client'

import { Button } from '~/components/ui/button'
import { mockDriveItems } from '~/lib/mock-data'
import { ROOT_FOLDER_ID, isRootFolder, getFolderPath } from '~/utils/drive'
import type { FolderId } from '~/types/drive-types'
import { useMemo } from 'react'

type BreadcrumbsProps = {
  currentFolderId: FolderId | null
  setCurrentFolderId: (id: FolderId | null) => void
}

export default function Breadcrumbs({
  currentFolderId,
  setCurrentFolderId,
}: BreadcrumbsProps) {
  const breadcrumbs = useMemo(() => {
    const base = [{ id: ROOT_FOLDER_ID, name: 'My Drive' }]
    if (!currentFolderId || isRootFolder(currentFolderId)) {
      return base
    }

    const path = getFolderPath(mockDriveItems, currentFolderId)
    return [...base, ...path.map(({ id, name }) => ({ id, name }))]
  }, [currentFolderId])

  const navigateToFolder = (index: number) => {
    const targetId = breadcrumbs[index]?.id
    if (targetId) {
      setCurrentFolderId(targetId)
    }
  }

  return (
    <div className={twStyles.breadcrumb}>
      <div className={twStyles.breadcrumbItem}>
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className={twStyles.breadcrumbItem}>
            {index > 0 && (
              <span className={twStyles.breadcrumbItemSeparator}>/</span>
            )}
            <Button
              variant="ghost"
              className={twStyles.breadcrumbItemButton}
              onClick={() => navigateToFolder(index)}
            >
              {crumb.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

const twStyles = {
  breadcrumb: 'flex items-center gap-2',
  breadcrumbItem: 'flex items-center gap-1',
  breadcrumbItemSeparator: 'mx-1',
  breadcrumbItemButton: 'h-auto p-1',
}
