# Next.js Project Setup with Tailwind CSS

## 1. Create a Next.js project: 

`create-next-app@latest .`  // Using . sets the current folder as the project name. You can also specify a different project name instead of . if you prefer

## 2. Install Tailwind CSS and dependencies : 

`npm install -D tailwindcss@3 postcss autoprefixer` // we used @3 (version 3) because version 4 is not compatible with nextJs 15 version 

## 3. Initialize Tailwind CSS
This will create tailwind.config.js and postcss.config.js.

`npx tailwindcss init -p`

## 4. Configure tailwind.config.js
Update the content array so Tailwind can scan your files: // tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

## 5. Add Tailwind to your CSS
Open your global CSS file (globals.css in app/ or styles/globals.css in pages/) and add:

@tailwind base;
@tailwind components;
@tailwind utilities;

## 6. Configure postcss.config.mjs
add tailwindcss and autoprefixer plagins:

const config = {
  plugins: {
    tailwindcss : {},
    autoprefixer : {},
  },
};

export default config;

## 7. Set up project structure : 
Create these folders and files in the root directory: 

### Recommended folders and files:
    - components/common
    - components/layouts
    - constants/index.ts
    - interfaces/index.ts
    - public/assets/images
    - .env.local

### visual folder tree diagram

my-nextjs-project/
│
├── components/
│   ├── common/       # Reusable UI components
│   └── layouts/      # Layout components (Header, Footer, etc.)
│
├── constants/
│   └── index.ts      # Application constants
│
├── interfaces/
│   └── index.ts      # TypeScript interfaces
│
├── pages/ or app/    # Next.js pages or App Router folder
│   └── index.tsx or page.tsx
│
├── public/
│   └── assets/images # Images and static assets
│
├── styles/
│   └── globals.css   # Tailwind CSS imports
│
└── .env.local        # Environment variables

## 8. Install Icons lebrary :
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

## 9. Start your development server
This will start the live development server:

`npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## 10. Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## 11. Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
