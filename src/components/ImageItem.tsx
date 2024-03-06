import React from "react";
import { FaHeart } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { FaArrowDown } from "react-icons/fa6";

interface ImageProps {
    imageUrl: string;
    userImageUrl: string;
    username: string;
}

const ImageItem: React.FC<ImageProps> = (props) => {
    return (
        <div className="image-container">
            <img src={props.imageUrl} alt="" />
            <div className="overlay flex flex-col items-center justify-between p-4">
                <div className="w-full flex flex-row items-center justify-end gap-x-2">
                    <button className="px-3 py-2 text-base text-iconColor rounded border-black shadown-sm bg-bgButtonIcon hover:text-textPrimary hover:bg-white">
                        <FaHeart />
                    </button>
                    <button className="px-3 py-2 text-base text-iconColor rounded border-black shadown-sm bg-bgButtonIcon hover:text-textPrimary hover:bg-white">
                        <LuPlus />
                    </button>
                </div>
                <div className="w-full flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center justify-between gap-x-2">
                        <img
                            src={props.userImageUrl}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <p className="text-white text-15px overflow-hidden font-medium">
                            {props.username}
                        </p>
                    </div>
                    <button className="px-3 py-2 text-base text-iconColor rounded border-black shadown-sm bg-bgButtonIcon hover:text-textPrimary hover:bg-white">
                        <FaArrowDown />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageItem;
