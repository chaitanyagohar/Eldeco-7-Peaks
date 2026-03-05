import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-20">
      <div className="bg-white p-10 md:p-14 rounded-xl shadow-lg border border-gray-100 text-center max-w-lg mx-auto flex flex-col items-center animate-in fade-in zoom-in duration-500">
        
        {/* Success Icon */}
        <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={48} className="text-teal-600" strokeWidth={1.5} />
        </div>
        
        {/* Text */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 tracking-tight">
          Thank You!
        </h1>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-10">
          Your request has been successfully submitted. One of our expert property consultants will get in touch with you shortly to assist you with your real estate journey.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/" className="w-full sm:w-auto">
            <button className="w-full px-8 py-3.5 rounded bg-teal-700 text-white font-bold hover:bg-teal-800 transition-all shadow-md">
              Back to Home
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}