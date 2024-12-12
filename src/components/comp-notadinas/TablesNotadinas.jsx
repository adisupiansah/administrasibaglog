"use client";
import React, { useEffect, useState } from "react";
import InitTable from "@/libs/datatables-config";
import Link from "next/link";
import { createRoot } from "react-dom/client";
import EditNotaDinas from "./EditNotaDinas";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const TablesNotadinas = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true) // state untuk loading
  const [editData, setEditData] = useState(null)


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

  const handleEditData = (id) => {
    const edit = data.find((item) => item.id === id);
    setEditData(edit);
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

  // useEffect modal
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, [])
 
  return (
    <>
      {/* modal */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark" id="staticBackdropLabel">
                Edit Nota Dinas
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditNotaDinas data={editData} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            
            </div>
          </div>
        </div>
      </div>

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
                              <button className='btn btn-sm btn-danger col-sm-12'>Delete</button> 
                              <button 
                              className='btn btn-sm btn-warning col-sm-12 mt-2' data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                              onClick={() => handleEditData(item.id)}>Edit</button>
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
    </>
  );
};

export default TablesNotadinas;
