/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'quick-capybara-655.convex.cloud',
                port: '',
                pathname: '/api/storage/**',
            },
        ],
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        // ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
