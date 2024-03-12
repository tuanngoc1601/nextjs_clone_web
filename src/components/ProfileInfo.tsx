import React, { useMemo } from "react";
import Image from "next/image";
import { IoIosMore } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";

interface Custom {
    title: string;
    source: {
        title: string;
    };
}

interface ProfileProps {
    user: {
        name: string;
        first_name: string;
        bio: string;
        location: string;
        total_photos: number;
        total_likes: number;
        total_collections: number;
        profile_image: {
            small: string;
            medium: string;
            large: string;
        };
        tags: {
            custom: Custom[];
        };
    };
}

const ProfileInfo: React.FC<ProfileProps> = React.memo((props) => {
    return (
        <div className="flex flex-row w-7/12 mx-auto items-start justify-center gap-x-10">
            <Image
                src={props?.user?.profile_image?.large}
                alt=""
                width={150}
                height={150}
                className="rounded-full object-cover"
            />
            <div className="flex flex-col items-start justify-start">
                <button className="bg-bgSection py-1 px-3 flex flex-row items-center justify-center gap-2 rounded-md text-sm text-textSecondary">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        version="1.1"
                        aria-hidden="false"
                    >
                        <desc lang="en-US">Plus sign for Unsplash+</desc>
                        <path d="M11.281 8.3H8.156V3.125L11.281 1v7.3Zm.316 4.05H4.955V7.868L1.5 10.636v4.55h6.656V22h4.713l3.552-2.84h-4.824v-6.81Zm4.24 0v2.835h4.587l2.911-2.834h-7.497Z"></path>
                    </svg>
                    Subscriber
                </button>
                <div className="flex flex-row items-center justify-start gap-x-8">
                    <h2 className="text-40px text-textSecondary font-bold">
                        {props.user?.name}
                    </h2>
                    <button className="py-2 px-3 bg-white rounded border border-borderColor text-textPrimary hover:text-textSecondary hover:border-textSecondary">
                        <IoIosMore />
                    </button>
                </div>
                <p className="text-15px text-textSecondary break-words whitespace-pre-line mt-3">
                    {props.user?.bio}
                </p>
                <a className="py-1 text-15px text-textPrimary flex flex-row items-center justify-center gap-x-2 hover:text-textSecondary cursor-pointer mt-3">
                    <IoLocationSharp />
                    {props.user?.location}
                </a>
                <a className="py-1 text-15px flex flex-row items-center justify-center gap-x-2 text-textPrimary hover:text-textSecondary cursor-pointer mt-1">
                    <IoIosLink />
                    Connect with {props?.user?.first_name}
                    <FaCaretDown />
                </a>
                <p className="text-textSecondary text-15px">Interests</p>
                <div className="flex flex-wrap gap-2 mt-4">
                    {props.user?.tags.custom.map((item, index) => (
                        <a
                            key={index}
                            className="text-iconColor text-sm py-1 px-2 rounded capitalize bg-bgInputSearch no-underline cursor-pointer hover:text-textSecondary hover:bg-bgHoverItem"
                        >
                            {item?.source?.title || item?.title}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default ProfileInfo;
