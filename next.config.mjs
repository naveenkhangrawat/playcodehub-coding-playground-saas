/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
        remotePatterns: [
            {
                hostname: 'images.unsplash.com',
            }
        ],
        localPatterns: [
            {
                pathname: '/**',
                search: ''
            }
        ]
    }
};

export default nextConfig;
