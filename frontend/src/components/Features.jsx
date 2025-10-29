import React from "react";

const items = [
  {
    icon: "📍",
    title: "Phục vụ toàn TP.HCM",
    desc: "Dịch vụ giao máy nhanh chóng tại tất cả các quận nội thành."
  },
  {
    icon: "🖨️",
    title: "Hàng trăm thiết bị",
    desc: "Kho máy in – photocopy đa dạng, luôn sẵn sàng cho thuê."
  },
  {
    icon: "🔧",
    title: "Hỗ trợ kỹ thuật",
    desc: "Đội ngũ kỹ thuật viên chuyên nghiệp, bảo trì 24/7."
  }
];

const Features = () => {
  return (
    <section className="bg-[#f8f7f4] py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((it, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm text-[#6b6350]">
              <div className="text-4xl mb-4">{it.icon}</div>
              <h3 className="font-semibold text-lg mb-2 text-[#2c2a28]">{it.title}</h3>
              <p className="text-sm text-[#6b6350]">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
