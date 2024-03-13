"use client";

import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { getUserInfo, getUserPhotos } from "@/api/unsplash";
import UserPhotoTabs from "@/components/UserPhotosTab";
import ProfileInfo from "@/components/ProfileInfo";
import ImageItem from "@/components/ImageItem";

interface Custom {
    title: string;
    source: {
        title: string;
    };
}

interface UserProfileProps {
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
}

interface Photo {
    id: string;
    urls: {
        raw: string;
        regular: string;
        full: string;
    };
    user: {
        name: string;
        profile_image: {
            small: string;
        };
        username: string;
    };
}

export default function UserProfile({
    params,
}: {
    params: { username: string };
}) {
    const [user, setUser] = useState<UserProfileProps | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [page, setPage] = useState(1);
    const perPage = 10;
    const [initialLoad, setInitialLoad] = useState(true);

    const onScroll = () => {
        const isEndPage =
            window.scrollY + window.innerHeight >= document.documentElement.scrollHeight;

        if (isEndPage) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        const fetchUserPhotos = async (username: string) => {
            try {
                const userPhotos = await getUserPhotos(username, perPage, page);
                if (initialLoad) {
                    setInitialLoad(false);
                    setPhotos(userPhotos);
                } else {
                    setPhotos((prev) => [...prev, ...userPhotos]);
                }
            } catch (err) {
                console.log("Failed fetching photos", err);
            }
        };

        fetchUserPhotos(params.username);
    }, [page]);

    useEffect(() => {
        const fetchUserData = async (username: string) => {
            try {
                const dataUser = await getUserInfo(username);
                setUser(dataUser);
            } catch (err) {
                console.log("Error fetching infomation:", err);
            }
        };

        fetchUserData(params.username);

        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <div className="w-full mt-28">
            {user && <ProfileInfo user={user} />}
            <UserPhotoTabs
                total_photos={user?.total_photos || 0}
                total_likes={user?.total_likes || 0}
                total_collections={user?.total_collections || 0}
            />

            <div className="w-full columns-3 gap-4 px-5">
                {photos &&
                    photos.map((photo, index) => (
                        <ImageItem
                            key={index}
                            imageUrl={photo.urls?.raw}
                            userImageUrl={photo.user?.profile_image?.small}
                            name={photo.user?.name}
                            username={photo.user?.username}
                        />
                    ))}
            </div>
        </div>
    );
}
