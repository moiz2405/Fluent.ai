'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Search, Menu, ShoppingCart } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { path: '/product', name: 'Products' },
  { path: '/user', name: 'User' },
  { path: '/checkout', name: 'Checkout' },
  { path: '/admin', name: 'Admin' },
  { path: '/api/auth/login', name: 'Login' },
  { path: '/auth/register', name: 'Register' },
]

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const pathname = usePathname()

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Search for:', searchQuery)
    // Implement search functionality here
  }

  return (
    <nav
      className={cn(
        "fixed w-full top-0 left-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-2" aria-label="Homepage">
            <Image
              src="/images/home/logo.png"
              alt="Fluent.ai Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-lg font-bold">Fluent.ai</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navLinks.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.path}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === item.path ? "text-primary" : "text-muted-foreground"
                      )}
                      aria-current={pathname === item.path ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center max-w-sm mx-4 flex-1">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
            <Button type="submit" size="icon" variant="ghost" className="ml-2" aria-label="Submit search">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>

          {/* Cart Button */}
          <Button variant="ghost" size="icon" className="hidden md:flex" aria-label="Shopping Cart">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Shopping Cart</span>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open mobile menu">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-4">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === item.path ? "text-primary" : "text-muted-foreground"
                    )}
                    aria-current={pathname === item.path ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-4">
                <form onSubmit={handleSearch} className="flex items-center">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search products"
                  />
                  <Button type="submit" size="icon" variant="ghost" className="ml-2" aria-label="Submit search">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </form>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
