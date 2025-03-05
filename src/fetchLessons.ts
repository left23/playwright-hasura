import { GraphQLClient } from 'graphql-request';
import { LESSONS_QUERY, QueryResponse, LessonWithUrl } from './types.js';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const HASURA_URL = process.env.HASURA_URL;
const HASURA_AUTH_KEY = process.env.HASURA_AUTH_KEY;
const BASE_URL = process.env.BASE_URL;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (!HASURA_URL || !BASE_URL) {
  throw new Error('Missing required environment variables');
}
async function fetchLessons(releaseIds: number[]): Promise<void> {
  if (!HASURA_URL) {
    throw new Error('HASURA_ENDPOINT is required');
  }
  const client = new GraphQLClient(HASURA_URL, {
    headers: {
      ...(HASURA_AUTH_KEY && { 'x-hasura-admin-secret': HASURA_AUTH_KEY }),
    },
  });

  try {
    const data = await client.request<QueryResponse>(
      LESSONS_QUERY,
      { releaseIds }
    );

    console.log('Raw data from Hasura:', JSON.stringify(data, null, 2));

    const lessonsWithUrls: LessonWithUrl[] = data.lessons.map((lesson) => ({
      ...lesson,
      url: `${BASE_URL}/teachers/lessons/${lesson.slug}`,
    }));

    console.log('Transformed lessons with URLs:', JSON.stringify(lessonsWithUrls, null, 2));

    await fs.writeFile(
      path.join(__dirname, '../data/lessons.json'),
      JSON.stringify(lessonsWithUrls, null, 2)
    );

    console.log(`Successfully saved ${lessonsWithUrls.length} lessons`);

  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
}

// Create data directory if it doesn't exist
fs.mkdir(path.join(__dirname, '../data'), { recursive: true })
  .then(() => {
    // Parse releaseIds from command line arguments.
    // Slice the arguments to skip node and the script name.
    // Convert to numbers and filter out any non-numeric values.
    const releaseIds = process.argv.slice(2).map(Number).filter(id => !isNaN(id));
    return fetchLessons(releaseIds);
  })
  .catch(console.error);
