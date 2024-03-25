import { useState, useEffect } from "react";

interface RecentSearchHook {
    recentSearches: string[];
    addRecentSearch: (searchTerm: string) => void;
    clearRecentSearches: () => void;
}

export function useRecentSearches(): RecentSearchHook {
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    useEffect(() => {
        const searches = JSON.parse(
            localStorage.getItem("recentSearches") || "[]"
        ) as string[];
        setRecentSearches(searches);
    }, []);

    const addRecentSearch = (searchTerm: string) => {
        const updatedSearches = [
            searchTerm,
            ...recentSearches.filter((search) => search !== searchTerm),
        ];
        setRecentSearches(updatedSearches.slice(0, 5));
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem("recentSearches");
    };

    return { recentSearches, addRecentSearch, clearRecentSearches };
}
