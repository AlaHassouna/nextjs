"use client"

import React, { useEffect, useState } from 'react';
import Historique from '../_components/Historique';
import GlobalApi from '@/app/home/_utils/GlobalApi';

function Details({ params }) {
    const [fiches, setFiches] = useState([]);

    useEffect(() => {
        console.log("params.recordid :", params.recordid);
        GlobalApi.getFiches(params.recordid)
            .then(resp => {
                const fiches = resp.data.data;
                setFiches(fiches);
                console.log('fiches fetched', fiches);
            })
            .catch(error => {
                console.error('Error fetching fiches:', error);
            });
    }, [params.recordid]);

    return (
        <main className="p-4 md:ml-64 h-auto pt-20">
            <section className="bg-white dark:bg-gray-900">
                {/* Pass setFiches as a prop to Historique */}
                <Historique user={fiches} setUser={setFiches} />
            </section>
        </main>
    );
}

export default Details;
