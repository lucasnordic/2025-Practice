'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'

// DropdownMenu is the Root component from Radix
const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

// Styled component for DropdownMenuContent
const DropdownMenuContent = styled(DropdownMenuPrimitive.Content)`
  z-index: 50;
  min-width: 8rem;
  overflow: hidden;
  border-radius: 0.375rem; /* rounded-md */
  border: 1px solid #e4e4e7; /* bg-popover */
  background-color: #fafafa; /* bg-popover */
  padding: 0.25rem; /* p-1 */
  color: #333; /* text-popover-foreground */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* shadow-md */

  /* Animations for opening and closing */
  &[data-state='open'] {
    animation:
      fadeIn 0.3s ease-in-out,
      zoomIn 0.3s ease-in-out;
  }

  &[data-state='closed'] {
    animation:
      fadeOut 0.3s ease-in-out,
      zoomOut 0.3s ease-in-out;
  }

  /* Directional Animations */
  &[data-side='bottom'] {
    animation: slideInFromTop 0.3s ease-in-out;
  }

  &[data-side='left'] {
    animation: slideInFromRight 0.3s ease-in-out;
  }

  &[data-side='right'] {
    animation: slideInFromLeft 0.3s ease-in-out;
  }

  &[data-side='top'] {
    animation: slideInFromBottom 0.3s ease-in-out;
  }

  /* Keyframe Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes zoomIn {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes zoomOut {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.95);
    }
  }

  @keyframes slideInFromTop {
    from {
      transform: translateY(-10px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideInFromLeft {
    from {
      transform: translateX(-10px);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(10px);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideInFromBottom {
    from {
      transform: translateY(10px);
    }
    to {
      transform: translateY(0);
    }
  }
`

// Styled component for DropdownMenuItem
const DropdownMenuItem = styled(DropdownMenuPrimitive.Item)`
  display: flex;
  align-items: center;
  gap: 0.5rem; /* gap-2 */
  padding: 0.375rem 0.5rem; /* px-2 py-1.5 */
  font-size: 0.875rem; /* text-sm */
  cursor: pointer;
  border-radius: 0.25rem; /* rounded-sm */
  outline: none;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #f0f0f0; /* hover effect */
  }

  &[data-disabled='true'] {
    pointer-events: none;
    opacity: 0.5;
  }
`

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
}
