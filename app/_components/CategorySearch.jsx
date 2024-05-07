"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import GlobalApi from '../_utils/GlobalApi'
import Image from 'next/image'
import Link from 'next/link'
function CategorySearch() {
  const [categoryList,setCategoryList]=useState([]);
  useEffect(()=>{
    getCategoryList()
  },[])
  const getCategoryList=()=>{
    GlobalApi.getCategory().then(resp=>{
      // console.log(resp.data.data)
      setCategoryList(resp.data.data)
  })
}
  return (
    <div className='mb-10 items-center px-5 flex flex-col gap-4'>
        <h2 className='font-bold text-4xl tracking-wide'>Trouver des <span className='text-primary'>Médecins</span></h2>
        <h2 className='text-gray-400 text-xl'>Cherchez votre médecin et prenez rendez-vous en un clic</h2>
        <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Rechercher..." />
            <Button type="submit">
                <Search className='h-4 w-4 mr-2'/>
                Rechercher
            </Button>
        </div>
        {/* Display List of category */}
        <div className='grid grid-cols-2 mt-5 md:grid-cols-4 lg:grid-cols-6 '>
        {categoryList.length>0?categoryList.map((item,index)=>index<6&&(
          <Link href={'/search/'+item.attributes.Name} key={index} className='flex flex-col text-center gap-2 items-center p-5 bg-blue-50 m-2 rounded-lg hover:scale-110 transition-all ease-in-out'>
            
            <Image src={item.attributes?.Icon?.data.attributes?.url}
            alt="Icon"
            width={40}
            height={40}
            />
            <label className='text-primary text-sm'>{item?.attributes?.Name}</label>
            </Link>

        ))
      :
      [1,2,3,4,5,6].map((item,index)=>(
        <div className='h-[100px] w-[100px] m-2 bg-slate-200 animate-pulse rounded-lg'>

      </div>
      ))
      
      }
        </div>
    </div>
  )
}

export default CategorySearch
