"use client";
import Image from "next/image";
import logo from "@/app/img/logoLogistik.png";
import { useState } from "react";

const Navigasibar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk membuka/menutup dropdown
  const [activeSubMenu, setActiveSubMenu] = useState(null); // State untuk submenu yang aktif

  const toggleDropdown = (e) => {
    e.preventDefault(); // Mencegah perilaku default dari tautan
    setIsDropdownOpen(!isDropdownOpen); // Mengubah status dropdown
  };

  const handleSubMenuClick = (submenuItem) => {
    setActiveSubMenu(submenuItem); // Mengatur submenu yang aktif
    setIsDropdownOpen(false); // Menutup dropdown setelah memilih submenu
  };

  // Menentukan teks menu utama berdasarkan submenu yang aktif
  const mainMenuText = activeSubMenu ? activeSubMenu.charAt(0).toUpperCase() + activeSubMenu.slice(1) : "Nota Dinas";

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <a
            className="navbar-brand d-flex justify-content-center align-items-center"
            href="/"
          >
            <Image src={logo} alt="logo" width={56} height={65} />
            <div className="d-flex flex-column">
              <span>BAGIAN LOGISTIK</span>
              <span>POLRES KARIMUN</span>
            </div>
          </a>
        </div>
      </nav>
      <nav className="navbar-nav shadow-sm">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center gap-3">
            <a href="">Dashboard</a>
            <div className="dropdown">
            
              <a
                className={`dropdown-toggle ${isDropdownOpen ? 'active' : ''} ${activeSubMenu ? 'active' : ''}`} // Menambahkan kelas active pada menu utama
                href="#"
                onClick={toggleDropdown} // Menggunakan onClick untuk toggle dropdown
              >
                {mainMenuText} {/* Menampilkan teks menu utama */}
              </a>
              {isDropdownOpen && ( // Menampilkan dropdown jika isDropdownOpen true
                <div className="dropdown-menu show mt-3">
          
                  <a
                    className={`dropdown-item ${activeSubMenu === 'input' ? 'active' : ''}`}
                    href="#"
                    onClick={(e) => { e.preventDefault(); handleSubMenuClick('input'); }}
                  >
                    Input
                  </a>
                  <a
                    className={`dropdown-item ${activeSubMenu === 'pengajuan' ? 'active' : ''}`}
                    href="#"
                    onClick={(e) => { e.preventDefault(); handleSubMenuClick('pengajuan'); }}
                  >
                    Pengajuan
                  </a>
                  <a
                    className={`dropdown-item ${activeSubMenu === 'arsip' ? 'active' : ''}`}
                    href="#"
                    onClick={(e) => { e.preventDefault(); handleSubMenuClick('arsip'); }}
                  >
                    Arsip
                  </a>
                </div>
              )}
            </div>
            <a href="">Disposisi</a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigasibar;