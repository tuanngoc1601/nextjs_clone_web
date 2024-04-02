"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa6";
import { IoIosSearch, IoMdTrendingUp, IoIosClose } from "react-icons/io";
import { TbLineScan } from "react-icons/tb";
import { FaChevronDown, FaBell } from "react-icons/fa";
import { slugify } from "@/utils/helper";
import { useRecentSearches } from "@/hooks/recentSearch";
import { useStore } from "@/lib/store";
import { loginUser } from "@/api/unsplash";

const Header = () => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [onFocus, setOnFocus] = useState(false);
    const dropdownRef = useRef<HTMLInputElement>(null);
    const textFieldRef = useRef<HTMLInputElement>(null);
    const popupRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const { recentSearches, addRecentSearch, clearRecentSearches } =
        useRecentSearches();
    const login = useStore((state) => state.login);
    const reset = useStore((state) => state.reset);
    const accessToken = useStore((state) => state.accessToken);

    const handleOnChangeType = (e: any) => {
        setType(e.target.value);
        setIsOpenDropdown(false);
    };

    const onFocusSearchQuery = (e: any) => {
        setOnFocus(true);
        setIsOpenPopup(true);
        setIsOpenDropdown(false);
    };

    const handleSearchSubmit = (e: any) => {
        e.preventDefault();
        if (searchQuery !== "") {
            addRecentSearch(searchQuery);
            router.push(
                `/search/${
                    type === "Photo" || type === "" ? "photos" : "collections"
                }/${slugify(searchQuery)}`
            );
        }
        textFieldRef.current?.blur();
    };

    const resetStore = () => {
        reset();
    };

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpenDropdown(false);
            }
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setOnFocus(false);
                setIsOpenPopup(false);
                textFieldRef.current?.blur();
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <header className="w-full h-62 fixed backdrop-blur-md z-20 insert-x-0 top-0 flex flex-row items-center justify-between py-3 md:px-5 sm:px-3 bg-white">
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
            <div className="w-full flex flex-row items-center justify-between px-4 lg:gap-x-8 md:gap-x-2">
                <div className="block relative flex-1">
                    <div
                        className={`w-full flex flex-row flex-1 items-center justify-between rounded-full ${
                            onFocus
                                ? "bg-white border border-borderColor"
                                : "bg-bgInputSearch hover:bg-bgHover hover:shadow-sm hover:shadown-bgHover"
                        }`}
                    >
                        <form
                            className="flex flex-row items-center justify-center w-full"
                            onSubmit={handleSearchSubmit}
                        >
                            <button
                                type="submit"
                                className="flex-none ps-4 py-2 text-xl text-textPrimary cursor-pointer hover:text-textSecondary"
                            >
                                <IoIosSearch />
                            </button>

                            <input
                                ref={textFieldRef}
                                type="text"
                                placeholder="Search high-resolution images"
                                className="w-full text-15px border-0 outline-none bg-transparent p-2"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={onFocusSearchQuery}
                                required
                            />
                        </form>
                        {searchQuery !== "" && (
                            <div className="flex items-center">
                                <span
                                    className="text-xl me-2 text-textPrimary hover:text-textSecondary cursor-pointer"
                                    onClick={() => {
                                        setSearchQuery("");
                                        textFieldRef.current?.focus();
                                    }}
                                >
                                    <IoIosClose />
                                </span>
                            </div>
                        )}

                        <div className="block relative me-4" ref={dropdownRef}>
                            <button
                                className="flex flex-row items-center justify-end text-textPrimary h-full w-fit text-sm gap-x-2 py-2"
                                onClick={() =>
                                    setIsOpenDropdown((prev) => !prev)
                                }
                            >
                                {type === "" ? "Type" : type}
                                <FaChevronDown />
                            </button>
                            {isOpenDropdown && (
                                <ul className="px-3 py-2 overflow-y-auto text-md bg-white rounded-md border border-bgInputSearch text-textPrimary absolute z-30 transition-all">
                                    <li className="cursor-pointer my-1">
                                        <div className="w-full flex items-center px-2 py-1 rounded hover:bg-gray-100">
                                            <input
                                                id="Photo"
                                                type="radio"
                                                value={"Photo"}
                                                name="type"
                                                checked={type === "Photo"}
                                                onChange={handleOnChangeType}
                                                hidden
                                            />
                                            <label
                                                className="cursor-pointer w-full"
                                                htmlFor="Photo"
                                            >
                                                Photos
                                            </label>
                                        </div>
                                    </li>
                                    <li className="cursor-pointer my-1">
                                        <div className="flex items-center px-2 py-1 rounded hover:bg-gray-100">
                                            <input
                                                id="Collection"
                                                type="radio"
                                                value={"Collection"}
                                                name="type"
                                                checked={type === "Collection"}
                                                onChange={handleOnChangeType}
                                                hidden
                                            />
                                            <label
                                                htmlFor="Collection"
                                                className="cursor-pointer w-full"
                                            >
                                                Collections
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            )}
                        </div>
                        <span className="flex-none pe-4 text-xl text-textPrimary cursor-pointer hover:text-textSecondary">
                            <TbLineScan />
                        </span>
                    </div>
                    {isOpenPopup && searchQuery === "" && (
                        <div
                            className="p-4 rounded-md flex flex-col items-start justify-center bg-white border border-borderColor absolute w-full top-12 gap-y-4"
                            ref={popupRef}
                        >
                            {recentSearches.length > 0 && (
                                <div className="flex flex-col">
                                    <h3 className="text-sm text-textSecondary font-medium">
                                        Recent Searches ・{" "}
                                        <span
                                            className="text-textPrimary hover:text-textSecondary font-normal cursor-pointer"
                                            onClick={() =>
                                                clearRecentSearches()
                                            }
                                        >
                                            Clear
                                        </span>
                                    </h3>
                                    <div className="flex flex-wrap items-center justify-start gap-2 mt-2">
                                        {recentSearches.map(
                                            (searchTerm, index) => (
                                                <Link
                                                    href={`/search/${
                                                        type === "Photo" ||
                                                        type === ""
                                                            ? "photos"
                                                            : "collections"
                                                    }/${searchTerm}`}
                                                    key={index}
                                                >
                                                    <div
                                                        className="flex flex-row items-center justify-center py-2 px-4 text-textPrimary bg-white border border-borderColor hover:bg-bgSection transition-all cursor-pointer rounded text-sm"
                                                        onClick={() => {
                                                            setSearchQuery(
                                                                searchTerm
                                                            );
                                                            setIsOpenPopup(
                                                                false
                                                            );
                                                            setOnFocus(false);
                                                            textFieldRef.current?.blur();
                                                        }}
                                                    >
                                                        {searchTerm}
                                                    </div>
                                                </Link>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col">
                                <h3 className="text-sm text-textSecondary font-medium">
                                    Trending Searches
                                </h3>
                                <div className="flex flex-wrap items-center justify-start gap-2">
                                    <div className="flex flex-wrap items-center justify-start gap-2 mt-2">
                                        <div className="flex flex-row items-center justify-center py-2 px-4 text-textPrimary bg-white border border-borderColor hover:bg-bgSection transition-all cursor-pointer rounded text-sm gap-x-2">
                                            <IoMdTrendingUp className="text-lg" />
                                            instagram
                                        </div>
                                        <div className="flex flex-row items-center justify-center py-2 px-4 text-textPrimary bg-white border border-borderColor hover:bg-bgSection transition-all cursor-pointer rounded text-sm gap-x-2">
                                            <IoMdTrendingUp className="text-lg" />
                                            night sky
                                        </div>
                                        <div className="flex flex-row items-center justify-center py-2 px-4 text-textPrimary bg-white border border-borderColor hover:bg-bgSection transition-all cursor-pointer rounded text-sm gap-x-2">
                                            <IoMdTrendingUp className="text-lg" />
                                            spring
                                        </div>
                                        <div className="flex flex-row items-center justify-center py-2 px-4 text-textPrimary bg-white border border-borderColor hover:bg-bgSection transition-all cursor-pointer rounded text-sm gap-x-2">
                                            <IoMdTrendingUp className="text-lg" />
                                            kitten
                                        </div>
                                        <div className="flex flex-row items-center justify-center py-2 px-4 text-textPrimary bg-white border border-borderColor hover:bg-bgSection transition-all cursor-pointer rounded text-sm gap-x-2">
                                            <IoMdTrendingUp className="text-lg" />
                                            city
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-sm text-textSecondary font-medium">
                                    Trending Topics
                                </h3>
                                <div className="flex flex-wrap items-center justify-start gap-2 mt-2">
                                    <div className="flex flex-row">
                                        <Image
                                            src="https://images.unsplash.com/photo-1692864246461-a49227870288?dpr=2&h=38&w=38&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                                            alt="trending topics"
                                            width={38}
                                            height={38}
                                            className="rounded-s"
                                        />
                                        <div className="h-38">
                                            <div className="flex flex-row items-center justify-center h-full px-4 border-y border-e border-borderColor text-textPrimary text-sm hover:bg-bgSection transition-all rounded-e cursor-pointer">
                                                3D Renders
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <Image
                                            src="https://images.unsplash.com/photo-1710794222452-a57798a66157?dpr=2&h=38&w=38&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                                            alt="trending topics"
                                            width={38}
                                            height={38}
                                            className="rounded-s"
                                        />
                                        <div className="h-38">
                                            <div className="flex flex-row items-center justify-center h-full px-4 border-y border-e border-borderColor text-textPrimary text-sm hover:bg-bgSection transition-all rounded-e cursor-pointer">
                                                Current Event
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <Image
                                            src="https://images.unsplash.com/photo-1710169589950-ee8c3be7cbef?dpr=2&h=38&w=38&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                                            alt="trending topics"
                                            width={38}
                                            height={38}
                                            className="rounded-s"
                                        />
                                        <div className="h-38">
                                            <div className="flex flex-row items-center justify-center h-full px-4 border-y border-e border-borderColor text-textPrimary text-sm hover:bg-bgSection transition-all rounded-e cursor-pointer">
                                                Travel
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <Image
                                            src="https://images.unsplash.com/photo-1710947427300-bc835b33e06c?dpr=2&h=38&w=38&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                                            alt="trending topics"
                                            width={38}
                                            height={38}
                                            className="rounded-s"
                                        />
                                        <div className="h-38">
                                            <div className="flex flex-row items-center justify-center h-full px-4 border-y border-e border-borderColor text-textPrimary text-sm hover:bg-bgSection transition-all rounded-e cursor-pointer">
                                                Spring
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <Image
                                            src="https://images.unsplash.com/photo-1603337338447-473576414d25?dpr=2&h=38&w=38&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                                            alt="trending topics"
                                            width={38}
                                            height={38}
                                            className="rounded-s"
                                        />
                                        <div className="h-38">
                                            <div className="flex flex-row items-center justify-center h-full px-4 border-y border-e border-borderColor text-textPrimary text-sm hover:bg-bgSection transition-all rounded-e cursor-pointer">
                                                Spirituality
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-sm text-textSecondary font-medium">
                                    Trending Collections
                                </h3>
                                <div className="flex flex-wrap items-center justify-start gap-2 mt-2">
                                    <div className="flex flex-row items-center justify-center py-2 px-4 text-textPrimary bg-white border border-borderColor hover:bg-bgSection transition-all cursor-pointer rounded text-sm">
                                        Planet Earth
                                    </div>
                                    <div className="flex flex-row items-center justify-center py-2 px-4 text-textPrimary bg-white border border-borderColor hover:bg-bgSection transition-all cursor-pointer rounded text-sm">
                                        City / Skyline
                                    </div>
                                    <div className="flex flex-row items-center justify-center py-2 px-4 text-textPrimary bg-white border border-borderColor hover:bg-bgSection transition-all cursor-pointer rounded text-sm">
                                        Shot on iPhone
                                    </div>
                                    <div className="flex flex-row items-center justify-center py-2 px-4 text-textPrimary bg-white border border-borderColor hover:bg-bgSection transition-all cursor-pointer rounded text-sm">
                                        AI
                                    </div>
                                    <div className="flex flex-row items-center justify-center py-2 px-4 text-textPrimary bg-white border border-borderColor hover:bg-bgSection transition-all cursor-pointer rounded text-sm">
                                        Dopamine
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div
                    className={`md:flex md:flex-row flex-none ${
                        accessToken === "" ? "lg:divide-x" : ""
                    } gap-8 sm:hidden`}
                >
                    <div className="lg:flex lg:flex-row text-sm md:hidden items-center justify-center font-medium gap-x-8">
                        <span className="cursor-pointer text-textPrimary hover:text-textSecondary">
                            Explore
                        </span>
                        <span className="cursor-pointer text-textPrimary hover:text-textSecondary">
                            Advertise
                        </span>
                        <span className="cursor-pointer text-textSecondary">
                            Unsplash+
                        </span>
                    </div>
                    <div className="flex flex-row items-center font-medium text-textPrimary justify-center gap-x-8">
                        {accessToken === "" && (
                            <span className="text-sm cursor-pointer ms-5 hover:text-textSecondary">
                                Log in
                            </span>
                        )}
                        <button
                            className="text-sm border border-borderColor p-2 shadow-md rounded-md hover:text-textSecondary hover:border-textSecondary"
                            onClick={resetStore}
                        >
                            Submit a photo
                        </button>
                        {accessToken !== "" && (
                            <>
                                <span className="text-xl cursor-pointer text-textPrimary hover:text-textSecondary">
                                    <FaBell />
                                </span>
                                <Image
                                    src="https://images.unsplash.com/placeholder-avatars/extra-large.jpg?bg=fff&crop=faces&dpr=2&h=32&w=32&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                                    alt="avatar"
                                    width={32}
                                    height={32}
                                    className="rounded-full bg-bgInputSearch cursor-pointer"
                                />
                            </>
                        )}
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
