import React from "react";
import { getUserInfo } from "@/api/unsplash";
import UserPhotoTabs from "@/components/UserPhotosTab";
import ProfileInfo from "@/components/ProfileInfo";
import UserPhotoContainer from "@/components/UserPhotoContainer";

// interface Custom {
//     title: string;
//     source: {
//         title: string;
//     };
// }

// interface UserInfo {
//     name: string;
//     first_name: string;
//     bio: string;
//     location: string;
//     total_photos: number;
//     total_likes: number;
//     total_collections: number;
//     profile_image: {
//         small: string;
//         medium: string;
//         large: string;
//     };
//     tags: {
//         custom: Custom[];
//     };
// }

const getData = async (username: string) => {
    try {
        const userData = await getUserInfo(username);
        return userData;
    } catch (err) {
        console.error("Failed fetching user data", err);
    }
};

export default async function UserProfile({
    params,
}: {
    params: {
        username: string;
    };
}) {
    const userData = await getData(params.username);
    return (
        <div className="w-full mt-28">
            {userData && <ProfileInfo user={userData} />}
            <UserPhotoTabs
                total_photos={userData?.total_photos || 0}
                total_likes={userData?.total_likes || 0}
                total_collections={userData?.total_collections || 0}
            />

            <UserPhotoContainer />
        </div>
    );
}
