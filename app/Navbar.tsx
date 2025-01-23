'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import logo from '@/public/logo.png'
import  { usePathname } from 'next/navigation'
import classnames from 'classnames';
import { Avatar, Box, Container, DropdownMenu, Text } from '@radix-ui/themes'
import { useSession } from 'next-auth/react';
import Skeleton from '@/app/components/Skeleton'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

const Navbar = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className={`border-b transition-all duration-500 ${
      isDropdownOpen ? 'h-[250px]' : 'h-[150px]'
    } px-9 py-3 mb-5`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" >
          <Container width={{ initial: "10em", md: "15em"}} align='center'>
            <Image alt="logo" src={logo} />
            </Container>
          </Link>
        </div>

        {/* Meniul Desktop */}
        <div className="hidden md:flex items-center gap-9">
          <NavLinks />
          <AuthStatus />
        </div>

        {/* Meniul Mobile */}
        <div className="flex md:hidden items-center justify-between">

          <Container mr='6' align='center'>
              <AuthStatus />
          </Container>

          <DropdownMenu.Root modal={false} open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenu.Trigger >
              <button className="p-2" aria-label="Deschide meniul">
                <HamburgerMenuIcon className="w-8 h-8 " color='gray' />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
               className="relative top-5 right-px p-4 " style={{ boxShadow: "none"}}>
              <DropdownMenu.Item asChild >
                <NavLinks isVertical={true}/>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>

        </div>
      </div>
    </nav>
  );
};

const NavLinks = ({ isVertical = false }) => {
  const currentPath = usePathname();

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Recipes', href: '/recipes' },
  ];

  return (
    <ul
      className={classnames('flex', {
        'space-x-14': !isVertical, // Spațiere pe orizontală (default)
        'flex-col space-y-4': isVertical, // Spațiere pe verticală
      })}
    >
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classnames('nav-link', {
              '!text-zinc-900': link.href === currentPath, // Evidențiază linkul curent
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

    const AuthStatus = () => {

      const { status, data: session } = useSession();

      if (status === "loading") return <Skeleton width='2rem' height='2rem' borderRadius='2rem'/>
      return(
        <Box>
          { status === "authenticated" &&
                        <DropdownMenu.Root>
                           <DropdownMenu.Trigger>
                             <Avatar
                                 src={session.user!.image!}
                                 fallback="?"
                                 size='2'
                                 radius='full'
                                 className='cursor-pointer'
                                 referrerPolicy='no-referrer'/>
                           </DropdownMenu.Trigger>
                           <DropdownMenu.Content>
                             <DropdownMenu.Label>
                              <Text size='2'>{session.user!.email}</Text>
                             </DropdownMenu.Label>
                             <DropdownMenu.Item>
                                <Link href='/api/auth/signout'>Log out</Link>
                             </DropdownMenu.Item>
                           </DropdownMenu.Content>
                          </DropdownMenu.Root>}
          { status === "unauthenticated" && <Link className='nav-link' href='/api/auth/signin'>Log in</Link>}

        </Box>
      )
    }
export default Navbar
