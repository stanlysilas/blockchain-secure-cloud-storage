import { useEffect, useRef, useState } from 'react'

import {
  MoreVertical,
  Download,
  Share2,
  Info,
  Eye,
  LoaderCircle,
  Trash2
} from 'lucide-react'

import { Button } from '@/components/ui/button'

function FileMenu ({
  downloading,
  onDownload,
  onShare,
  onInfo,
  onDelete,
  onPreview,
  canPreview = true,
  canDownload = true,
  canShare = true,
  canInfo = true,
  canDelete = true
}) {
  const [open, setOpen] = useState(false)
  const [openUp, setOpenUp] = useState(false)
  const [openLeft, setOpenLeft] = useState(false)

  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    function handleClickOutside (event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!downloading) {
      setOpen(false)
    }
  }, [downloading])

  const toggleMenu = () => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()

    const menuWidth = 220
    const menuHeight = 270

    const spaceRight = window.innerWidth - rect.right
    const spaceLeft = rect.left

    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top

    setOpenLeft(spaceRight < menuWidth && spaceLeft > spaceRight)

    setOpenUp(spaceBelow < menuHeight && spaceAbove > spaceBelow)

    setOpen(prev => !prev)
  }

  return (
    <div ref={menuRef} className='relative' onClick={e => e.stopPropagation()}>
      <Button ref={buttonRef} variant='ghost' size='icon' onClick={toggleMenu}>
        <MoreVertical className='w-5 h-5' />
      </Button>

      {open && (
        <div
          className={`file-menu
            ${openUp ? 'file-menu-top' : 'file-menu-bottom'}
            ${openLeft ? 'file-menu-left' : 'file-menu-right'}
          `}
        >
          {canDownload && (
            <button
              className='file-menu-item'
              disabled={downloading}
              onClick={() => {
                if (downloading) return

                onDownload()
              }}
            >
              {downloading ? (
                <>
                  <LoaderCircle className='w-4 h-4 animate-spin' />
                  Decrypting...
                </>
              ) : (
                <>
                  <Download className='w-4 h-4' />
                  Download
                </>
              )}
            </button>
          )}

          {canPreview && (
            <button
              className='file-menu-item'
              onClick={() => {
                setOpen(false)
                onPreview()
              }}
            >
              <Eye className='w-4 h-4' />
              Preview
            </button>
          )}

          {canShare && (
            <button
              className='file-menu-item'
              onClick={() => {
                setOpen(false)
                onShare()
              }}
            >
              <Share2 className='w-4 h-4' />
              Share Access
            </button>
          )}

          {canInfo && (
            <button
              className='file-menu-item'
              onClick={() => {
                setOpen(false)
                onInfo()
              }}
            >
              <Info className='w-4 h-4' />
              File Information
            </button>
          )}

          {canDelete && (
            <button
              className='file-menu-item text-red-400 hover:bg-red-400/10'
              onClick={() => {
                setOpen(false)
                onDelete()
              }}
            >
              <Trash2 className='w-4 h-4' />
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default FileMenu
