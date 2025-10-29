import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Products = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-[#7a6f50] mb-4">Sản phẩm</h1>
        <p className="text-[#6b6350]">Danh sách máy in, photocopy và linh kiện văn phòng.</p>
      </main>
      <Footer />
    </>
  );
};

export default Products;
