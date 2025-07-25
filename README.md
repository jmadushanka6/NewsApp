# NewsApp

This is a simple Angular application that displays news articles fetched from a Firebase Firestore collection.

## Development

1. Install dependencies (requires Node and npm):
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Run unit tests:
   ```bash
   npm test
   ```

The application is structured with reusable components. Both the `NewsService` and `LocalNewsService` load articles from the same `news` collection in Firestore. A demo Firebase configuration is already provided in the environment files, but you can replace it with your own project settings if desired.

## Tags

Articles may include an optional `tag` field. Tags appear as small labels on the home page and in the article detail view.
