import React from 'react'
import Image from 'next/image'
function Footer() {
    const Menu=[
        {
        id:1,
        name:"Accuei",
        path:"/home"
    },
   
    {
        id:2,
        name:"Explorer",
        path:"/home/details/3",
    },

    {
      id:3,
      name:"Contactez-nous",
      path:"/home/Contactez-nous"
  },
    
]
  return (
    <footer className="bg-white rounded-lg shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 dark:bg-gray-800 antialiased">
  <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
      &copy; 2024 <a href="https://www.linkedin.com/in/ala-hassouna/" className="hover:underline" target="_blank">Ala Hassouna</a>. All rights reserved.
  </p>
  <div className="flex justify-center items-center space-x-1">
    <a href="https://sghartoon.com/"  target="_blank" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600">
       
        <img src="/sghartoon.png" className="w-12 h-12"/>

        <span className="sr-only">Sghartoon</span>
    </a>
    
</div>
</footer>
  )
}

export default Footer