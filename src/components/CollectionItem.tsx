import Image from "next/image";
import React from "react";

interface Tag {
    title: string;
}

interface Photo {
    urls: {
        raw: string;
        full: string;
    };
}

interface CollectionProps {
    title: string;
    total_photos: number;
    name: string;
    tags: Tag[];
    preview_photos: Photo[];
}

const CollectionItem: React.FC<CollectionProps> = (props) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col items-start justify-center cursor-pointer">
                <div className="w-full aspect-10/7 flex overflow-hidden cursor-pointer rounded-lg mb-4">
                    <div className="bg-bgSection w-70% relative">
                        <Image
                            src={props?.preview_photos[0]?.urls?.raw}
                            alt=""
                            width={500}
                            height={500}
                            className="w-full h-full left-0 absolute object-cover"
                        />
                    </div>
                    <div className="w-30% flex flex-col ms-0.5">
                        <div className="bg-bgSection mb-0.5 relative grow">
                            <Image
                                src={props?.preview_photos[1]?.urls?.raw}
                                alt=""
                                width={500}
                                height={500}
                                className="w-full h-full left-0 absolute object-cover"
                            />
                        </div>
                        <div className="bg-bgSection grow relative">
                            <Image
                                src={props?.preview_photos[2]?.urls?.raw}
                                alt=""
                                width={500}
                                height={500}
                                className="w-full h-full left-0 absolute object-cover"
                            />
                        </div>
                    </div>
                </div>
                <h2 className="text-textSecondary overflow-hidden whitespace-nowrap text-lg font-semibold">
                    {props?.title}
                </h2>
            </div>
            <p className="text-textPrimary mb-2 overflow-hidden whitespace-nowrap text-sm leading-5">
                {props?.total_photos ?? 0} photos · Curated by{" "}
                <a className="hover:text-textSecondary hover:underline cursor-pointer">
                    {props?.name}
                </a>
            </p>
            <div className="flex flex-wrap gap-2">
                {props?.tags.slice(0, 3).map((tag, index) => (
                    <a
                        key={index}
                        className="text-iconColor text-sm py-1 px-2 rounded capitalize bg-bgInputSearch no-underline cursor-pointer hover:text-textSecondary hover:bg-bgHoverItem"
                    >
                        {tag.title}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default CollectionItem;
