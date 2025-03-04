### This project will
- Fetch lessons from your Hasura GraphQL endpoint
- Transform the data to include the full URL
- Save the data to data/lessons.json
- Run Playwright tests on each lesson URL


## Project structure

- GraphQL query and types (src/types.ts)
- Fetcher script (src/fetchLessons.ts)
- Playwright test script (src/testLessons.ts)


## Setup

```
npm init -y
npm install typescript @types/node graphql-request playwright
npx tsc --init
```
# Install ts-node
`npm install -g ts-node`


1. Copy the example environment file:
`cp .env.example .env`

2. Update the `.env` file with your values:
- `HASURA_ENDPOINT`: Your Hasura GraphQL endpoint
- `HASURA_ADMIN_SECRET`: Your Hasura admin secret (if required)
- `BASE_URL`: The base URL


## Build
```
npm run build
ts-node src/fetchLessons.ts
```

## Fetch
```
npm run fetch
ts-node src/fetchLessons.ts --releaseIds=253,254
```

## Run tests
```
npm run test
npx playwright test
```

## To do
- Limit return for quick testing
- Imrpove error handling
- Expand tests
