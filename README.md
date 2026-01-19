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

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## Usage

1. **Login**: Use the credentials `user123` / `password123` to log in
2. **Onboarding**: Complete the 4-step onboarding process
3. **Resume**: If you close the browser, you can resume from where you left off
4. **Home**: After completing onboarding, you'll be redirected to the home page

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- React Router
- Formik + Yup
- Tailwind CSS
- shadcn/ui components
- Vite

## Project Structure

```
src/
├── components/
│   ├── onboarding/     # Onboarding step components
│   ├── ui/             # Reusable UI components
│   └── ProtectedRoute.tsx
├── pages/              # Page components
├── store/              # Redux store and slices
├── lib/                # Utility functions
└── App.tsx             # Main app component
```
