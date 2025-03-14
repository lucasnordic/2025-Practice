import { Home, Share2, Clock, Star, Trash2, Grid2X2, List } from 'lucide-react'
import type { FileItem, FolderItem } from './types'

export const NAVIGATION_ITEMS = [
  {
    id: 'my-drive',
    label: 'My Drive',
    icon: <Home className="h-4 w-4" />,
  },
  {
    id: 'shared',
    label: 'Shared with me',
    icon: <Share2 className="h-4 w-4" />,
  },
  {
    id: 'recent',
    label: 'Recent',
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: 'starred',
    label: 'Starred',
    icon: <Star className="h-4 w-4" />,
  },
  {
    id: 'trash',
    label: 'Trash',
    icon: <Trash2 className="h-4 w-4" />,
  },
]

export const VIEW_OPTIONS = [
  {
    id: 'grid',
    label: 'Grid view',
    icon: <Grid2X2 className="mr-2 h-4 w-4" />,
  },
  {
    id: 'list',
    label: 'List view',
    icon: <List className="mr-2 h-4 w-4" />,
  },
]

export const MOCK_DATA: (FileItem | FolderItem)[] = [
  {
    id: 'folder-1',
    name: 'Documents',
    type: 'folder',
    contents: [
      {
        id: 'file-1',
        name: 'Resume.pdf',
        type: 'file',
        modified: 'Jan 15, 2024',
        size: '2.3 MB',
      },
      {
        id: 'file-2',
        name: 'Project Proposal.docx',
        type: 'file',
        modified: 'Feb 3, 2024',
        size: '1.5 MB',
      },
      {
        id: 'folder-4',
        name: 'Work Documents',
        type: 'folder',
        contents: [
          {
            id: 'file-8',
            name: 'Quarterly Report.xlsx',
            type: 'file',
            modified: 'Mar 1, 2024',
            size: '4.2 MB',
          },
          {
            id: 'file-9',
            name: 'Meeting Notes.docx',
            type: 'file',
            modified: 'Mar 5, 2024',
            size: '0.8 MB',
          },
        ],
      },
    ],
  },
  {
    id: 'folder-2',
    name: 'Photos',
    type: 'folder',
    contents: [
      {
        id: 'file-3',
        name: 'Vacation.jpg',
        type: 'file',
        modified: 'Dec 25, 2023',
        size: '5.7 MB',
      },
      {
        id: 'file-4',
        name: 'Family.png',
        type: 'file',
        modified: 'Jan 2, 2024',
        size: '3.8 MB',
      },
    ],
  },
  {
    id: 'folder-3',
    name: 'Projects',
    type: 'folder',
    contents: [
      {
        id: 'file-5',
        name: 'Project Plan.xlsx',
        type: 'file',
        modified: 'Feb 15, 2024',
        size: '1.2 MB',
      },
      {
        id: 'file-6',
        name: 'Presentation.pptx',
        type: 'file',
        modified: 'Feb 20, 2024',
        size: '6.5 MB',
      },
      {
        id: 'file-7',
        name: 'Budget.xlsx',
        type: 'file',
        modified: 'Feb 22, 2024',
        size: '0.9 MB',
      },
    ],
  },
  {
    id: 'file-10',
    name: 'Important Notes.txt',
    type: 'file',
    modified: 'Mar 10, 2024',
    size: '0.1 MB',
  },
  {
    id: 'file-11',
    name: 'Schedule.pdf',
    type: 'file',
    modified: 'Mar 12, 2024',
    size: '1.7 MB',
  },
]
