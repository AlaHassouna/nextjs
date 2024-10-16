import React from 'react'
import CategoryList  from './_components/CategoryList';

function layout({children,params}) {
  return (
    <div className='grid grid-cols-4'>
        <div className='hidden md:block'>
            {/* Category */}
            <CategoryList />
        </div>
        <div className='col-span-4 md:col-span-3'>
            {children}
        </div>
        
        
        {/* {children} */}
        </div>
  )
}

export default layout