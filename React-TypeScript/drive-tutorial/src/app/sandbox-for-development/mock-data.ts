import type { FileItem, FolderItem } from '~/types/drive-types'

const mockDriveFolders: FolderItem[] = [
  {
    id: 1,
    name: 'Documents',
    type: 'folder',
    parentId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    size: 0,
  },
  {
    id: 2,
    name: 'Photos',
    type: 'folder',
    parentId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    size: 0,
  },
]

const mockDriveFiles: FileItem[] = [
  {
    id: 3,
    name: 'Resume.pdf',
    type: 'file',
    parentId: 1,
    url: 'https://example.com/resume.pdf',
    createdAt: new Date(),
    updatedAt: new Date(),
    size: 0,
  },
  // },
  // {
  //   id: 8,
  //   name: 'Project Proposal.docx',
  //   type: 'file',
  //   parentId: 1,
  //   url: 'https://example.com/project-proposal.docx',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   size: 0,
  // },
  // {
  //   id: 9,
  //   name: 'Vacation.jpg',
  //   type: 'file',
  //   parentId: 2,
  //   url: 'https://example.com/vacation.jpg',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   size: 0,
  // },
  // {
  //   id: 10,
  //   name: 'Family.png',
  //   type: 'file',
  //   parentId: 2,
  //   url: 'https://example.com/family.png',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   size: 0,
  // },
  // {
  //   id: 11,
  //   name: 'Project Plan.xlsx',
  //   type: 'file',
  //   parentId: 3,
  //   url: 'https://example.com/project-plan.xlsx',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   size: 0,
  // },
  // {
  //   id: 12,
  //   name: 'Presentation.pptx',
  //   type: 'file',
  //   parentId: 3,
  //   url: 'https://example.com/presentation.pptx',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   size: 0,
  // },
  // {
  //   id: 13,
  //   name: 'Budget.xlsx',
  //   type: 'file',
  //   parentId: 3,
  //   url: 'https://example.com/budget.xlsx',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   size: 0,
  // },
  // {
  //   id: 14,
  //   name: 'Quarterly Report.xlsx',
  //   type: 'file',
  //   parentId: 4,
  //   url: 'https://example.com/quarterly-report.xlsx',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   size: 0,
  // },
  // {
  //   id: 15,
  //   name: 'Meeting Notes.docx',
  //   type: 'file',
  //   parentId: 4,
  //   url: 'https://example.com/meeting-notes.docx',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   size: 0,
  // },
  // {
  //   id: 16,
  //   name: 'Important Notes.txt',
  //   type: 'file',
  //   parentId: 0,
  //   url: 'https://example.com/important-notes.txt',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   size: 0,
  // },
  // {
  //   id: 17,
  //   name: 'Schedule.pdf',
  //   type: 'file',
  //   parentId: 0,
  //   url: 'https://example.com/schedule.pdf',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   size: 0,
  // },
  // {
  //   id: 18,
  //   name: 'accounts.xlsx',
  //   type: 'file',
  //   parentId: 5,
  //   url: 'https://example.com/accounts.xlsx',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   size: 0,
  // },
]

// Add more mock data up to 50 entries
// let currentFileCount = mockDriveFiles.length
// for (let i = currentFileCount + 1; i <= currentFileCount + 10; i++) {
//   mockDriveFiles.push({
//     id: i,
//     name: `Document_${i}.pdf`,
//     type: 'file',
//     parentId: 0,
//     url: 'https://example.com/document.pdf',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     size: 0,
//   })
// }

// add 20 mock files to folder-1
// currentFileCount = mockDriveFiles.length
// for (let i = currentFileCount + 1; i <= currentFileCount + 20; i++) {
//   mockDriveFiles.push({
//     id: i,
//     name: `Document_${i}.pdf`,
//     type: 'file',
//     parentId: 1,
//     url: 'https://example.com/document.pdf',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     size: 0,
//   })
// }

const mockDriveItems = [...mockDriveFolders, ...mockDriveFiles]

export { mockDriveItems, mockDriveFolders, mockDriveFiles }
