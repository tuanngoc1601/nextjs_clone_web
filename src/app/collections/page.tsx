"use client";

import CollectionItem from "@/components/CollectionItem";
import { useEffect, useState } from "react";
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

export default function CollectionPage() {
    const [perPage, setPerPage] = useState(10);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [page, setPage] = useState(1);
    const [initialLoad, setInitialLoad] = useState(true);

    const onScroll = () => {
        const isEndPage =
            window.scrollY + window.innerHeight >= document.documentElement.scrollHeight;

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
    }, [page]);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <div className="w-full px-5 mt-28 flex flex-col">
            <div className="flex flex-col items-start justify-center gap-2">
                <h1 className="text-5xl text-textSecondary font-bold">
                    Collections
                </h1>
                <p className="text-lg text-textSecondary leading-7 mt-3">
                    Explore the world through collections of beautiful photos
                    free to use under
                    <br />
                    the{" "}
                    <a className="text-textPrimary underline cursor-pointer hover:text-textSecondary">
                        Unsplash License
                    </a>
                    .
                </p>
            </div>
            <div className="grid grid-cols-3 gap-x-6 gap-y-12 mt-16">
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
        </div>
    );
}
