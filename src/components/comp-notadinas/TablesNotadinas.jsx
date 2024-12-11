"use client";
import React, { useEffect, useState } from "react";
import InitTable from "@/libs/datatables-config";
import Link from "next/link";
import { createRoot } from "react-dom/client";

const TablesNotadinas = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true) // state untuk loading

  const PengajuanSurat = () => {
    return (
      <>
        <Link
          href="/notadinas/pengajuan"
          type="button"
          className="btn pengajuan position-relative"
        >
          Pengajuan
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            20
            <span class="visually-hidden">unread messages</span>
          </span>
        </Link>
      </>
    );
  };
  const ButtonSurat = () => {
    return (
      <Link href="#" className="btn buat-surat">
        input surat
      </Link>
    );
  };

  const DataTables = () => {
    // insiliasai datatables
    let buatsurat = document.createElement("div");
    let root = createRoot(buatsurat);
    root.render(<ButtonSurat />);

    let pengajuan = document.createElement("div");
    let rootpengajuan = createRoot(pengajuan);
    rootpengajuan.render(<PengajuanSurat />);

    InitTable("#example", {
      language: {
        info: "Halaman _PAGE_ dari _PAGES_",
        infoEmpty: "tidak ada catatan yang tersedia",
        infoFiltered: "(difilter dari _MAX_ data)",
        lengthMenu: "_MENU_ banyak halaman",
        zeroRecords: "Data tidak ditemukan",
      },
      layout: {
        topStart: [
          {
            search: {
              placeholder: "Cari data",
            },
            pageLength: {
              menu: [
                [10, 25, 100, -1],
                [10, 25, 100, "All"],
              ],
            },
          },
        ],
        topEnd: [pengajuan, buatsurat],
      },
      scrollX: true,
    });

  }

  const ambilData = async () => {
    try {
      const response = await fetch('/api/v1/notadinas/getnota')
      if (!response.ok) {
        throw new Error("gagal fetch data")
      }
      const hasil = await response.json()
      setData(hasil)

    } catch (error) {
      console.error("error saat mengambil data:", error);
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loading && data.length > 0) {
      // Inisialisasi DataTables setelah data tersedia
      const table =  DataTables();
      if (table) {
        table.destroy()
      }
    }
  }, [loading, data]);

  // ambil data saat komponen dimuat
  useEffect(() => {
    ambilData()
  }, []);

  return (
    <div className="datatables" data-bs-theme="dark">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                {loading ? (
                  <p className='loading'>loading..</p>
                ) : (
                  <table
                    className="table table-striped table-dark p-3 "
                    id="example"
                  >
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Tanggal surat</th>
                        <th>Nomor surat</th>
                        <th>Kepada</th>
                        <th>Hal</th>
                        <th>Tanggal input</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.tgl_surat}</td>
                          <td>{item.no_surat}</td>
                          <td>{item.kepada}</td>
                          <td>{item.perihal}</td>
                          <td>{item.tgl_input}</td>
                          <td className='d-flex flex-column justify-content-between align-items-center g-2'>
                            <Link href='#' className='btn btn-sm btn-danger col-sm-12'>Delete</Link> 
                            <Link href='#' className='btn btn-sm btn-warning col-sm-12 mt-2'>Edit</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablesNotadinas;
