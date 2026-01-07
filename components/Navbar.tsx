'use client'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import React, { useState } from 'react'
import Image from 'next/image'
import logo from '@/public/logo.png'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import { Avatar, Box, DropdownMenu, Text } from '@radix-ui/themes'
import Skeleton from '@/components/Skeleton'
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons'

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
                src={logo}
                fill
                className="object-contain"
              />
            </div>
            <span className="hidden sm:block text-2xl font-bold great-vibes-regular orange">
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

            {/* Mobile Menu Button */}
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

  if (isMobile) {
    return (
      <div className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={classnames(
              'block px-4 py-3 rounded-lg text-base font-medium transition-all',
              {
                'bg-[#79c141]/10 text-[#79c141] border-l-4 border-[#79c141]':
                  link.href === currentPath,
                'text-gray-700 hover:bg-gray-50': link.href !== currentPath,
              }
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={classnames(
            'px-4 py-2 rounded-lg text-base font-medium transition-all relative overflow-hidden group',
            {
              'text-[#79c141]': link.href === currentPath,
              'text-gray-700 hover:text-[#79c141]': link.href !== currentPath,
            }
          )}
        >
          <span className="relative z-10">{link.label}</span>
          <span
            className={classnames(
              'absolute inset-0 bg-[#79c141]/10 transform transition-transform duration-300',
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
    return <Skeleton width="2.5rem" height="2.5rem" borderRadius="9999px" />
  }

  return (
    <Box>
      {status === 'authenticated' && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#79c141] to-[#5ea330] rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur" />
              <Avatar
                src={session.user!.image!}
                fallback="?"
                size="3"
                radius="full"
                className="cursor-pointer relative"
                referrerPolicy="no-referrer"
              />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="min-w-[200px]">
            <DropdownMenu.Label>
              <div className="flex flex-col gap-1 px-2 py-1.5">
                <Text size="2" className="font-medium text-gray-900">
                  {session.user!.name || 'User'}
                </Text>
                <Text size="1" className="text-gray-500">
                  {session.user!.email}
                </Text>
              </div>
            </DropdownMenu.Label>
            <DropdownMenu.Separator />

            <DropdownMenu.Item
              color="red"
              onClick={() => signOut({ callbackUrl: '/' })}
              className="cursor-pointer"
            >
              Sign out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
      {status === 'unauthenticated' && (
        <button
          onClick={() => signIn(undefined, { callbackUrl: '/' })}
          className="bg-gradient-to-r from-[#79c141] to-[#5ea330] text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-sm"
        >
          Sign in
        </button>
      )}
    </Box>
  )
}

export default Navbar