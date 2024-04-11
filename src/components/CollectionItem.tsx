import Image from "next/image";
import Link from "next/link";
import React from "react";
import { slugify } from "@/utils/helper";
import { CollectionProps } from "@/lib/types";

const CollectionItem: React.FC<CollectionProps> = (props) => {
    return (
        <div className="flex flex-col">
            <Link href={`/collections/${props?.id}/${slugify(props?.title)}`}>
                <div className="flex flex-col items-start justify-center cursor-pointer hover:opacity-85">
                    <div className="w-full aspect-10/7 flex overflow-hidden cursor-pointer rounded-lg mb-4">
                        <div className="bg-bgSection w-70% relative">
                            {props?.preview_photos[0]?.urls?.small && (
                                <Image
                                    src={props.preview_photos[0].urls.small}
                                    alt={props.preview_photos[0]?.slug ?? "image"}
                                    width={500}
                                    height={500}
                                    className="w-full h-full left-0 absolute object-cover"
                                />
                            )}
                        </div>
                        <div className="w-30% flex flex-col ms-0.5">
                            <div className="bg-bgSection mb-0.5 relative grow">
                                {props?.preview_photos[1]?.urls?.small && (
                                    <Image
                                        src={props.preview_photos[1].urls.small}
                                        alt={props.preview_photos[1]?.slug ?? "image"}
                                        width={500}
                                        height={500}
                                        className="w-full h-full left-0 absolute object-cover"
                                    />
                                )}
                            </div>
                            <div className="bg-bgSection grow relative">
                                {props?.preview_photos[2]?.urls?.small && (
                                    <Image
                                        src={props.preview_photos[2].urls.small}
                                        alt={props.preview_photos[2]?.slug ?? "image"}
                                        width={500}
                                        height={500}
                                        className="w-full h-full left-0 absolute object-cover"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <h2 className="text-textSecondary overflow-hidden whitespace-nowrap text-lg font-semibold">
                        {props?.title}
                    </h2>
                </div>
            </Link>
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
