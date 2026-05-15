import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-4 border-[#FFEBEB]">
      <div className="w-4/5 mx-auto flex justify-between items-end py-20">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-xl font-semibold leading-7 text-[#18181B]">
              English
            </span>
            <Image
              src="/assets/logo.png"
              alt="English Janala logo"
              width={32}
              height={32}
            />
            <span className="bangla-font text-xl">জানালা</span>
          </Link>
          <h3 className="bangla-font font-medium">ইংরেজি শিখুন সহজে</h3>
          <p className="bangla-font">
            Providing ED-Tech Applications since 2025 &copy; resereved.
          </p>
        </div>
        <div>
          <p className="font-semibold opacity-60">Follow us</p>
          <i className="fa-brands fa-facebook mr-2" />
          <i className="fa-brands fa-youtube mr-2" />
          <i className="fa-brands fa-instagram mr-2" />
          <i className="fa-brands fa-github" />
        </div>
      </div>
    </footer>
  );
}
