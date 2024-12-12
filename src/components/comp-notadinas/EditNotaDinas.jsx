import React, { useState, useEffect } from "react";

const EditNotaDinas = ({ data }) => {
  const [formData, setFormData] = useState({
    tgl_surat: "",
    no_surat: "",
    kepada: "",
    perihal: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        tgl_surat: data.tgl_surat || "",
        no_surat: data.no_surat || "",
        kepada: data.kepada || "",
        perihal: data.perihal || "",
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch("api/v1/notadinas/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data.id, ...formData }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }

      alert("Data berhasil diupdate");
      window.location.reload();
    } catch (error) {
      console.error("Eror saat edit data:", error);
      alert("TERJADI KESALAHAN SAAT EDIT DATA");
    }
  };
  return (
    <div>
      <form>
        <div className="mb-3">
          <label className="form-label">Tanggal Surat</label>
          <input
            type="date"
            className="form-control"
            name="tgl_surat"
            value={formData.tgl_surat}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nomor Surat</label>
          <input
            type="text"
            className="form-control"
            name="no_surat"
            value={formData.no_surat}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Kepada</label>
          <input
            type="text"
            className="form-control"
            name="kepada"
            value={formData.kepada}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Perihal</label>
          <input
            type="text"
            className="form-control"
            name="perihal"
            value={formData.perihal}
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
};

export default EditNotaDinas;
