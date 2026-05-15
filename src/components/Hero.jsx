import Image from 'next/image';
import React from 'react';

const Hero = () => {
    return (
        <div className="md:w-4/5 md:mx-auto bg-linear-to-tl from-red-50 via-blue-50 to-red-100 p-10 rounded-2xl flex flex-col-reverse md:flex-row items-center w-4/5 mx-auto gap-10 justify-between mb-40">
 
            <div className="flex-1 space-y-6 mr-0 md:mr-20 text-center md:text-left">
                <h2 className="text-4xl font-bold">
                    <span className="text-[#00BCFF]">English</span> is Easy!!
                </h2>

                <p className="max-w-md text-2xl font-medium text-[#18181B]">আজ থেকেই আপনার ভাষা শেখার যাত্রা শুরু করুন। আপনি
                    যদি নতুন হন অথবা আপনার দক্ষতা বাড়াতে চান, আমাদের Interactive Lessons আপনাকে নিয়ে যাবে অন্য একটি Level এ
                </p>
            </div>

            {/* for image */}
            <div>
              <Image src='/assets/heroImg.png' alt='hero img' width={300} height={300}/>
            </div>
        </div>
    );
};

export default Hero;