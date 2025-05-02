'use client'

import type { DbFile, DbFolder } from '~/types/drive-types'
import Link from 'next/link'

const ROOT_PARENT_NAME = 'My Drive'
const MAX_VISIBLE = 3
const DB_ROOT_NAME = 'root' // TODO: store root id of user instead

type BreadcrumbsProps = {
  props: {
    files: DbFile[]
    folders: DbFolder[]
    parents: DbFolder[]
  }
}

type BreadcrumbSegment =
  | { type: 'folder'; folder: DbFolder }
  | { type: 'ellipsis' }

function folderSegment(folder: DbFolder): BreadcrumbSegment {
  return { type: 'folder', folder }
}
function ellipsisSegment(): BreadcrumbSegment {
  return { type: 'ellipsis' }
}

export default function Breadcrumbs({ props }: BreadcrumbsProps) {
  const reversedParents = [...props.parents].filter(
    (f) => f.name !== DB_ROOT_NAME
  ) // remove root
  const showEllipsis = reversedParents.length > MAX_VISIBLE
  const visibleSegments: BreadcrumbSegment[] = showEllipsis
    ? [ellipsisSegment(), ...reversedParents.slice(-2).map(folderSegment)]
    : reversedParents.map(folderSegment) // Root / ... / Other

  console.log('Breadcrumbs', {
    ...props.parents
  })

  return (
    <div className={twStyles.breadcrumb}>
      <div className={twStyles.breadcrumbItem}>
        <Link href={`/f/${props.parents.at(0)?.id}`}>{ROOT_PARENT_NAME}</Link>
        {visibleSegments.map((f) => {
          {/* This  */}
          if (f.type === 'ellipsis') {
            return (
              <span
                key="ellipsis"
                className="mx-2 overflow-hidden text-ellipsis text-muted-foreground"
              >
                ...
              </span>
            )
          }

          return (
            <div key={f.folder.id} className={twStyles.breadcrumbItem}>
              <span className={twStyles.breadcrumbItemSeparator}>/</span>
              <Link
                className={twStyles.breadcrumbItemButton}
                href={`/f/${f.folder.id}`}
              >
                {f.folder.name}
              </Link>
            </div>
          )
        })}
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
