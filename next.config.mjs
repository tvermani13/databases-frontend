/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        DB_HOST: 'localhost',
        DB_USER: 'root',
        DB_PASSWORD: 'TheBrownWolf$10',
        DB_NAME: 'business_supply',
        DB_PORT: '3306'    
    }
};

export default nextConfig;
