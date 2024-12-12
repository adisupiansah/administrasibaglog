"use client";
import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";


Chart.register(...registerables); // Registrasi semua modul Chart.js

const ChartNotaDinas = () => {
  const chartRef = useRef(null);
  const chart = useRef(null);

  const [hitung, setHitung] = useState(0);

  const InisialisasiChart = () => {
    if (chart.current) {
        chart.current.destroy();
      }

    const ctx = chartRef.current.getContext("2d");
    const data = {
      labels: ["SELURUH SURAT", "SURAT HARWAT, BMP"],
      datasets: [
        {
          label: "Jumlah",
          data: [hitung, 65],
          backgroundColor: ["rgb(38, 102, 207)", "rgb(198, 46, 46)"],
          hoverOffset: 4,
        },
      ],
    };

    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    chart.current = new Chart(ctx, {
      type: "pie",
      data: data,
      options: options,
    });
  };

  const hitungCharSeluruhSurat = async () => {
    try {
      const response = await fetch("/api/v1/notadinas/getnota");
      const data = await response.json();
      const result = data.length;
      setHitung(result);
    } catch (error) {
        console.error("Terjadi kesalahan saat menghitung seluruh data:", error);
        
    }
  };

  useEffect(() => {
    hitungCharSeluruhSurat();
  }, []);

  useEffect(() => {
    InisialisasiChart();
  }, [hitung]); // Tambahkan dependensi hitung

  return (
    <div className="card-chartNotaDinas">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col">
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
  );
};

export default ChartNotaDinas;
