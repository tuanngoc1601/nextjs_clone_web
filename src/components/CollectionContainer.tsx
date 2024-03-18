"use client";

import React, { useEffect, useState } from "react";
import CollectionItem from "./CollectionItem";
import { getListCollections } from "@/api/unsplash";

interface Tag {
    type: string;
    title: string;
}

interface Photo {
    id: string;
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

const CollectionContainer = () => {
    const [perPage, setPerPage] = useState(10);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [page, setPage] = useState(1);
    const [initialLoad, setInitialLoad] = useState(true);

    const onScroll = () => {
        const isEndPage =
            window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight;

        if (isEndPage) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        const fetchColletionData = async () => {
            try {
                const dataCollections = await getListCollections(perPage, page);

                if (initialLoad) {
                    setInitialLoad(false);
                    setCollections(dataCollections);
                } else {
                    setCollections((prev) => [...prev, ...dataCollections]);
                }
            } catch (err) {
                console.error("Failed fetching collections list", err);
            }
        };

        fetchColletionData();
    }, [page, initialLoad, perPage]);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-12 mt-16">
            {collections &&
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
    );
};

export default CollectionContainer;
