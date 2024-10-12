/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true, // Change to false if this is not a permanent redirect
            },
        ];
    },
};

export default nextConfig;
