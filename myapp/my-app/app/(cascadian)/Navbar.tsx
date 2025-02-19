"use client";
import React, { useState, useEffect } from 'react';
import { Navmain } from '@/app/component/front/navbar/navmain';
import { ContactNavbar } from '@/app/component/front/navbar/contactnav';
import { Navhidden } from '@/app/component/front/navbar/navhidden';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <div className='fixed w-full top-0 z-50'>
                <ContactNavbar />
                <Navmain />
            </div>
            <div className={`fixed w-full top-0 z-40 transform transition-transform duration-300 ${isScrolled ? 'translate-y-0' : '-translate-y-full'}`}>
                <Navhidden />
            </div>
        </div>
    );
}
