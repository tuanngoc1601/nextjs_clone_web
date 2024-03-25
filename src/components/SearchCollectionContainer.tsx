"use client";

import React, { useEffect, useState } from "react";
import CollectionItem from "./CollectionItem";
import { getSearchCollections } from "@/api/unsplash";
import { useParams } from "next/navigation";

interface Tag {
    type: string;
    title: string;
}

interface Photo {
    id: string;
    slug: string;
    urls: {
        raw: string;
        full: string;
        small: string;
    };
}

interface Collection {
    id: string;
    title: string;
    total_photos: number;
    user: {
        name: string;
    };
    tags: Tag[];
    preview_photos: Photo[];
}

const SearchCollectionContainer = () => {
    const params = useParams<{ query: string }>();
    const [perPage, setPerPage] = useState(30);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [page, setPage] = useState(1);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        (async () => {
            const dataCollections = await getSearchCollections(
                params?.query,
                perPage,
                page
            );

            if (initialLoad) {
                setInitialLoad(false);
                setCollections(dataCollections?.results);
            } else {
                setCollections((prev) => [
                    ...prev,
                    ...dataCollections?.results,
                ]);
            }
        })();
    }, [params?.query, page, perPage]);

    return (
        <div className="w-full px-5 mb-8">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-12 mt-16">
                {collections &&
                    collections.length > 0 &&
                    collections.map((collection, index) => (
                        <CollectionItem
                            key={index}
                            id={collection.id}
                            title={collection.title}
                            total_photos={collection.total_photos}
                            name={collection.user?.name}
                            tags={collection.tags.slice(0, 3)}
                            preview_photos={collection.preview_photos}
                        />
                    ))}
            </div>
            <button
                className="w-full border border-borderColor flex flex-row items-center justify-center text-textPrimary hover:border-textSecondary hover:text-textSecondary rounded text-base font-medium py-4 mt-4"
                onClick={() => setPage((prev) => prev + 1)}
            >
                Load more
            </button>
        </div>
    );
};

export default SearchCollectionContainer;
