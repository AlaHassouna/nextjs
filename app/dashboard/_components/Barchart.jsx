"use client";

import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

function Barchart({ appointmentsPerDay }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }
            const context = chartRef.current.getContext("2d");
            
            const labels = Object.keys(appointmentsPerDay);
            const data = Object.values(appointmentsPerDay);

            const newChart = new Chart(context, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Nombre de patients par jour",
                            data: data,
                            backgroundColor: "#3a6fb6",
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Ajoutez cette ligne pour que le canvas prenne toute la hauteur
                    scales: {
                        x: {
                            type: "category"
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            chartRef.current.chart = newChart;
        }
    }, [appointmentsPerDay]);

    return (
        <div className="w-full h-[63] md:h-full"> {/* Ajustez la hauteur selon vos besoins */}
            <canvas ref={chartRef} className="w-full h-full"/>
        </div>
    );
}

export default Barchart;
