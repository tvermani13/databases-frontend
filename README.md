
# Instructions for testing:

- Create "next.config.mjs" file in root directory
- Create ".env" file in root directory
- Paste in ".env":

  ```
  export DB_HOST=<host>
  export DB_USER=<user>
  export DB_PASSWORD=<password>
  export DB_NAME=<db name>
  export DB_PORT=<port>
  ```
- Paste in "next.config.mjs":

```bash
  /** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        DB_PORT: process.env.DB_PORT  
    }
};

export default nextConfig;
```

- Run the project
  ```bash
  npm install
  npm run dev
  ```
