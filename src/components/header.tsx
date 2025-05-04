'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button';
import { 
  ChevronDown, 
  FileTextIcon, 
  GraduationCapIcon, 
  LayoutDashboard, 
  PenBox, 
  StarsIcon,
  UserCircle,
  LogOut
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession, signIn } from 'next-auth/react'

function Header() {
  const { data: session } = useSession();
  const isSignedIn = !!session;

  return (
    <header className='fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60'>
      <nav className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <Link href='/'>
          <h2 className='font-bold text-2xl'>Futur<span className='text-red-500'>E</span>dge</h2>
        </Link>
        <div>
          {isSignedIn && (
            <div className='flex items-center space-x-2 md:space-x-4'>
              <Link href={"/dashboard"}>
                <Button variant={'outline'} className="flex items-center gap-2">
                  <LayoutDashboard className='h-4 w-4' />
                  <span className='hidden md:inline'>Industry Insights</span>
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <StarsIcon className='h-4 w-4' />
                    <span className='hidden md:inline'>Growth Tools</span>
                    <ChevronDown className='h-4 w-4 md:ml-1' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="flex md:flex-col">
                  <DropdownMenuItem asChild>
                    <Link href={'/resume'} className='flex items-center gap-2 w-full'>
                      <FileTextIcon className='h-4 w-4' />
                      <span className='md:block hidden '>Build Resume</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={'/ai-cover-letter'} className='flex items-center gap-2 w-full'>
                      <PenBox className='h-4 w-4' />
                      <span className='md:block hidden '>Cover Letter</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={'/interview'} className='flex items-center gap-2 w-full'>
                      <GraduationCapIcon className='h-4 w-4' />
                      <span className='md:block hidden '>Interview Prep</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full w-11 h-11 flex items-center justify-center">
                    <UserCircle className="w-full" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="text-red-500 cursor-pointer">
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          {!isSignedIn && (
            <Button onClick={() => signIn()}>Sign In</Button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header