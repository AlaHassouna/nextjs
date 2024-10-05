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
    <footer className="bg-gray-100">
  <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
    <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
      <a
        className="inline-block rounded-full bg-[#3a6fb6] p-2 text-white shadow transition hover:bg-[#528ad4] sm:p-3 lg:p-4"
        href="#"
      >
        <span className="sr-only">Back to top</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>

    <div className="lg:flex lg:items-end lg:justify-between">
      <div>
        <div className="mx-auto max-w-5xl justify-center text-center flex flex-col items-center ">
        <Image src="/logo.png" alt="Logo" height={200} width={100} />
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
        
        Le cabinet prend en charge une grande variété de troubles, qu'ils soient d'origine développementale, 
          neurologique, génétique, sensorielle, traumatique ou neuro-dégénérative, en offrant une approche 
          personnalisée pour chaque patient.  
        </p>
      </div>

      <ul
        className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12"
      >
         {Menu.map((item, index)=>(
            <li>
            <a className="text-gray-700 hover:text-primary transition " href={item.path}> {item.name} </a>
          </li>
                
            ))}


       
      </ul>
    </div>

    <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
      Copyright &copy; 2024. Tous droits réservés.


    </p>
  </div>
</footer>
  )
}

export default Footer