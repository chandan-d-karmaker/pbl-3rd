'use client'
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {

  const {
    data: session,
    // isPending, //loading state
    error, //error object
    // refetch //refetch the session
  } = useSession()

  const user = session?.user;
  console.log(user);

  console.log({session, error})

  const handleSignOut = async () => {
    await authClient.signOut();
  }


  return (
    <header>
      <div className="navbar bg-base-100 shadow-sm mb-12">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a href="#faq">
                  <i className="fa-solid fa-circle-question" /> FAQ
                </a>
              </li>
              <li>
                <a href="#learn">
                  <i className="fa-solid fa-book-open" /> Learn
                </a>
              </li>
              <li>
                <a href="#login">
                  <i className="fa-solid fa-arrow-right-from-bracket" /> Logout
                </a>
              </li>
            </ul>
          </div>
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
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">
            <li>
              <a href="#faq" className="btn btn-outline btn-primary">
                <i className="fa-solid fa-circle-question" /> FAQ
              </a>
            </li>
            <li>
              <a href="#learn" className="btn btn-outline btn-primary">
                <i className="fa-solid fa-book-open" /> Learn
              </a>
            </li>
            {
              user ? <button onClick={handleSignOut} className="btn btn-primary btn-outline">Logout</button> :
                <Link href={'/auth/login'} className="btn btn-primary btn-outline">Login</Link>
            }
          </ul>
        </div>
      </div>
    </header>
  );
}
