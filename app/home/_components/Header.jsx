"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  


function Header() {
    const Menu=[
        {
        id:1,
        name:"Accuei",
        path:"/home"
    },
   
    {
        id:2,
        name:"Explorer",
        path:"/home/details/3"
    },
    {
        id:3,
        name:"Contactez-nous",
        path:"/home/contactez-nous"
    },
    
]

    const {user}  = useKindeBrowserClient();

    useEffect(()=>{
        // console.log("test")
        // console.log(user)
    },[user])
  return (
    
    <div className='flex items-center 
    justify-between p-4 shadow-sm transition-all ease-in-out'>
        <div className='flex items-center gap-10'>
        <a href='/home'><Image src="/logo.png" alt="Logo" height={50} width={80}  /></a>
        <ul className='md:flex gap-8 hidden'>
            {Menu.map((item, index)=>(
                <Link href={item.path}>
                    <li className='hover:text-primary cursor-pointer'>{item.name}</li>
                </Link>
            ))}
        </ul>
        </div>
       {user?  
       
       <Popover>
           
            <PopoverTrigger> <Image src={user?.picture} alt='profile-image' width={50} height={50} 
            className='rounded-full'/></PopoverTrigger>
            <PopoverContent className="w-44">
                <ul className='flex flex-col gap-2'>
                <Link href={'/home/profil'} className='cursor-pointer hover:bg-slate-100 p-2 rounded-md' >Profil</Link>
                    <Link href={'/home/my-booking'} className='cursor-pointer hover:bg-slate-100 p-2 rounded-md' >Rendez-vous</Link>
                    <li className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'><LogoutLink>Déconnexion</LogoutLink></li>
                </ul>
                {/* <LogoutLink><Button>Déconnexion</Button></LogoutLink> */}
            </PopoverContent>
        </Popover>

      
        :
        <LoginLink>
        <Button>Connexion</Button>
        </LoginLink>        
        }
    </div>
  )
}

export default Header