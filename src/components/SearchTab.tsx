"use client";

import { getSearchCollections, getSearchPhotos } from "@/api/unsplash";
import { useStore } from "@/lib/store";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { MdCollections } from "react-icons/md";

const SearchTab: React.FC = () => {
    const pathname = usePathname();
    const params = useParams<{ query: string }>();
    const totalPhotos = useStore(state => state.numberPhotoSearched);
    const totalCollections = useStore(state => state.numberCollectionSearched);
    const updateNumberPhotos = useStore(state => state.updateNumberPhoto);
    const updateNumberCollections = useStore(state => state.updateNumberCollection);

    useEffect(() => {
        (async (query: string) => {
            const dataPhotos = await getSearchPhotos(query, 30, 1);
            const dataCollections = await getSearchCollections(query, 10, 1);
            updateNumberPhotos(dataPhotos?.total);
            updateNumberCollections(dataCollections?.total);
        })(params?.query);
    }, []);

    return (
        <div className="sticky top-14 z-10 bg-white h-14 w-full flex flex-row items-center justify-start mt-48 px-5 gap-x-8 border-b border-borderColor mb-10">
            <Link href={`/search/photos/${params?.query}`}>
                <div
                    className={`flex flex-row items-center justify-center gap-x-2 font-medium text-textPrimary text-sm  ${
                        pathname.includes("/search/photos/")
                            ? "text-textSecondary"
                            : "cursor-pointer hover:text-textSecondary"
                    }`}
                >
                    <span>
                        <MdPhotoSizeSelectActual />
                    </span>
                    Photos&nbsp;
                    {totalPhotos > 1000
                        ? `${
                              totalPhotos < 10000
                                  ? (totalPhotos / 1000).toFixed(1)
                                  : totalPhotos / 1000
                          }k`
                        : totalPhotos}
                </div>
            </Link>
            <Link href={`/search/collections/${params?.query}`}>
                <div
                    className={`flex flex-row items-center justify-center gap-x-2 font-medium text-textPrimary text-sm  ${
                        pathname.includes("/search/collections/")
                            ? "text-textSecondary"
                            : "cursor-pointer hover:text-textSecondary"
                    }`}
                >
                    <span>
                        <MdCollections />
                    </span>
                    Collections&nbsp;
                    {totalCollections > 1000
                        ? `${
                              totalCollections < 10000
                                  ? (totalCollections / 1000).toFixed(1)
                                  : totalCollections / 1000
                          }k`
                        : totalCollections}
                </div>
            </Link>
        </div>
    );
};

export default SearchTab;
