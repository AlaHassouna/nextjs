import React from 'react'

function NextPatient() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
      {/* <img
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="w-9/12 sm:w-1/3 h-auto rounded-lg object-cover mx-auto"
      /> */}
      <div className="w-full sm:w-2/3">
        <h3 className="text-lg font-medium text-gray-900">Johnson Emily</h3>
        <h2 className='text-sm mt-1 mb-1 bg-blue-100 p-1 rounded-full text-primary w-max'>
          Trouble du langage
        </h2>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-1">Date de Naissance</th>
                <th scope="col" className="px-2 py-1">Sex</th>
                <th scope="col" className="px-2 py-1">Dernier Visite</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-gray-800">
                <td className="px-2 py-1 font-medium text-gray-900 dark:text-white">20/12/2001</td>
                <td className="px-2 py-1">Homme</td>
                <td className="px-2 py-1">18/05/2024</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-2 mr-3">
          <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Consulter</a>
        </div>
      </div>
    </div>
  )
}

export default NextPatient
