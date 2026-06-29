"use client";
import { useState } from "react";
import Link from "next/link";
import { User, Phone, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const sendOtp = () => {
    if (phone.length < 11) { toast.error("شماره موبایل معتبر نیست"); return; }
    setShowOtp(true); toast.success("کد تأیید ارسال شد");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center"><span className="text-white font-black text-xl">R</span></div>
            <span className="text-2xl font-black text-dark">روشن اویل</span>
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
            <button onClick={() => setIsLogin(true)} className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${isLogin ? "bg-white text-dark shadow-sm" : "text-gray-500"}`}>ورود</button>
            <button onClick={() => setIsLogin(false)} className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${!isLogin ? "bg-white text-dark shadow-sm" : "text-gray-500"}`}>ثبت‌نام</button>
          </div>
          <h1 className="text-xl font-bold text-dark mb-2">{isLogin ? "ورود به حساب کاربری" : "ایجاد حساب کاربری"}</h1>
          <p className="text-gray-500 text-sm mb-6">{isLogin ? "با شماره موبایل خود وارد شوید" : "برای خرید آسان‌تر ثبت‌نام کنید"}</p>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">نام و نام خانوادگی</label>
                <div className="relative"><User size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" className="input-field pr-10" placeholder="علی محمدی" /></div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">شماره موبایل</label>
              <div className="relative"><Phone size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field pr-10" placeholder="۰۹۱۲۳۴۵۶۷۸۹" dir="ltr" /></div>
            </div>
            {showOtp && (
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">کد تأیید</label>
                <div className="relative">
                  <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={showPass ? "text" : "password"} value={otp} onChange={(e) => setOtp(e.target.value)} className="input-field pr-10 pl-10" placeholder="کد ۶ رقمی" dir="ltr" maxLength={6} />
                  <button onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                </div>
              </div>
            )}
            {!showOtp
              ? <button onClick={sendOtp} className="btn-primary w-full justify-center">دریافت کد تأیید</button>
              : <button onClick={() => toast.success("ورود موفق!")} className="btn-primary w-full justify-center">{isLogin ? "ورود" : "ثبت‌نام"}</button>
            }
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">
            با ورود یا ثبت‌نام، با <Link href="/terms" className="text-primary hover:underline">قوانین و مقررات</Link> موافقت می‌کنید
          </p>
        </div>
      </div>
    </div>
  );
}
