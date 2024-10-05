"use client";
import GlobalApi from '@/app/home/_utils/GlobalApi';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Search from './Search';
import AddPatient from './AddPatient';
import { Toaster } from 'sonner';

function UserList() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        GlobalApi.getPatients()
            .then((resp) => {
                const users = resp.data.data;
                setUsers(users);
                setFilteredUsers(users); // Initialize filtered users
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);

    // Function to update filtered users based on search query
    const handleSearch = (searchQuery) => {
        const filtered = users.filter((user) =>
            Object.values(user.attributes).some((value) =>
                value &&
                typeof value === 'string' &&
                value.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setFilteredUsers(filtered);
    };

    return (
        <>
        <Toaster />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="rounded-lg h-15 md:h-15">
                    <Search onSearch={handleSearch} />
                </div>
                <div className="rounded-lg h-15 md:h-15"></div>
                <div className="rounded-lg h-15 md:h-15 flex justify-start"></div>
                <div className="rounded-lg h-15 md:h-15 flex justify-end">
                    <AddPatient/>
                </div>
            </div>
            <div className="rounded-lg h-96 mb-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Patient</th>
                            <th scope="col" className="px-6 py-3">Adresse</th>
                            <th scope="col" className="px-6 py-3">Date de naissance</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Téléphone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.attributes.family_name} {item.attributes.given_name}
                                </th>
                                <td className="px-6 py-4">{item.attributes.Adresse}</td>
                                <td className="px-6 py-4">{item.attributes.Date_de_naissance}</td>
                                <td className="px-6 py-4">{item.attributes.email}</td>
                                <td className="px-6 py-4">{item.attributes.Phone}</td>
                                <td className="px-6 py-4">
                                    <Link href={'/dashboard/details/' + item.attributes.id_patient} className="font-medium m-2 text-[#3a6fb6] hover:underline">Modifier</Link>
                                    <Link href={'/dashboard/historique/' + item.attributes.id_patient} className="font-medium m-2 text-[#3a6fb6] hover:underline">Historique</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default UserList;
