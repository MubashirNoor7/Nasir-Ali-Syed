import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { images } from "../data";
import { Menu, X } from "lucide-react";

const navItems = [
  { urdu: "سرورق", english: "HOME", path: "/" },
  { urdu: "تعارف", english: "ABOUT", path: "/about" },
  { urdu: "تصانیف", english: "BOOKS", path: "/books" },
  { urdu: "کالم", english: "COLUMNS", path: "/columns" },
  { urdu: "تازہ کلام", english: "POETRY", path: "/poetry" },
  { urdu: "یادگاریں", english: "ALBUM", path: "/gallery" },
  { urdu: "ویڈیوز", english: "VIDEOS", path: "/videos" },
];

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#5A2C16] border-b-4 border-[#3D1D0E] shadow-2xl">
        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:block w-full select-none">
          <div className="flex flex-row-reverse w-full divide-x divide-x-reverse divide-[#3D1C0B]/80 border-x border-[#3D1C0B]/80">
            
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleClick(item.path)}
                  className={`flex-1 py-6 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? "bg-[#7A3D1E] text-[#FFF8EB]" 
                      : "bg-[#5A2C16] text-[#EAD8C3] hover:bg-[#6D361B] hover:text-[#FFF8EB]"
                  }`}
                >
                  <span className="urdu-header text-2xl leading-none mb-1 font-semibold tracking-wide">
                    {item.urdu}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] font-sans uppercase opacity-85 leading-none">
                    {item.english}
                  </span>
                </button>
              );
            })}

            {/* Branded Logo cell */}
            <div 
              onClick={() => handleClick("/contact")}
              className="px-8 py-3 flex items-center justify-center bg-[#4A2411] cursor-pointer hover:bg-[#613018] border-r border-[#3D1C0B]/80 transition-colors"
            >
              <img 
                src={images.logo} 
                className="h-12 w-auto object-contain brightness-0 invert filter opacity-95 hover:opacity-100 transition-opacity duration-300" 
                alt="Logo" 
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Header */}
        <div className="flex md:hidden items-center justify-between px-4 py-3">
          <div 
            onClick={() => handleClick("/contact")}
            className="flex items-center cursor-pointer"
          >
            <img 
              src={images.logo} 
              className="h-10 w-auto object-contain brightness-0 invert filter opacity-95" 
              alt="Logo" 
            />
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-[#EAD8C3] hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="absolute top-[60px] left-0 right-0 bg-[#5A2C16] border-b-4 border-[#3D1D0E] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col divide-y divide-[#3D1C0B]/80">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleClick(item.path)}
                    className={`w-full py-4 px-6 flex items-center justify-between transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? "bg-[#7A3D1E] text-[#FFF8EB]" 
                        : "bg-[#5A2C16] text-[#EAD8C3] hover:bg-[#6D361B]"
                    }`}
                  >
                    <span className="urdu-header text-xl font-semibold">{item.urdu}</span>
                    <span className="text-[10px] tracking-[0.2em] font-sans uppercase opacity-85">
                      {item.english}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
