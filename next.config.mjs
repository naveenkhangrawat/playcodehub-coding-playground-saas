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
                pathname: '/public/**',
                search: ''
            }
        ]
    }
};

export default nextConfig;
