import React from "react";
import { getImageDetail } from "@/api/unsplash";
import Modal from "@/components/Modal";
import Image from "next/image";
import {
    IoIosShareAlt,
    IoMdInformationCircle,
    IoIosMore,
} from "react-icons/io";
import { useStore } from "@/lib/store";
import HeaderPhoto from "@/components/HeaderPhoto";

export default async function PhotoDetailModal({
    params,
}: {
    params: { slug: string };
}) {
    const id = params?.slug.slice(params?.slug.length - 11);
    const accessToken = useStore.getState().accessToken;
    const photo = await getImageDetail(id, accessToken);

    const createdAt = photo?.created_at ? new Date(photo.created_at) : "";

    return (
        <Modal>
            <div className="w-full h-full overflow-auto flex flex-col items-center justify-center rounded-lg bg-white modal-content p-4">
                <div className="bg-white h-14 w-full flex flex-row items-center justify-between sticky top-0 px-5">
                    <HeaderPhoto
                        id={id}
                        username={photo?.user?.username}
                        name={photo?.user?.name}
                        userImageUrl={photo?.user?.profile_image?.large}
                        isLike={photo?.liked_by_user}
                    />
                </div>

                <div className="w-full px-5 flex flex-row items-center justify-center">
                    {photo?.urls?.regular && (
                        <Image
                            src={photo.urls.regular}
                            alt={photo?.alt_descriptionß ?? "image"}
                            width={870}
                            height={580}
                            style={{
                                width: "auto",
                                height: "580px",
                                objectFit: "contain",
                                overflow: "auto",
                            }}
                        />
                    )}
                </div>
                <div className="w-full px-5 flex flex-row items-center justify-between mt-8">
                    <div className="w-1/2 grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-start justify-center gap-y-1">
                            <span className="text-textPrimary text-sm ">
                                Views
                            </span>
                            <span className="font-medium text-textSecondary text-15px">
                                {Intl.NumberFormat().format(
                                    photo?.views ? photo?.views : 0
                                )}
                            </span>
                        </div>
                        <div className="flex flex-col items-start justify-center gap-y-1">
                            <span className="text-textPrimary text-sm ">
                                Downloads
                            </span>
                            <span className="font-medium text-textSecondary text-15px">
                                {Intl.NumberFormat().format(
                                    photo?.downloads ? photo?.downloads : 0
                                )}
                            </span>
                        </div>
                        <div className="flex flex-col items-start justify-center gap-y-1">
                            <span className="text-textPrimary text-sm ">
                                Featured in
                            </span>
                            <span className="font-medium text-textSecondary text-15px hover:underline cursor-pointer">
                                Editorial
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-end gap-x-4">
                        <button className="bg-white text-textPrimary border border-borderColor px-3 py-1 h-8 rounded text-sm shadow inline-flex gap-x-1 font-medium items-center justify-center hover:text-textSecondary hover:border-textSecondary">
                            <IoIosShareAlt className="text-lg" />
                            Share
                        </button>
                        <button className="bg-white text-textPrimary border border-borderColor px-3 py-1 h-8 rounded text-sm shadow inline-flex gap-x-1 font-medium items-center justify-center hover:text-textSecondary hover:border-textSecondary">
                            <IoMdInformationCircle className="text-base" />
                            Info
                        </button>
                        <button className="bg-white text-textPrimary border border-borderColor px-3 py-1 h-8 rounded text-sm shadow inline-flex items-center justify-center hover:text-textSecondary hover:border-textSecondary">
                            <IoIosMore className="text-lg" />
                        </button>
                    </div>
                </div>
                <div className="w-full flex flex-col px-5 mt-8">
                    <p className="flex flex-row items-center justify-start gap-x-2 text-textPrimary text-sm">
                        <svg
                            style={{ fill: "#767676" }}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            version="1.1"
                            aria-hidden="false"
                        >
                            <desc lang="en-US">Calendar outlined</desc>
                            <path d="M21 6v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14z"></path>
                        </svg>
                        Published on{" "}
                        {createdAt.toLocaleString("default", { month: "long" })}{" "}
                        {createdAt !== "" && createdAt.getDate()},{" "}
                        {createdAt !== "" && createdAt.getFullYear()}
                    </p>
                    <p className="flex flex-row items-center justify-start gap-x-2 text-textPrimary text-sm mt-2">
                        <svg
                            style={{ fill: "#767676" }}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            version="1.1"
                            aria-hidden="false"
                        >
                            <desc lang="en-US">Safety</desc>
                            <path d="m10 14.2 6.6-6.6L18 9l-8 8-4-4 1.4-1.4 2.6 2.6ZM21 5v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V5l9-4 9 4Zm-2 1.3-7-3.1-7 3.1V11c0 4.5 3 8.7 7 9.9 4-1.2 7-5.4 7-9.9V6.3Z"></path>
                        </svg>
                        Free to use under the{" "}
                        <span className="hover:text-textSecondary hover:underline">
                            Unsplash License
                        </span>
                    </p>
                    <div className="w-full flex flex-wrap items-center justify-start gap-2 my-8">
                        {photo?.tags &&
                            photo.tags.length > 0 &&
                            photo.tags.map((tag: any, index: any) => (
                                <a
                                    key={index}
                                    className="text-iconColor text-sm py-1 px-2 rounded capitalize bg-bgInputSearch no-underline cursor-pointer hover:text-textSecondary hover:bg-bgHoverItem"
                                >
                                    {tag.source?.title || tag.title}
                                </a>
                            ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
}
