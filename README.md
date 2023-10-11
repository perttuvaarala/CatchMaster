# CatchMaster

Catchmaster a fishing app where users can share experiences from their fishing trips and recommend and receive recommendations for lures based on different weather conditions.
In practice, the app works by allowing users to input the length, weight, and the lure used to catch a fish, and it records the user's weather conditions.
With this information, the app can provide real-time lure color recommendations tailored to the current weather. The target audience for this app is fishing enthusiasts.

https://catchmaster.vercel.app/

## Table of Contents

-   [Features](#features)
-   [Technologies](#technologies)
-   [Dependencies](#dependencies)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Development](#development)
-   [Tests](#tests)

## Features

-   User posting
-   Customizable profiles
-   Leaflet map
-   Real time weather data
-   Google login

## Technologies

-   GraphQL
-   TypeScript
-   MongoDB Atlas
-   NodeJS
-   Express.js

## Dependencies

-   For frontend's dependencies, refer to https://github.com/perttuvaarala/CatchMaster/blob/main/packages/app/package.json
-   For backend's dependencies, refer to https://github.com/perttuvaarala/CatchMaster/blob/main/packages/server/package.json

## Prerequisites

Before you begin installation, ensure you have met the following requirement:

-   **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install the project's dependencies by running the following command:

```bash
   npm install
```

4. Create .env files for the frontend (\app) and for the backend (\server) based on .env.samples

## Development

-   Launch the development server using the following commands:

**Backend**

First navigate to the project directory

then run:

```bash
   npm run dev -w server
```

**Frontend**

First navigate to \Catchmaster\packages\app

then run:

```bash
   npm run dev
```

-   Using these commands launches the development server to the ports configurated in the .env file

## Tests

-   Run tests using the following command:

```bash
   npm run test
```
