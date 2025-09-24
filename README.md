# ALX E-commerce Front-end

# Set Up the Project

## Create a Next.js project:

`create-next-app@latest .` // Using . sets the current folder as the project name. You can also specify a different project name instead of . if you prefer

## Install Tailwind CSS and dependencies :

`npm install -D tailwindcss@3 postcss autoprefixer` // we used @3 (version 3) because version 4 is not compatible with nextJs 15 version

## Initialize Tailwind CSS

This will create tailwind.config.js and postcss.config.js.

`npx tailwindcss init -p`

## Configure tailwind.config.js

Update the content array so Tailwind can scan your files: // tailwind.config.js

/** @type {import('tailwindcss').Config} \*/
module.exports = {
content: [
'./components/**/_.{js,jsx,ts,tsx}',
'./pages/\*\*/_.{js,jsx,ts,tsx}',
'./app/\*_/_.{js,jsx,ts,tsx}',
],
theme: {
extend: {},
},
plugins: [],
}

## Add Tailwind to your CSS

Open your global CSS file (globals.css in app/ or styles/globals.css in pages/) and add:

@tailwind base;
@tailwind components;
@tailwind utilities;

## Configure postcss.config.mjs

add tailwindcss and autoprefixer plagins:

const config = {
plugins: {
tailwindcss : {},
autoprefixer : {},
},
};

export default config;

## Set up project structure :

Create these folders and files in the root directory:

### Recommended folders and files:

    - components/common
    - components/layouts
    - constants/index.ts
    - interfaces/index.ts
    - public/assets/images
    - .env.local

### visual folder tree diagram

    AlX_E-COMMERCE_PRODUCT_CATALOG/
    ├── components/                 # Reusable React components
    │   ├── common/                # Shared components used across the application
    │   │   ├── AuthForm.tsx       # Authentication form component
    │   │   ├── Button.tsx         # Custom button component
    │   │   └── Card.tsx           # Card layout component for products/content
    │   └── layouts/               # Layout components for page structure
    │       ├── Footer.tsx         # Site footer component
    │       ├── Header.tsx         # Site header/navigation component
    │       ├── Layout.tsx         # Main layout wrapper component
    │       ├── ProductList.tsx    # Component for displaying product listings
    │       ├── Sidebar.tsx        # Sidebar navigation component
    │       └── Toolbar.tsx        # Toolbar/action bar component
    ├── constants/                 # Application constants and configuration
    │   └── index.ts              # Exports all constants
    ├── interfaces/               # TypeScript type definitions
    │   └── index.ts              # Exports all interfaces and types
    ├── node_modules/             # NPM dependencies (auto-generated)
    ├── pages/                    # Next.js pages and API routes
    │   ├── api/                  # API routes directory
    │   │   └── hello.ts          # Example API endpoint
    │   ├── _app.tsx              # Custom App component for global settings
    │   ├── _document.tsx         # Custom Document for HTML structure
    │   └── index.tsx             # Homepage component
    ├── public/                   # Static assets served directly
    │   ├── assets/               # Application assets
    │   │   └── images/           # Image files
    │   │       ├── photo1.jpg    # Product/image gallery photo 1
    │   │       ├── photo2.jpg    # Product/image gallery photo 2
    │   │       ├── photo3.jpg    # Product/image gallery photo 3
    │   │       ├── photo4.jpg    # Product/image gallery photo 4
    │   │       ├── photo5.jpg    # Product/image gallery photo 5
    │   │       ├── photo6.jpg    # Product/image gallery photo 6
    │   │       ├── smartwatch.avif # Smartwatch product image
    │   │       └── tShirt.avif   # T-shirt product image
    │   ├── favicon.ico           # Website favicon
    │   ├── file.svg              # File icon SVG
    │   ├── globe.svg             # Globe icon SVG
    │   ├── next.svg              # Next.js logo SVG
    │   ├── vercel.svg            # Vercel platform logo SVG
    │   └── window.svg            # Window icon SVG
    ├── styles/                   # Global CSS styles
    │   └── globals.css           # Global styles and Tailwind imports
    ├── .env.local                # Local environment variables
    ├── .gitignore                # Git ignore rules
    ├── eslint.config.mjs         # ESLint configuration
    ├── next-env.d.ts             # Next.js TypeScript definitions
    ├── next.config.ts            # Next.js configuration
    ├── package-lock.json         # Exact dependency versions
    ├── package.json              # Project dependencies and scripts
    ├── postcss.config.js         # PostCSS configuration
    ├── postcss.config.mjs        # PostCSS configuration (ES modules)
    ├── README.md                 # Project documentation
    ├── tailwind.config.js        # Tailwind CSS configuration
    └── tsconfig.json             # TypeScript configuration
    
## Install Icons lebrary :

Installation :
`npm install lucide-react`

Usage:
import { Home, User } from 'lucide-react';

export default function Example() {
return (

<div className="flex space-x-4">
<Home className="w-6 h-6 text-blue-500" />
<User className="w-6 h-6 text-green-500" />
</div>
);
}

You can control size and color directly using Tailwind classes.
Official site: `https://lucide.dev`

## State Management with Redux

### Installing Redux
First, install Redux and its related packages:

`npm install redux react-redux @reduxjs/toolkit`
`npm install @types/react-redux`

### Setting Up the Redux Store
Create a store directory inside the src directory to organize Redux-related files.

src/
├── store/
│   ├── index.ts
│   ├── rootReducer.ts
│   └── slices/
│       └── userSlice.ts

## Start your development server

This will start the live development server:

`npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## ALX E-commerce Frontend Project

- Project Overview
- Table of content
- Project Structure
- Tech Stack
- Core Features
- Core Functionality
- API Features
- Development Workflow
