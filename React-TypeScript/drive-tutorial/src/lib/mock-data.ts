import type { FileItem, FolderItem } from '../types/drive-types'

const mockDriveFolders: FolderItem[] = [
  {
    id: 'root',
    name: 'Root',
    type: 'folder',
    parentId: null,
  },
  {
    id: 'folder-1',
    name: 'Documents',
    type: 'folder',
    parentId: 'root',
  },
  {
    id: 'folder-2',
    name: 'Photos',
    type: 'folder',
    parentId: 'root',
  },
  {
    id: 'folder-3',
    name: 'Projects',
    type: 'folder',
    parentId: 'root',
  },
  {
    id: 'folder-4',
    name: 'Work Documents',
    type: 'folder',
    parentId: 'root',
  },
  {
    id: 'folder-5',
    name: 'Secret Documents',
    type: 'folder',
    parentId: 'folder-1',
  },
  {
    id: 'folder-6',
    name: 'This-Folder-Is-Empty',
    type: 'folder',
    parentId: 'root',
  },
]

const mockDriveFiles: FileItem[] = [
  {
    id: 'file-1',
    name: 'Resume.pdf',
    type: 'file',
    parentId: 'folder-1',
    url: 'https://example.com/resume.pdf',
  },
  {
    id: 'file-2',
    name: 'Project Proposal.docx',
    type: 'file',
    parentId: 'folder-1',
    url: 'https://example.com/project-proposal.docx',
  },
  {
    id: 'file-3',
    name: 'Vacation.jpg',
    type: 'file',
    parentId: 'folder-2',
    url: 'https://example.com/vacation.jpg',
  },
  {
    id: 'file-4',
    name: 'Family.png',
    type: 'file',
    parentId: 'folder-2',
    url: 'https://example.com/family.png',
  },
  {
    id: 'file-5',
    name: 'Project Plan.xlsx',
    type: 'file',
    parentId: 'folder-3',
    url: 'https://example.com/project-plan.xlsx',
  },
  {
    id: 'file-6',
    name: 'Presentation.pptx',
    type: 'file',
    parentId: 'folder-3',
    url: 'https://example.com/presentation.pptx',
  },
  {
    id: 'file-7',
    name: 'Budget.xlsx',
    type: 'file',
    parentId: 'folder-3',
    url: 'https://example.com/budget.xlsx',
  },
  {
    id: 'file-8',
    name: 'Quarterly Report.xlsx',
    type: 'file',
    parentId: 'folder-4',
    url: 'https://example.com/quarterly-report.xlsx',
  },
  {
    id: 'file-9',
    name: 'Meeting Notes.docx',
    type: 'file',
    parentId: 'folder-4',
    url: 'https://example.com/meeting-notes.docx',
  },
  {
    id: 'file-10',
    name: 'Important Notes.txt',
    type: 'file',
    parentId: 'root',
    url: 'https://example.com/important-notes.txt',
  },
  {
    id: 'file-11',
    name: 'Schedule.pdf',
    type: 'file',
    parentId: 'root',
    url: 'https://example.com/schedule.pdf',
  },
  {
    id: 'file-12',
    name: 'accounts.xlsx',
    type: 'file',
    parentId: 'folder-5',
    url: 'https://example.com/accounts.xlsx',
  },
]

// Add more mock data up to 50 entries
let currentFileCount = mockDriveFiles.length
for (let i = currentFileCount + 1; i <= currentFileCount + 50; i++) {
  mockDriveFiles.push({
    id: `file-${i}`,
    name: `Document_${i}.pdf`,
    type: 'file',
    parentId: 'root',
    url: 'https://example.com/document.pdf',
  })
}

// add 20 mock files to folder-1
currentFileCount = mockDriveFiles.length
for (let i = currentFileCount + 1; i <= currentFileCount + 20; i++) {
  mockDriveFiles.push({
    id: `file-${i}`,
    name: `Document_${i}.pdf`,
    type: 'file',
    parentId: 'folder-1',
    url: 'https://example.com/document.pdf',
  })
}

const mockDriveItems = [...mockDriveFolders, ...mockDriveFiles]

export { mockDriveItems, mockDriveFolders, mockDriveFiles }
