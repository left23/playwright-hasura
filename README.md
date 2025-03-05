## This project will
- Fetch lessons with specific release IDs from Hasura GraphQL endpoint
- Transform the data to include the full URL
- Save the data to data/lessons.json
- Run Playwright tests on each lesson URL
- Provide Playwright test report

## Project structure
- GraphQL query and types (`src/types.ts`), using graphql-request
- Fetch script (`src/fetchLessons.ts`)
- Playwright test script (`tests/`)

## Setup

1. Install necessary packages - typescript, graphql-request, playwright etc.
`npm i`
And ts-node globally as needed
`npm install -g ts-node`

2. Copy the example environment file:
`cp .env.example .env`

3. Update the `.env` file with your values:
- `HASURA_URL`: Your Hasura GraphQL endpoint
- `HASURA_AUTH_KEY`: Your Hasura admin secret (if required)
- `BASE_URL`: The base URL

## Build
`npm run build`
TypeScript Compiler (see `tsconfig.json`) generates javascript files from the typescript files.

## Fetch lessons
`npm run fetch [release ID]`
Example: `npm run fetch 542 543`
Fetches lessons from specific release IDs and saves them as an array to `data/lessons.json`
```
  {
    "title": "Title of lesson",
    "slug": "title-of-lesson",
    "lesson_uid": "LESS-XXXXX-00000",
    "url": "https://www.thenational.academy/teachers/lessons/title-of-lesson"
  }
```

## Run tests
`npm run test`
Runs Playwright tests contained `tests`
