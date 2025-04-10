'use client'

import React from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import Image from 'next/image'
import { Button } from '../ui/button'

export default function TopNav() {
  const { theme, setTheme } = useTheme()

  return (
    <Menubar className='flex items-center rounded-none h-14'>
      <div className='flex-none'>
        <MenubarMenu>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={50} height={50} />
          </Link>
        </MenubarMenu>
      </div>

      <div className='flex flex-grow items-center justify-end gap-3'>
        <MenubarMenu>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <MenubarTrigger className='text-base'>Dashboard</MenubarTrigger>
          <MenubarContent>
            <MenubarItem><Link href="/dashboard">Dashboard</Link></MenubarItem>
            <MenubarSeparator />
            <MenubarItem><Link href="/dashboard/create-video">Create Video</Link></MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
            <SignedOut>
                <SignInButton/>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </MenubarMenu>
      </div>
    </Menubar>
  )
}
