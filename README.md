# NewsApp

This is a simple Angular application that displays news articles from a dummy service.

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

The application is structured with reusable components and a `NewsService` that returns mock data. It is ready for future extension to load data from an external API.

## Deployment with Firebase Hosting

1. Install the Firebase CLI globally (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```
2. Update `.firebaserc` with your Firebase project ID.
3. Build and deploy the application:
   ```bash
   npm run deploy
   ```
