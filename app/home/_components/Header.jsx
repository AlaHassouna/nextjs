"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const Menu = [
    { id: 1, name: "Accueil", path: "/home" },
    { id: 2, name: "Explorer", path: "/home/details/3" },
    { id: 3, name: "Contactez-nous", path: "/home/contactez-nous" },
  ];

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleMenuToggle = (event) => {
    event.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
        <a href="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Cabinet Marwa</span>
        </a>
        <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
          {user ? (
            <Popover>
              <PopoverTrigger>
                <Image src={user?.picture} alt='profile-image' width={50} height={50} className='rounded-full' />
              </PopoverTrigger>
              <PopoverContent className="w-44">
                <ul className='flex flex-col gap-2'>
                  <Link href={'/home/profil'} className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>Profil</Link>
                  <Link href={'/home/my-booking'} className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>Rendez-vous</Link>
                  <li className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'><LogoutLink>Déconnexion</LogoutLink></li>
                </ul>
              </PopoverContent>
            </Popover>
          ) : (
            <LoginLink>
              <Button>Connexion</Button>
            </LoginLink>
          )}
          <button
            onClick={handleMenuToggle}
            data-collapse-toggle="mega-menu"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mega-menu"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div id="mega-menu" className={`items-center justify-between ${menuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`}>
          <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
            {Menu.map((item, index) => (
              <Link href={item.path} key={index}>
                <li
                  className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                  onClick={handleMenuItemClick}
                >
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
