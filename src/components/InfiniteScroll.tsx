import React, { useEffect, useRef, ReactNode } from "react";

interface InfiniteScrollProps {
    children: ReactNode;
    loadMore: () => void;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
    children,
    loadMore,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            if (
                container.scrollTop + container.clientHeight >=
                container.scrollHeight
            ) {
                loadMore();
            }
        };

        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, [loadMore]);

    return (
        <div
            ref={containerRef}
            style={{ overflowY: "auto", height: "100%", position: "relative" }}
        >
            {children}
        </div>
    );
};

export default InfiniteScroll;
