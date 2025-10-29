import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Services = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-[#7a6f50] mb-4">Dịch vụ</h1>
        <p className="text-[#6b6350] leading-relaxed">
          Cung cấp dịch vụ cho thuê máy in, sửa chữa, bảo trì và nạp mực tận nơi.
        </p>
      </main>
      <Footer />
    </>
  );
};

export default Services;
