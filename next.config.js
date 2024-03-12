/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
        domains: ['images.unsplash.com', 'plus.unsplash.com'],
    },
    compiler: {
        styledComponents: true,
    }
};

module.exports = nextConfig;
