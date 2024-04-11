export interface Photo {
    id: string;
    alt_description: string;
    slug: string;
    width: number;
    height: number;
    liked_by_user: boolean;
    blurHash: string | undefined;
    urls: {
        small: string;
    };
    user: {
        name: string;
        profile_image: {
            small: string;
            large: string;
        };
        username: string;
    };
}

export interface PhotoDataProps {
    total_photos: number;
    total_likes: number;
    total_collections: number;
}

export interface ImageProps {
    slug: string;
    alt_description: string;
    imageUrl: string;
    blurHash: string | undefined;
    userImageUrl: string;
    name: string;
    username: string;
    width: number;
    height: number;
    isLike: boolean;
}

interface Custom {
    title: string;
    source: {
        title: string;
    };
}

export interface ProfileProps {
    user: {
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
    };
}

interface Tag {
    type: string;
    title: string;
}

interface PhotoCollection {
    id: string;
    slug: string;
    urls: {
        raw: string;
        full: string;
        small: string;
    };
}

export interface Collection {
    id: string;
    title: string;
    total_photos: number;
    user: {
        name: string;
    };
    tags: Tag[];
    preview_photos: PhotoCollection[];
}

export interface HeaderProps {
    id: string;
    username: string;
    name: string;
    userImageUrl: string;
    isLike: boolean;
}

export interface CollectionProps {
    id: string;
    title: string;
    total_photos: number;
    name: string;
    tags: Tag[];
    preview_photos: PhotoCollection[];
}
