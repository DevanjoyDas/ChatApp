# Chat App Doumentation

A modern chat application built with React, TypeScript, and Vite.

## Requirements

- Node.js (>= 16.0.0)
- npm or yarn
- Modern web browser
- TypeScript (Installed Locally or Globally)

## Tech Stack

- React 18.3.1
- TypeScript
- Vite 6.0.5
- React Router DOM 7.1.1
- InstantDB for React
- IndexedDB (via idb package)

## Features

- Real-time chat functionality
- IndexedDB for local data persistence
- TypeScript for type safety
- Modern React with hooks
- Fast development with Vite

## Installation

1. Clone the repository:


2. Install dependencies:
```bash
npm install
```

## Development

To run the project in development mode:

```bash
npm run dev
```

This will start the development server at `http://localhost:5173` (default Vite port).

## Building for Production

Create a production build:
```bash
npm run build
# or
yarn build
```


## Project Structure

```
chatapp/
├── src/
│   ├── components/
│   ├── utils/
│   ├── data/
│   └── pages/
│   ├── styles/
│   └── context
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
├── instant.perms.ts
└── instant.schema.ts
```

## Scripts

- `dev`: Starts development server
- `build`: Builds TypeScript and creates production build
- `lint`: Runs ESLint for code quality
- `preview`: Previews production build locally

## ESLint Configuration

The project uses a comprehensive ESLint setup with:
- React Hooks plugin
- React Refresh plugin
- TypeScript support

## Browser Support

This application supports all modern browsers that are ES6-compatible and have IndexedDB support.




## Development Notes

- The project uses Vite for faster development experience
- TypeScript is configured for strict type checking
- ESLint is set up with modern React best practices
- IndexedDB is used for client-side storage


