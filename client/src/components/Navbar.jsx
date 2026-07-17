import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

import {
  Pencil,
  ShieldCheck,
  LayoutDashboard,
  Upload,
  Share2,
  Home,
  User,
  Menu,
  X
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useWallet } from '@/context/WalletContext'

import WalletButton from './WalletButton'

function Navbar () {
  const { walletName, network, renameWallet } = useWallet()

  const [drawerOpen, setDrawerOpen] = useState(false)

  const { isConnected, connectWallet } = useWallet()

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  const navStyle = ({ isActive }) =>
    isActive ? 'navbar-link navbar-link-active' : 'navbar-link'

  const drawerNavStyle = ({ isActive }) =>
    isActive ? 'drawer-link drawer-link-active' : 'drawer-link'

  const closeDrawer = () => setDrawerOpen(false)

  return (
    <>
      <div className='navbar-wrapper'>
        <nav className='navbar-shell'>
          <div className='navbar-content'>
            <div className='flex items-center gap-4'>
              <div className='lg:hidden'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => setDrawerOpen(true)}
                >
                  <Menu className='w-6 h-6' />
                </Button>
              </div>

              <div className='navbar-brand'>
                <div className='navbar-logo'>
                  <ShieldCheck className='w-6 h-6 text-blue-400' />
                </div>

                <div>
                  <h1 className='navbar-title'>BlockDrive</h1>

                  <p className='navbar-subtitle'>
                    Secure Decentralized Storage
                  </p>
                </div>
              </div>
            </div>

            <div className='navbar-right'>
              <div className='navbar-links'>
                {isConnected ? null : (
                  <NavLink to='/' className={navStyle}>
                    <div className='flex items-center gap-2'>
                      <Home className='w-4 h-4' />
                      Home
                    </div>
                  </NavLink>
                )}

                <NavLink to='/dashboard' className={navStyle}>
                  <div className='flex items-center gap-2'>
                    <LayoutDashboard className='w-4 h-4' />
                    Dashboard
                  </div>
                </NavLink>

                <NavLink to='/upload' className={navStyle}>
                  <div className='flex items-center gap-2'>
                    <Upload className='w-4 h-4' />
                    Upload
                  </div>
                </NavLink>

                <NavLink to='/shared' className={navStyle}>
                  <div className='flex items-center gap-2'>
                    <Share2 className='w-4 h-4' />
                    Shared
                  </div>
                </NavLink>

                <NavLink to='/profile' className={navStyle}>
                  <div className='flex items-center gap-2'>
                    <User className='w-4 h-4' />
                    Profile
                  </div>
                </NavLink>
              </div>

              <WalletButton />
            </div>
          </div>
        </nav>
      </div>

      {drawerOpen && (
        <>
          <div
            className='lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40'
            onClick={closeDrawer}
          />

          <div className='drawer lg:hidden fixed top-0 left-0 h-screen w-72 overflow-y-auto bg-black/90 backdrop-blur-2xl border-r border-white/10 z-50 flex flex-col'>
            <div className='flex items-center justify-between p-6 border-b border-white/10'>
              <div className='flex items-center gap-3'>
                <div className='navbar-logo'>
                  <ShieldCheck className='w-6 h-6 text-blue-400' />
                </div>

                <div>
                  <h2 className='font-black text-xl'>BlockDrive</h2>

                  <p className='text-xs text-gray-400'>Secure Storage</p>
                </div>
              </div>

              <Button
                variant='ghost'
                className='lg:hidden'
                size='icon'
                onClick={closeDrawer}
              >
                <X className='w-5 h-5' />
              </Button>
            </div>

            <div className='flex-1 p-4 space-y-2'>
              <NavLink to='/' className={drawerNavStyle} onClick={closeDrawer}>
                <div className='flex items-center gap-3'>
                  <Home className='w-5 h-5' />
                  Home
                </div>
              </NavLink>

              <NavLink
                to='/dashboard'
                className={drawerNavStyle}
                onClick={closeDrawer}
              >
                <div className='flex items-center gap-3'>
                  <LayoutDashboard className='w-5 h-5' />
                  Dashboard
                </div>
              </NavLink>

              <NavLink
                to='/upload'
                className={drawerNavStyle}
                onClick={closeDrawer}
              >
                <div className='flex items-center gap-3'>
                  <Upload className='w-5 h-5' />
                  Upload
                </div>
              </NavLink>

              <NavLink
                to='/shared'
                className={drawerNavStyle}
                onClick={closeDrawer}
              >
                <div className='flex items-center gap-3'>
                  <Share2 className='w-5 h-5' />
                  Shared Files
                </div>
              </NavLink>

              <NavLink
                to='/profile'
                className={drawerNavStyle}
                onClick={closeDrawer}
              >
                <div className='flex items-center gap-3'>
                  <User className='w-5 h-5' />
                  Profile
                </div>
              </NavLink>
            </div>

            <div className='border-t border-white/10 p-6 space-y-4'>
              <div>
                <p className='text-base font-semibold'>
                  {walletName || 'Unnamed Wallet'}
                </p>

                <p className='text-sm text-gray-400 mt-1'>
                  {network?.name || 'Unknown Network'}
                </p>
              </div>

              <Button variant='glass' size='full' onClick={renameWallet}>
                <Pencil className='w-4 h-4 mr-2' />
                Rename Wallet
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Navbar
