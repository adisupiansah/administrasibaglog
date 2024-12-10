"use client";
import Image from "next/image";
import logo from "@/app/img/logoLogistik.png";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";  // Import usePathname untuk mendeteksi URL

const Navigasibar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isDropdownOpenDisposisi, setIsDropdownOpenDisposisi] = useState(false);
  const [activeSubMenuDisposisi, setActiveSubMenuDisposisi] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const pathname = usePathname(); // Mengambil path URL saat ini

  useEffect(() => {
    // Set active menu berdasarkan URL
    if (pathname === "/") {
      setActiveMenu("Dashboard");
    } else if (pathname.includes("notadinas")) {
      setActiveMenu("Nota Dinas");
    } else if (pathname.includes("disposisi")) {
      setActiveMenu("Disposisi");
    }
  }, [pathname]); // Setiap kali URL berubah, aktifkan menu yang sesuai

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setIsDropdownOpenDisposisi(false);
      setActiveSubMenuDisposisi(null);
    }
  };

  const toggleDropdownDisposisi = (e) => {
    e.preventDefault();
    setIsDropdownOpenDisposisi(!isDropdownOpenDisposisi);
    if (!isDropdownOpenDisposisi) {
      setIsDropdownOpen(false);
      setActiveSubMenu(null);
    }
  };

  const handleMenuSubClickDisposisi = (submenuItem) => {
    setActiveSubMenuDisposisi(submenuItem);
    setIsDropdownOpenDisposisi(false);
  };

  const handleSubMenuClick = (submenuItem) => {
    setActiveSubMenu(submenuItem);
    setIsDropdownOpen(false);
  };

  const handleDasboardClick = () => {
    setActiveMenu("Dashboard"); // Set active menu to Dashboard
    setActiveSubMenu(null); // Reset active sub-menu of Nota Dinas
    setActiveSubMenuDisposisi(null); // Reset active sub-menu of Disposisi
  };

  const mainMenuDisposisi =
    activeSubMenuDisposisi ? activeSubMenuDisposisi.charAt(0).toUpperCase() + activeSubMenuDisposisi.slice(1) : "Disposisi";

  const mainMenuText =
    activeSubMenu ? activeSubMenu.charAt(0).toUpperCase() + activeSubMenu.slice(1) : "Nota Dinas";

  const menuActiveClass = (menu) => (activeMenu === menu ? "active" : "");

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <a className="navbar-brand d-flex justify-content-center align-items-center" href="/">
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
            <Link href="/" className={`pointer ${menuActiveClass("Dashboard")}`} onClick={handleDasboardClick}>
              Dashboard
            </Link>
            <div className="dropdown">
              <div
                className={`pointer dropdown-toggle ${isDropdownOpen ? "active" : ""} ${activeSubMenu ? "active" : ""}`}
                onClick={toggleDropdown}
              >
                {mainMenuText}
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu show mt-3">
                  <Link
                    href="/notadinas"
                    className={`dropdown-item ${activeSubMenu === "surat" ? "active" : ""}`}
                    onClick={() => handleSubMenuClick("Nota keluar")}
                  >
                    Nota keluar
                  </Link>
                  <Link
                    href="/notadinas/input"
                    className={`dropdown-item ${activeSubMenu === "input" ? "active" : ""}`}
                    onClick={() => handleSubMenuClick("input")}
                  >
                    Input
                  </Link>
                  <Link
                    href="/notadinas/pengajuan"
                    className={`dropdown-item ${activeSubMenu === "pengajuan" ? "active" : ""}`}
                    onClick={() => handleSubMenuClick("pengajuan")}
                  >
                    Pengajuan
                  </Link>
                  <Link
                    href="/notadinas/arsip"
                    className={`dropdown-item ${activeSubMenu === "arsip" ? "active" : ""}`}
                    onClick={() => handleSubMenuClick("arsip")}
                  >
                    Arsip
                  </Link>
                </div>
              )}
            </div>
            <div className="dropdown">
              <div
                className={`pointer dropdown-toggle ${isDropdownOpenDisposisi ? "active" : ""} ${
                  activeSubMenuDisposisi ? "active" : ""
                }`}
                onClick={toggleDropdownDisposisi}
              >
                {mainMenuDisposisi}
              </div>
              {isDropdownOpenDisposisi && (
                <div className="dropdown-menu show mt-3">
                  <Link
                    href="/disposisi"
                    className={`dropdown-item ${activeSubMenuDisposisi === "Dispo masuk" ? "active" : ""}`}
                    onClick={() => handleMenuSubClickDisposisi("Disposisi masuk")}
                  >
                    Disposisi masuk
                  </Link>
                  <Link
                    href="/disposisi/input"
                    className={`dropdown-item ${activeSubMenuDisposisi === "Input disposisi" ? "active" : ""}`}
                    onClick={() => handleMenuSubClickDisposisi("Input disposisi")}
                  >
                    Input disposisi
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigasibar;
