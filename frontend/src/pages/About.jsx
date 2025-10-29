import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-[#7a6f50] mb-4">Giới thiệu</h1>
        <p className="text-[#6b6350] leading-relaxed">
          Chúng tôi là đơn vị chuyên cung cấp dịch vụ cho thuê máy in, photocopy, và bảo trì thiết bị văn phòng tại TP.HCM.
        </p>
      </main>
      <Footer />
    </>
  );
};

export default About;
