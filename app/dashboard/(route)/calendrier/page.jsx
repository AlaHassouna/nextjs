import React from 'react'
import Calendar from './_components/Calendar'
import CalendarV from './_components/CalendarV'

function Page() {
  return (
    <main className="p-4 md:ml-64 h-auto pt-20">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-full rounded-lg border-gray-300 dark:border-gray-600 h-auto mb-4">
          {/* <Calendar /> */}
          <CalendarV/>
        </div>
      </div>
    </main>
  )
}

export default Page
