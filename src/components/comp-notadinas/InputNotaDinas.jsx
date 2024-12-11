"use client"
import React, { useState } from "react";

const InputNotaDinas = () => {
  const [formData, setFormData] = useState({
    tgl_surat: "",
    no_surat: "",
    kepada: "",
    perihal: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/notadinas/input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Data berhasil disimpan')
        setFormData({
          tgl_surat: "",
          no_surat: "",
          kepada: "",
          perihal: "",
        });
      } else {
        alert(data.message || 'gagal menyimpan data');
      }

    } catch (error) {
      console.error("Error saat menyimpan data:", error);
      alert('Terjadi kesalahan!');
    }
  }

  return (
    <div className="input-notadinas">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-5">
              <div className="card-body">
                <h2 className="card-title text-center">
                  INPUT NOMOR SURAT KELUAR
                </h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="date"
                    className="form-control"
                    name="tgl_surat"
                    value={formData.tgl_surat}
                    onChange={handleChange}
                    placeholder="Tanggal surat"
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="no_surat"
                    value={formData.no_surat}
                    onChange={handleChange}
                    placeholder="Nomor surat"
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="kepada"
                    value={formData.kepada}
                    onChange={handleChange}
                    placeholder="Kepada"
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="perihal"
                    value={formData.perihal}
                    onChange={handleChange}
                    placeholder="Hal.."
                  />
                  <div className="button-inputnotadinas d-flex justify-content-between flex-columns">
                    <button className="btn col-md-5">submit</button>
                    <button className="btn reset col-md-5" onClick={() => setFormData({tgl_surat:'', no_surat:'', kepada: '', perihal: ''})}>reset</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputNotaDinas;
