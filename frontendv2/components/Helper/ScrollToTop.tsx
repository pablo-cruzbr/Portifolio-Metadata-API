"use client"

import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; 

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) setIsVisible(true);
            else setIsVisible(false);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className="fixed bottom-10 right-10 z-[99]">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="bg-blue-950/60 cursos-pointer text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none cursor-pointer"
                >
                    <FaArrowUp className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};

export default ScrollToTop;