'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import { Avatar, Box, DropdownMenu, Text, Skeleton } from '@radix-ui/themes'
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons'


const logoPath = '/logo.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-16 h-16 transition-transform group-hover:scale-105">
              <Image
                alt="Vintage Flavour Logo"
                src={logoPath}
                fill
                priority
                className="object-contain"
              />
            </div>
            <span className="hidden sm:block text-2xl great-vibes-regular text-brand-orange">
              Vintage Flavour
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          {/* Auth & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <AuthStatus />

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <Cross1Icon className="w-6 h-6 text-gray-700" />
              ) : (
                <HamburgerMenuIcon className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={classnames(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            {
              'max-h-64 opacity-100 pb-6': isMenuOpen,
              'max-h-0 opacity-0': !isMenuOpen,
            }
          )}
        >
          <div className="pt-4 pb-2 space-y-2">
            <NavLinks isMobile onLinkClick={() => setIsMenuOpen(false)} />
          </div>
        </div>
      </div>
    </nav>
  )
}

const NavLinks = ({ isMobile = false, onLinkClick }: { isMobile?: boolean; onLinkClick?: () => void }) => {
  const currentPath = usePathname()
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Recipes', href: '/recipes' },
  ]

  return (
    <div className={classnames(isMobile ? "space-y-1" : "flex items-center space-x-1")}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className={classnames(
            'px-4 py-2 rounded-lg text-base font-medium transition-all relative overflow-hidden group',
            isMobile ? 'block py-3' : '',
            {
              'text-brand-green': link.href === currentPath,
              'text-gray-700 hover:text-brand-green': link.href !== currentPath,
            }
          )}
        >
          <span className="relative z-10">{link.label}</span>
          <span
            className={classnames(
              'absolute inset-0 bg-brand-green/10 transform transition-transform duration-300',
              {
                'scale-100': link.href === currentPath,
                'scale-0 group-hover:scale-100': link.href !== currentPath,
              }
            )}
          />
        </Link>
      ))}
    </div>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession()

  if (status === 'loading') {
    return <Skeleton width="40px" height="40px" className="rounded-full" />
  }

  return (
    <Box>
      {status === 'authenticated' && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button className="relative group flex items-center">
              <div className="absolute -inset-1 bg-linear-to-r from-brand-green to-[#5ea330] rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur" />
              <Avatar
                src={session.user?.image || undefined}
                fallback={session.user?.name?.[0] || "?"}
                size="3"
                radius="full"
                className="cursor-pointer relative border-2 border-white"
              />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant="soft">
            <div className="flex flex-col gap-1 px-3 py-2">
              <Text size="2" weight="bold">
                {session.user?.name || 'User'}
              </Text>
              <Text size="1" color="gray">
                {session.user?.email}
              </Text>
            </div>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              color="red"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sign out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
      {status === 'unauthenticated' && (
        <button
          onClick={() => signIn()}
          className="bg-brand-green hover:bg-[#5ea330] text-white px-6 py-2.5 rounded-lg font-medium transition-all text-sm shadow-md"
        >
          Sign in
        </button>
      )}
    </Box>
  )
}

export default Navbar