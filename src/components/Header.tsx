import React from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { TbLineScan } from "react-icons/tb";

const Header = () => {
    return (
        <header className="w-full h-62 fixed backdrop-blur-md z-20 insert-x-0 top-0 flex flex-row items-center justify-between py-3 lg:px-5 sm:px-2.5 bg-white ">
            <Link className="flex-none" href={"/"}>
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    version="1.1"
                    aria-labelledby="unsplash-home"
                    aria-hidden="false"
                >
                    <desc lang="en-US">Unsplash logo</desc>
                    <title id="unsplash-home">Unsplash Home</title>
                    <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
                </svg>
            </Link>
            <div className="w-full flex flex-row items-center justify-between px-4 gap-x-8">
                <div className="w-full flex flex-row flex-1 items-center justify-between bg-bgInputSearch rounded-full hover:bg-bgHover hover:shadow-sm hover:shadown-bgHover">
                    <span className="flex-none ps-4 text-xl text-textPrimary cursor-pointer hover:text-textSecondary">
                        <IoIosSearch />
                    </span>
                    <input
                        type="text"
                        placeholder="Search high-resolution images"
                        className="w-full text-15px border-0 outline-none bg-transparent p-2"
                    />
                    <span className="flex-none pe-4 text-xl text-textPrimary cursor-pointer hover:text-textSecondary">
                        <TbLineScan />
                    </span>
                </div>
                <div className="lg:flex lg:flex-row flex-none divide-x gap-8 sm:hidden">
                    <div className="flex flex-row text-sm items-center justify-center font-medium gap-x-8">
                        <span className="cursor-pointer text-textPrimary hover:text-textSecondary">Explore</span>
                        <span className="cursor-pointer text-textPrimary hover:text-textSecondary">Advertise</span>
                        <span className="cursor-pointer text-textSecondary">Unsplash+</span>
                    </div>
                    <div className="flex flex-row items-center font-medium text-textPrimary justify-center gap-x-8">
                        <span className="text-sm cursor-pointer ms-8 hover:text-textSecondary">Log in</span>
                        <button className="text-sm border border-borderColor p-2 shadow-sm rounded-md hover:text-textSecondary hover:border-textSecondary">Submit a photo</button>
                    </div>
                </div>
            </div>
            <button className="px-2 flex-none text-xl text-textPrimary">
                <FaBars />
            </button>
        </header>
    );
};

export default Header;
