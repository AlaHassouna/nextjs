import React from 'react';
import Appoinments from './_components/Appoinments';

function Page() {
  return (
    <main className="p-4 md:ml-64 h-auto pt-20">
      <div className="rounded-lg  h-96 mb-4">
        <Appoinments />
      </div>
      
    </main>
  );
}

export default Page;
