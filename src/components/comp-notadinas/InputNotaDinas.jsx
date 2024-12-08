import React from "react";

const InputNotaDinas = () => {
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
                <form action="">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Tanggal surat"
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nomor surat"
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Kepada"
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Hal.."
                  />
                  <div className="button-inputnotadinas d-flex justify-content-between flex-columns">
                    <button className="btn col-md-5">submit</button>
                    <button className="btn reset col-md-5">reset</button>
                    
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
