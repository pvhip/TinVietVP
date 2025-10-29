import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f8f7f4]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-[#7a6f50] mb-6">Đăng ký</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Họ tên" className="w-full border p-3 rounded" />
          <input type="email" placeholder="Email" className="w-full border p-3 rounded" />
          <input type="password" placeholder="Mật khẩu" className="w-full border p-3 rounded" />
          <button type="submit" className="w-full py-2 bg-[#7a8b52] text-white rounded hover:bg-[#6f7f45]">
            Đăng ký
          </button>
        </form>
        <p className="text-center text-sm text-[#6b6350] mt-4">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-[#7a8b52] hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
