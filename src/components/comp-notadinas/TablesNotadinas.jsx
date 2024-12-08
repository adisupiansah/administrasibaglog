"use client";
import React, { useEffect } from "react";
import InitTable from "@/libs/datatables-config";
import Link from "next/link";
import { createRoot } from "react-dom/client";

const TablesNotadinas = () => {
  const PengajuanSurat = () => {
    return (
      <>
        <Link href="#" type="button" className="btn pengajuan position-relative">
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
  useEffect(() => {
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
              menu: [10, 50, 500],
            },
          },
        ],
        topEnd: [pengajuan, buatsurat],
      },
    });
  }, []);

  return (
    <div className="datatables" data-bs-theme="dark">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body table-responsive">
                <table
                  className="table table-striped table-dark p-3 "
                  id="example"
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Start date</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tiger Nixon</td>
                      <td>System Architect</td>
                      <td>Edinburgh</td>
                      <td>61</td>
                      <td>2011-04-25</td>
                      <td>$320,800</td>
                    </tr>
                    <tr>
                      <td>Garrett Winters</td>
                      <td>Accountant</td>
                      <td>Tokyo</td>
                      <td>63</td>
                      <td>2011-07-25</td>
                      <td>$170,750</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablesNotadinas;