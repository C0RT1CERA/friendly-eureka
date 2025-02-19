import Image from 'next/image';
import { Links } from './links/links';
import Link from 'next/link';

import { useState } from 'react';
import { ChevronLeftIcon, Instagram, Linkedin, MenuIcon, X } from 'lucide-react';

export function Navmain() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNav = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="w-full h-24 border-4 border-blk1 bg-wit4 z-50">
            
            <div className="flex justify-between items-center h-full px-4"> {/* Adjusted px-2 here */}
                <Link href="/" passHref>
                    {/* <Image 
                        src="/icons/REVMEDSYNC.png"
                        alt="Logo"
                        width={180}
                        height={75} 
                        className="cursor-pointer object-cover object-center w-full h-80"
                        priority
                    /> */}
                    <div className='flex flex-col'>
                    <div className="flex flex-row ">
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl font-extrabold mt-2 text-y22 ">R</h1>
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl font-extrabold mt-2 text-y22">E</h1>
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl font-extrabold mt-2 text-y22">V</h1>
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl font-extrabold mt-2 text-y2 underline pl-[5px]">M</h1>
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl font-extrabold mt-2 text-y2 underline">E</h1>
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl font-extrabold mt-2 text-y2 underline">D</h1>
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl font-extrabold mt-2 text-y22">S</h1>
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl font-extrabold mt-2 text-y22">Y</h1>
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl font-extrabold mt-2 text-y22">N</h1>
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl font-extrabold mt-2 text-y22">C</h1>
    
    </div>
                    </div>
                </Link>
                
                <div className="hidden md:hidden xl:flex">
                    <div className='flex xl:flex-row'>
                        <Links />
                    </div>
                </div>
                
                <div onClick={handleNav} className="xl:hidden cursor-pointer pl-24 active:scale-95 transition-transform duration-50 ease-in-out text-y22">
                    <MenuIcon className='w-5 h-5' />
                </div>

            </div>
            
            <div className={
                menuOpen
                ? "fixed left-0 top-0 w-[65%] xl:hidden h-screen bg-y2 font-bold p-10 ease-in duration-500"
                : "fixed left-[-150%] top-0 p-10 ease-in duration-500"
            }>
                <div className="flex w-full items-center justify-end">
                    <div onClick={handleNav} className="cursor-pointer">
                    <a
                      className="inline-block rounded-full border-2 border-stone-900 bg-y2 p-3 text-white hover:bg-y3 hover:text-y3 focus:outline-none focus:ring active:text-indigo-500"
                      href="#"
                    >
                      <ChevronLeftIcon className='w-5 h-5'/>
                    </a>
                    </div>
                </div>
                <div className="flex-col py-4  tracking-tighter">
                    <Links/>
                </div>
                <div className='flex flex-row justify-start items-center gap-5 pl-5'>
                    <Instagram />
                    <Linkedin />
                    <X/>
                </div>
            </div>
        </nav>
    );
};

