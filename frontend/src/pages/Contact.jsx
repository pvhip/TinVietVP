import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-[#7a6f50] mb-4">Liên hệ</h1>
        <p className="text-[#6b6350]">Liên hệ với chúng tôi qua số điện thoại, email hoặc địa chỉ văn phòng.</p>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
