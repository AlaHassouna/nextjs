import React from 'react'
import Search from './_components/Search'
import AddButton from './_components/AddButton'
import ExportButton from './_components/ExportButton'
import UserList from './_components/UserList'

function page() {
  return (
    <main className="p-4 md:ml-64 h-auto pt-20">
      <UserList/>
      
      
    </main>
    
  )
}

export default page