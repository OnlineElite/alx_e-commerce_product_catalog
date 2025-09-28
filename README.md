# AIX E-Commerce Product Catalog

## 📋 Project Overview

AIX E-Commerce Product Catalog is a modern, responsive e-commerce application built with Next.js, TypeScript, and Tailwind CSS. The application features a dynamic product catalog with advanced filtering, sorting, pagination, and complete authentication system.

## 🚀 Key Features

### 1. Authentication System
- **User Registration**: Complete sign-up with email and password
- **User Login**: Secure login with session management
- **Logout**: Secure session termination
- **Protected Routes**: Route guards for authenticated pages
- **Persistent Sessions**: Automatic login state persistence

### 2. API Data Integration
- **Dynamic Product Fetching**: Fetch and display product data dynamically from backend APIs
- **Loading States**: Smooth loading indicators during data fetching
- **Error Handling**: Comprehensive error boundaries and fallback UI components
- **Real-time Updates**: Live product data synchronization

### 3. Advanced Filtering & Sorting
- **Category Filtering**: Filter products by specific categories
- **Price Sorting**: Sort products by price (ascending/descending)
- **Multi-Criteria Filters**: Combine multiple filters for refined search results
- **Real-time Filtering**: Instant results as filters are applied

### 4. Pagination System
- **Numbered Navigation**: Traditional page-based navigation
- **Product Chunking**: Display products in manageable chunks
- **Responsive Pagination**: Adapts to different screen sizes
- **Page Size Options**: Configurable items per page

### 5. Responsive Design
- **Mobile-First Approach**: Optimized for mobile devices
- **Tablet Compatibility**: Seamless experience on tablets
- **Desktop Optimization**: Full-featured desktop interface
- **Cross-Browser Support**: Consistent performance across browsers

## 🏗️ Project Structure

```
AIX_E-COMMERCE_PRODUCT_CATALOG/
├── 📁 components/
│   ├── 📁 common/
│   │   ├── AuthForm.tsx          # Authentication form component
│   │   ├── Button.tsx            # Reusable button component
│   │   ├── Card.tsx              # Product card component
│   │   ├── ErrorBoundary.tsx     # Error boundary implementation
│   │   └── AuthFormErrorFallback.tsx # Auth form error fallback
│   └── 📁 layouts/
│       ├── Footer.tsx            # Site footer
│       ├── Header.tsx            # Navigation header
│       ├── Layout.tsx            # Main layout wrapper
│       ├── ProductList.tsx       # Product listing component
│       ├── ProductListErrorFallback.tsx # Product list error fallback
│       ├── Sidebar.tsx           # Filter sidebar
│       └── Toolbar.tsx           # Utility toolbar
├── 📁 constants/
│   ├── index.ts                  # Application constants
│   └── interfaces/               # TypeScript interfaces
├── 📁 pages/
│   ├── 📁 api/                   # API routes
│   │   ├── app.tsx               # Main app component
│   │   ├── document.tsx          # Document structure
│   │   └── index.tsx             # Home page
│   └── 📁 auth/                  # Authentication pages
├── 📁 public/
│   └── 📁 assets/
│       ├── 📁 images/            # Product and UI images
│       ├── favicon.ico           # Site favicon
│       ├── file.svg              # File icon
│       ├── globe.svg             # Globe icon
│       ├── next.svg              # Next.js logo
│       ├── vercel.svg            # Vercel logo
│       └── window.svg            # Window icon
├── 📁 store/
│   └── 📁 slices/                # Redux state slices
│       ├── authSlice.ts          # Authentication state
│       ├── cartSlice.ts          # Shopping cart state
│       ├── filterSlice.ts        # Filter and sort state
│       ├── productSlice.ts       # Product data state
│       ├── userSlice.ts          # User profile state
│       ├── index.ts              # Store exports
│       └── rootReducer.ts        # Root reducer configuration
├── 📁 styles/
│   └── globals.css               # Global styles and Tailwind imports
├── 📁 interfaces/                # TypeScript type definitions
├── 📄 .env.local                 # Environment variables
├── 📄 .gitignore                 # Git ignore rules
├── 📄 eslint.config.mjs          # ESLint configuration
├── 📄 next-env.d.ts              # Next.js TypeScript definitions
├── 📄 next.config.js             # Next.js configuration
├── 📄 package.json               # Project dependencies and scripts
├── 📄 package-lock.json          # Dependency lock file
├── 📄 postcss.config.js          # PostCSS configuration
├── 📄 postcss.config.mjs         # PostCSS module configuration
├── 📄 README.md                  # Project documentation
├── 📄 tailwind.config.js         # Tailwind CSS configuration
└── 📄 tsconfig.json              # TypeScript configuration
```

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript development
- **React 18**: Modern React with hooks and concurrent features

### State Management
- **Redux Toolkit**: Predictable state container
- **RTK Query**: Data fetching and caching

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first responsive layouts

### Development Tools
- **ESLint**: Code linting and quality
- **PostCSS**: CSS processing
- **Git**: Version control

## 📦 Core Components

### State Management Slices
- **authSlice**: Manages user authentication state
- **cartSlice**: Handles shopping cart operations
- **filterSlice**: Controls product filtering and sorting
- **productSlice**: Manages product data and API states
- **userSlice**: Handles user profile information

### Layout Components
- **Layout**: Main application wrapper with error boundary
- **Header**: Navigation and search functionality
- **Sidebar**: Filter and category selection
- **ProductList**: Product grid with pagination
- **Footer**: Site information and links

### Utility Components
- **ErrorBoundary**: Global error handling with custom fallbacks
- **AuthForm**: User authentication interface
- **Button**: Reusable button component with variants
- **Card**: Product display card component

## 🎯 Implementation Details

### Error Handling Strategy
```typescript
// Comprehensive error boundaries with custom fallbacks
- Global error boundary in Layout component
- Component-specific error fallbacks
- Graceful degradation for failed API calls
- User-friendly error messages
```

### Responsive Breakpoints
```css
/* Tailwind CSS responsive design */
sm: 640px   /* Mobile */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Filtering System
```typescript
// Multi-criteria filtering capabilities
- Category-based filtering
- Price range filtering
- Sort by price (ascending/descending)
- Real-time filter combination
```

### Pagination Logic
```typescript
// Efficient pagination implementation
- Configurable page sizes
- Dynamic page calculation
- Responsive page navigation
- URL-based pagination state
```

## 📱 Responsive Design Features

### Mobile Optimization
- Touch-friendly interface
- Collapsible navigation
- Optimized product grids
- Mobile-first filtering

### Tablet Adaptation
- Adaptive product layouts
- Sidebar navigation
- Enhanced touch targets
- Optimized typography

### Desktop Experience
- Full-featured filtering sidebar
- Multi-column product grids
- Advanced sorting options
- Enhanced user interactions

## 🔧 Customization

### Adding New Filters
1. Update `filterSlice.ts` with new filter logic
2. Modify sidebar components
3. Update product filtering utilities

### Styling Changes
1. Modify Tailwind classes in components
2. Update `globals.css` for custom styles
3. Adjust `tailwind.config.js` for theme changes

### API Integration
1. Update product slice for new endpoints
2. Modify API utility functions
3. Update TypeScript interfaces

## 🐛 Troubleshooting

### Common Issues
- **API Connection**: Check environment variables
- **Styling**: Verify Tailwind CSS configuration
- **Build Errors**: Check TypeScript compilation
- **Responsive Issues**: Test across breakpoints

### Debugging Tools
- Redux DevTools for state inspection
- React Developer Tools for component debugging
- Network tab for API request monitoring


## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Create a Next.js project:

```bash
create-next-app@latest .
 ```
// Using . sets the current folder as the project name. You can also specify a different project name instead of . if you prefer

## Install Tailwind CSS and dependencies :

```bash 
npm install -D tailwindcss@3 postcss autoprefixer 
```
// we used @3 (version 3) because version 4 is not compatible with nextJs 15 version

## Initialize Tailwind CSS

This will create tailwind.config.js and postcss.config.js.

`npx tailwindcss init -p`

## Configure tailwind.config.js

Update the content array so Tailwind can scan your files: // tailwind.config.js
```
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
```
## Add Tailwind to your CSS

Open your global CSS file (globals.css in app/ or styles/globals.css in pages/) and add:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
## Configure postcss.config.mjs

add tailwindcss and autoprefixer plagins:
```
const config = {
    plugins: {
        tailwindcss : {},
        autoprefixer : {},
    },
};
export default config;
```

## Set up project structure :

Create these folders and files in the root directory:

### Recommended folders and files:

    - components/common
    - components/layouts
    - constants/index.ts
    - interfaces/index.ts
    - public/assets/images
    - .env.local
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
        )
    }

You can control size and color directly using Tailwind classes.
Official site: `https://lucide.dev`

## State Management with Redux

### Installing Redux
First, install Redux and its related packages:

```bash
npm install redux react-redux @reduxjs/toolkit
npm install @types/react-redux
```

### Setting Up the Redux Store
Create a store directory inside the src directory to organize Redux-related files.

```
src/
├── store/
│   ├── index.ts
│   ├── rootReducer.ts
│   └── slices/
│       └── userSlice.ts

```

## Start your development server

This will start the live development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

### Environment Setup
Create a `.env.local` file with your environment variables:
```env
NEXT_PUBLIC_API_BASE_URL=your_api_url
```

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
