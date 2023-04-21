/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	reactStrictMode: false,
	env: { 
        NEXT_PUBLIC_API_URL: "http://localhost:8000/api/",
        FRONT_END_URL: "http://demo.vital-net.com/",
    },
    images: {
        domains: ['vitalnetmvpbucket.s3.eu-central-1.amazonaws.com'],
    }
};

module.exports = nextConfig;
