"use client"
import React, {useEffect, useState} from 'react';
import ChartNotaDinas from './ChartNotaDinas'


const CardNotaDinas = () => {

  const [hitungData, setHitungData] = useState(0)

  const hitung = async () => {
    try{
      const response = await fetch('/api/v1/notadinas/getnota');
      const data = await response.json();
      setHitungData(data.length);

    } catch (error) {
      console.log("Terdapat error saat menghitung seluruh data:",error);
    }
  }

  useEffect(() => {
    hitung();
  }, []);

  return (
    <div className='card-notadinas'>
      <div className="container">
        <div className="row ">
  
            <div className="col-md-4 d-flex justify-content-center align-items-center">
                <div className="card notadinas w-100">
                    <div className="card-body">
                        <h5 className="card-title p-2">
                            SELURUH SURAT
                        </h5>
                        <div className="d-flex justify-content-center align-items-center">
                          <h1 className='card-text py-3'>{hitungData}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4 d-flex justify-content-center align-items-center ">
                <div className="card notadinas w-100">
                    <div className="card-body">
                        <h5 className="card-title-bmp p-2">
                            BANYAK SURAT HARWAT, BMP
                        </h5>
                        <div className="d-flex justify-content-center align-items-center">
                          <h1 className='card-text-bmp py-3'>65</h1>
                        </div>
                    </div>
                </div>
            </div>
           


            <div className="col-md-4 col-sm-12">
              <ChartNotaDinas/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CardNotaDinas
