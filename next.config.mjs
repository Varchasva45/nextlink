/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'nextlink.s3.amazonaws.com'
            },
            {
                protocol: 'https',
                hostname: 'placeprep.s3.amazonaws.com'
            },
            {
                protocol: 'https',
                hostname: 'nestlink.s3.amazonaws.com'
            }
        ]
    }
};

export default nextConfig;
