'use client'

import { useEffect } from 'react'

function getToggleTarget(button: HTMLElement, attribute: string) {
  const targetId = button.getAttribute(attribute)

  if (!targetId) {
    return null
  }

  return document.getElementById(targetId)
}

function closeDropdown(dropdown: HTMLElement) {
  dropdown.classList.add('hidden')
  dropdown.removeAttribute('style')
}

function positionDropdown(button: HTMLElement, dropdown: HTMLElement) {
  const buttonRect = button.getBoundingClientRect()
  const dropdownRect = dropdown.getBoundingClientRect()
  const margin = 8
  const left = Math.min(
    Math.max(margin, buttonRect.right - dropdownRect.width),
    window.innerWidth - dropdownRect.width - margin,
  )

  dropdown.style.position = 'absolute'
  dropdown.style.top = `${buttonRect.bottom + margin}px`
  dropdown.style.right = '0' //`${left}px`
}

function DashboardInteractions() {
  useEffect(() => {
    const closeOpenDropdowns = (except?: HTMLElement) => {
      document.querySelectorAll<HTMLElement>('[data-dashboard-dropdown="open"]').forEach((dropdown) => {
        if (dropdown !== except) {
          dropdown.removeAttribute('data-dashboard-dropdown')
          closeDropdown(dropdown)
        }
      })
    }

    const closeMobileDrawer = () => {
      const drawer = document.getElementById('drawer-navigation')

      if (drawer && window.innerWidth < 768) {
        drawer.classList.add('-translate-x-full')
      }
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const collapseButton = target.closest<HTMLElement>('[data-collapse-toggle]')
      const dropdownButton = target.closest<HTMLElement>('[data-dropdown-toggle]')
      const drawerButton = target.closest<HTMLElement>('[data-drawer-toggle]')

      if (collapseButton) {
        const collapse = getToggleTarget(collapseButton, 'data-collapse-toggle')

        if (collapse) {
          collapse.classList.toggle('hidden')
          collapseButton.setAttribute('aria-expanded', String(!collapse.classList.contains('hidden')))
        }
      }

      if (dropdownButton) {
        const dropdown = getToggleTarget(dropdownButton, 'data-dropdown-toggle')

        if (dropdown) {
          const isOpening = dropdown.classList.contains('hidden')

          closeOpenDropdowns(dropdown)
          dropdown.classList.toggle('hidden')
          dropdownButton.setAttribute('aria-expanded', String(isOpening))

          if (isOpening) {
            dropdown.setAttribute('data-dashboard-dropdown', 'open')
            positionDropdown(dropdownButton, dropdown)
          } else {
            dropdown.removeAttribute('data-dashboard-dropdown')
            dropdown.removeAttribute('style')
          }
        }
      }

      if (drawerButton) {
        const drawer = getToggleTarget(drawerButton, 'data-drawer-toggle')

        if (drawer) {
          drawer.classList.toggle('-translate-x-full')
          drawerButton.setAttribute('aria-expanded', String(!drawer.classList.contains('-translate-x-full')))
        }
      }

      if (!dropdownButton && !target.closest('[data-dashboard-dropdown="open"]')) {
        closeOpenDropdowns()
      }

      if (!drawerButton && !target.closest('#drawer-navigation')) {
        closeMobileDrawer()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeOpenDropdowns()
        closeMobileDrawer()
      }
    }

    const handleResize = () => {
      closeOpenDropdowns()
      closeMobileDrawer()
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return null
}

export default DashboardInteractions
