# Onboarding App

A complete onboarding flow application built with React, Redux, Formik, and shadcn/ui components.

## Features

- **Login Page**: Simple authentication with hardcoded credentials (username: `user123`, password: `password123`)
- **Multi-step Onboarding Flow**:
  1. Personal Profile (name, age, email, profile picture)
  2. Favorite Songs List (dynamic list with Formik)
  3. Payment Information (card details)
  4. Success Page
- **State Management**: Redux Toolkit for managing application state
- **Persistence**: localStorage to save progress and resume from last step
- **Navigation**: Forward and backward navigation between steps with data retention
- **Protected Routes**: Authentication-based routing

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.x or higher recommended)
- **npm** (version 9.x or higher) or **yarn** (version 1.22.x or higher)

### Check Your Installation

```bash
node --version
npm --version
```

## Getting Started

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required dependencies including React, Redux Toolkit, Formik, Zod, Tailwind CSS, and TypeScript.

### Step 2: Start Development Server

```bash
npm run dev
```

The application will start and you should see output similar to:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### Step 3: Open in Browser

Open your web browser and navigate to:
```
http://localhost:5173
```

## Available Scripts

### Development

```bash
npm run dev
```
- Starts the Vite development server
- Enables hot module replacement (HMR)
- Opens the app at `http://localhost:5173`

### Build for Production

```bash
npm run build
```
- Compiles TypeScript
- Builds the production-ready application
- Outputs to the `dist` directory
- Optimizes and minifies the code

### Preview Production Build

```bash
npm run preview
```
- Serves the production build locally
- Useful for testing the production build before deployment

### Linting

```bash
npm run lint
```
- Runs ESLint to check code quality
- Reports any linting errors or warnings

## Usage

1. **Login**: Use the credentials `user123` / `password123` to log in
2. **Onboarding**: Complete the 4-step onboarding process
3. **Resume**: If you close the browser, you can resume from where you left off
4. **Home**: After completing onboarding, you'll be redirected to the home page

## Login Credentials

The app uses hardcoded credentials for demonstration:

- **Username:** `user123`
- **Password:** `password123`

These credentials are displayed on the login page for easy reference.

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- React Router
- Formik + Zod
- Tailwind CSS
- shadcn/ui components
- Vite

## Project Structure

```
Onborading-app/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── onboarding/     # Onboarding step components
│   │   └── ui/             # UI component library
│   ├── constants/          # App-wide constants
│   ├── lib/                # Utility libraries
│   ├── pages/              # Page components
│   ├── store/              # Redux store and slices
│   │   ├── slices/         # Redux slices
│   │   ├── hooks.ts        # Typed Redux hooks
│   │   └── store.ts        # Store configuration
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── postcss.config.js       # PostCSS configuration
```

## Development Workflow

### Making Changes

1. **Edit Files**: Make your changes in the `src/` directory
2. **Hot Reload**: The development server automatically reloads when you save changes
3. **Check Console**: Open browser DevTools to see any errors or warnings

### Code Formatting

The project uses ESLint for code quality. Run linting before committing:

```bash
npm run lint
```

### Type Checking

TypeScript is configured with strict mode. The build process will catch type errors:

```bash
npm run build
```

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual port number.

To specify a different port:
```bash
npm run dev -- --port 3000
```

### Dependencies Issues

If you encounter dependency-related errors:

1. **Delete node_modules and lock file:**
   ```bash
   rm -rf node_modules package-lock.json
   ```

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

3. **Reinstall dependencies:**
   ```bash
   npm install
   ```

### TypeScript Errors

If you see TypeScript errors:

1. Ensure all dependencies are installed
2. Check that `tsconfig.json` is properly configured
3. Restart your IDE/editor
4. Run `npm run build` to see detailed error messages

### localStorage Issues

If you're experiencing issues with saved data:

1. Open browser DevTools
2. Go to Application → Local Storage
3. Clear the storage keys: `authState` and `onboardingState`
4. Refresh the page

## Building for Production

### Create Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally so you can test it before deployment.

### Deploy

The `dist/` folder contains all the files needed for deployment. You can deploy to:

- **Vercel**: Connect your repository or use Vercel CLI
- **Netlify**: Drag and drop the `dist` folder or connect repository
- **GitHub Pages**: Use GitHub Actions or manual upload
- **Any static hosting service**: Upload the `dist` folder contents

## Configuration

### TypeScript (`tsconfig.json`)

- Strict mode enabled
- Path aliases configured (`@/*` maps to `src/*`)
- ES2020 target
- React JSX transform

### Vite (`vite.config.ts`)

- React plugin configured
- Path alias support
- Fast HMR enabled

### Tailwind CSS (`tailwind.config.js`)

- Custom color scheme
- Animation support
- Content paths configured

## Browser Support

The app supports modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Additional Resources

### Learn More About:

- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org
- **Redux Toolkit**: https://redux-toolkit.js.org
- **Vite**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Formik**: https://formik.org
- **Zod**: https://zod.dev

## Quick Checklist

Before starting development, ensure:

- [ ] Node.js is installed (v18+)
- [ ] npm/yarn is installed
- [ ] Dependencies are installed (`npm install`)
- [ ] Development server starts successfully (`npm run dev`)
- [ ] App opens in browser at `http://localhost:5173`
- [ ] You can log in with demo credentials
- [ ] No console errors appear

## Getting Help

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Ensure all prerequisites are installed correctly
3. Verify you're using the correct Node.js version
4. Review the code structure in the **Project Structure** section
