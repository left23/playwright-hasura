export interface Lesson {
  slug: string;
  title: string;
}

export interface LessonWithUrl extends Lesson {
  url: string;
}

export interface QueryResponse {
  lessons: Lesson[];
}

export const LESSONS_QUERY = `
    query GetLessons($releaseIds: [Int!]!) {
      lessons(where: {_release_id: {_in: $releaseIds}}) {
        title
        slug
        lesson_uid
      }
    }
`;
