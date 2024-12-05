import React from 'react'

const CardNotaDinas = () => {
  return (
    <div className='card-notadinas'>
      <div className="container">
        <div className="row">
            <div className="col-md-4">
                <div className="card notadinas">
                    <div className="card-body">
                        <h5 className="card-title p-2">
                            SELURUH SURAT
                        </h5>
                        <div className="d-flex justify-content-center align-items-center">
                          <h1 className='card-text py-3'>110</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card notadinas">
                    <div className="card-body">
                        <h5 className="card-title-bmp p-2">
                            BANYAK SURAT BMP
                        </h5>
                        <div className="d-flex justify-content-center align-items-center">
                          <h1 className='card-text-bmp py-3'>110</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card notadinas">
                    <div className="card-body">
                        <h5 className="card-title-harwat p-2">
                            BANYAK SURAT HARWAT
                        </h5>
                        <div className="d-flex justify-content-center align-items-center">
                          <h1 className='card-text-harwat py-3'>110</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CardNotaDinas
