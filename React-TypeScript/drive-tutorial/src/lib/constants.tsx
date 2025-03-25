import { Home, Share2, Clock, Star, Trash2, Grid2X2, List } from 'lucide-react'

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
