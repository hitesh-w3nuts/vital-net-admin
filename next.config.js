/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	reactStrictMode: false,
	env: { 
        NEXT_PUBLIC_API_URL: "https://demo.vital-net.org:8000/api/",
        FRONT_END_URL: "https://demo.vital-net.org/",
    },
    images: {
        domains: ['vitalnetmvpbucket.s3.eu-central-1.amazonaws.com'],
    }
};

module.exports = nextConfig;
