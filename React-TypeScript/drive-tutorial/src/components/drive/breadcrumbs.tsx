'use client'

import { Button } from '~/components/ui/button'
import { ROOT_FOLDER_ID, isRootFolder, getFolderPath } from '~/utils/drive'
import type { DbFile, DbFolder } from '~/types/drive-types'
import { useMemo } from 'react'
import Link from 'next/link'

const ROOT_PARENT_NAME = 'My Drive'

type BreadcrumbsProps = {
  currentFolderId: number | null
  setCurrentFolderId: (id: number | null) => void
  props: {
    files: DbFile[]
    folders: DbFolder[]
    parents: DbFolder[]
  }
}

type breadcrumbProp = {
  id: number
  name: string
}

export default function Breadcrumbs({
  currentFolderId,
  setCurrentFolderId,
  props,
}: BreadcrumbsProps) {
  return (
    <div className={twStyles.breadcrumb}>
      <div className={twStyles.breadcrumbItem}>
        <Link href={`/f/${ROOT_FOLDER_ID}`}>{ROOT_PARENT_NAME}</Link>
        {props.parents
          .slice(0)
          .reverse()
          .map((crumb, index) => (
            <div key={index} className={twStyles.breadcrumbItem}>
              {index > 0 && (
                <span className={twStyles.breadcrumbItemSeparator}>/</span>
              )}
              {crumb.id !== 1 && (
                <Link
                  className={twStyles.breadcrumbItemButton}
                  href={`/f/${crumb.id}`}
                >
                  {crumb.name}
                </Link>
              )}
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
  breadcrumbItemButton: 'h-auto',
}
