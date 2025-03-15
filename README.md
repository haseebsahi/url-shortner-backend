# URL Shortener Backend

This is the backend service for the URL shortener application built using NestJS. The backend provides a RESTful API that allows users to shorten URLs, redirect to the original URLs, and track analytics.

## Features

- Shorten long URLs into short ones.
- Redirect from short URLs to the original URLs.
- Track the number of clicks for each shortened URL.

## API Endpoints

### Shorten URL

- **POST** `/shorten`
  - Request Body:
    - `originalUrl`: The long URL to be shortened.
  - Response:
    - `url`: The shortened URL.

### Redirect to Original URL

- **GET** `/:shortId`
  - Redirects to the original URL associated with the `shortId`.

### URL Analytics

- **GET** `/analytics/:shortId`
  - Response:
    - `clicks`: The number of times the short URL has been accessed.

## Technologies Used

- NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
- MongoDB/DynamoDB: NoSQL databases for storing URL data.
- Redis: In-memory data structure store for caching URL lookups.
- TypeScript: A superset of JavaScript that compiles to plain JavaScript.

## Setup

1. Clone the repository.
2. Navigate to the `backend` directory.
3. Install dependencies:
   ```
   npm install
   ```
4. Configure your database connection in the environment variables.
5. Start the application:
   ```
   npm run start
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
