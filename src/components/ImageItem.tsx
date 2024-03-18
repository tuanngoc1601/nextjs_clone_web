import React from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { FaArrowDown } from "react-icons/fa6";
import Link from "next/link";
import { redirect } from "next/navigation";

interface ImageProps {
    slug: string;
    imageUrl: string;
    userImageUrl: string;
    name: string;
    username: string;
}

const ImageItem: React.FC<ImageProps> = (props) => {
    return (
        <div className="image-container cursor-zoom-in relative">
            <Link href={`/photos/${props?.slug}`}>
                <Image src={props?.imageUrl} alt="" width={500} height={500} />
                <div className="overlay flex flex-col items-center justify-between p-4">
                    <div className="w-full flex flex-row items-center justify-end gap-x-2">
                        <button className="px-3 py-2 text-base text-iconColor rounded border-black shadown-sm bg-bgButtonIcon hover:text-textPrimary hover:bg-white">
                            <FaHeart />
                        </button>
                        <button className="px-3 py-2 text-base text-iconColor rounded border-black shadown-sm bg-bgButtonIcon hover:text-textPrimary hover:bg-white">
                            <LuPlus />
                        </button>
                    </div>
                    <div className="w-full flex flex-row items-center justify-end">
                        <button className="px-3 py-2 text-base text-iconColor rounded border-black shadown-sm bg-bgButtonIcon hover:text-textPrimary hover:bg-white">
                            <FaArrowDown />
                        </button>
                    </div>
                </div>
            </Link>
            <Link href={`/${props?.username}`}>
                <div className="opacity-0 user-info">
                    <div className="w-fit flex flex-row items-center justify-start gap-x-2 cursor-pointer absolute bottom-0 ps-4 pb-4">
                        <Image
                            src={props?.userImageUrl}
                            alt=""
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <p className="text-white text-15px overflow-hidden font-medium">
                            {props?.name}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ImageItem;
