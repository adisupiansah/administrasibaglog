"use client"
import React, { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables); // Registrasi semua modul Chart.js

const ChartNotaDinas = () => {

    const chartRef = useRef(null)
    
    useEffect(() => {
        const ctx = chartRef.current.getContext('2d')
        const data = {
            labels: [
                'SELURUH SURAT',
                'SURAT BMP',
                'SURAT HARWAT'
            ],
            datasets: [
                {
                    label: 'Jumlah',
                    data: [124, 52, 72],
                    backgroundColor : [
                        'rgb(114, 191, 120)',
                        'rgb(38, 102, 207)',
                        'rgb(198, 46, 46)'
                    ],
                    hoverOffset: 4
                }

            ]
        }

        const options = {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }

        const myChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: options,
        })

        return () => {
            myChart.destroy()
        }
    }, [])


  return (
    <div className='card-chartNotaDinas'>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-center align-items-center">

                        <canvas ref={chartRef}></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ChartNotaDinas
