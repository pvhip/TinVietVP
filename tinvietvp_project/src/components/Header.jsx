import React from "react";

const Header = () => {
  return (
    <header className="bg-[#f8f7f4] border-b border-[#e6e4db]">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-2xl font-semibold text-[#7a6f50]">Logo</div>
          <nav className="hidden md:flex gap-6 text-sm text-[#6b6350]">
            <a href="#" className="hover:text-[#b2aa7f]">Trang chủ</a>
            <a href="#" className="hover:text-[#b2aa7f]">Giới thiệu</a>
            <a href="#" className="hover:text-[#b2aa7f]">Dịch vụ</a>
            <a href="#" className="hover:text-[#b2aa7f]">Sản phẩm</a>
            <a href="#" className="hover:text-[#b2aa7f]">Liên hệ</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 border rounded text-sm text-[#fff] bg-[#7a8b52] hover:bg-[#6f7f45]">
            Đăng nhập
          </button>
          <button className="md:hidden p-2 rounded border">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="#6b6350" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
