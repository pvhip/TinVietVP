import React, { useState, useRef, useEffect } from "react";

const slides = [
  {
    id: 1,
    img: "assets/mayin01.png",
    alt: "Máy in 1"
  },
  {
    id: 2,
    img: "assets/mayin02.png",
    alt: "Máy in 2"
  },
  {
    id: 3,
    img: "assets/mayin03.png",
    alt: "Máy in 3"
  }
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  // optional: autoplay every 6s (pause on hover). You can remove if only manual desired.
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, []);

  const prev = () => {
    clearInterval(timerRef.current);
    setIndex(i => (i - 1 + slides.length) % slides.length);
  };

  const next = () => {
    clearInterval(timerRef.current);
    setIndex(i => (i + 1) % slides.length);
  };

  return (
    <section className="bg-[#f8f7f4]">
      <div className="container mx-auto px-6 py-14 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* LEFT: Carousel */}
          <div className="md:w-1/2 w-full relative">
            <div
              className="rounded-2xl overflow-hidden shadow-lg bg-white"
              onMouseEnter={() => clearInterval(timerRef.current)}
              onMouseLeave={() => {
                timerRef.current = setInterval(() => {
                  setIndex(prev => (prev + 1) % slides.length);
                }, 6000);
              }}
            >
              <div className="relative h-72 md:h-96 flex items-center justify-center bg-white">
                <img
                  src={slides[index].img}
                  alt={slides[index].alt}
                  className="object-contain h-full w-full"
                />
              </div>

              {/* arrows */}
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                aria-label="previous"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12l6-6" stroke="#7a6f50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                aria-label="next"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="#7a6f50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => { clearInterval(timerRef.current); setIndex(i); }}
                    className={`w-8 h-1 rounded-full ${i === index ? "bg-[#7a8b52]" : "bg-white/60"}`}
                    aria-label={`slide-${i+1}`}
                  />
                ))}
              </div>
            </div>

            {/* small pager text */}
            <div className="mt-3 flex items-center justify-between text-sm text-[#6b6350]">
              <div>01</div>
              <div className="text-center">—</div>
              <div>03</div>
            </div>
          </div>

          {/* RIGHT: Text block */}
          <div className="md:w-1/2 w-full">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
              <h1 className="text-3xl md:text-4xl font-playfair text-[#2c2a28] leading-tight">
                Thuê Máy In & Photocopy <br /> Uy Tín Tại TP.HCM
              </h1>
              <p className="mt-4 text-[#6b6350]">
                Dịch vụ cho thuê máy in – photocopy giá rẻ, giao hàng nhanh, hỗ trợ kỹ thuật miễn phí 24/7.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#6b6350]">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#7a8b52]"></span>
                  <span>Cho thuê máy in</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#6b6350]">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#7a8b52]"></span>
                  <span>Sửa chữa - bảo trì</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#6b6350]">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#7a8b52]"></span>
                  <span>Nạp mực tận nơi</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="px-5 py-2 rounded bg-[#7a8b52] text-white font-medium hover:bg-[#6f7f45]">
                  Liên hệ
                </button>
                <button className="px-5 py-2 rounded border border-[#e6e4db] text-[#6b6350]">
                  Xem bảng giá
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* features summary below hero (small) */}
      </div>
    </section>
  );
};

export default HeroSection;
