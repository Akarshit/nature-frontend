This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Install Mongo

1. `brew tap mongodb/brew`
1. `brew update`
1. `brew install mongodb-community@6.0`

### Run Mongo

1. `brew services start mongodb-community@6.0`

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Deploy

1. `ssh -i res_server.pem ubuntu@18.208.6.57`
2. `cd reservnature`
3. `git pull`
4. `yarn`
5. `pm2 restart nature && pm2 logs`
