# MovieMaster Pro

A comprehensive movie management system where users can browse, manage, and organize their favorite movies with advanced filtering and personal collections.

## Live Site URL
[Add your deployed site URL here]

## Key Features

⭐ **User Authentication** - Secure login and registration with Firebase authentication including Google Sign-In

🎬 **Movie Management** - Add, edit, delete, and view detailed information about movies with full CRUD operations

📚 **Personal Collection** - Manage your own movie collection with easy-to-use interface

🏆 **Top Rated Movies** - Discover the highest-rated movies in our database

🕐 **Recently Added** - Stay updated with the latest additions to the movie collection

🎨 **Dark/Light Theme Toggle** - Switch between themes for comfortable viewing experience

## Technologies Used

- React.js with Vite
- React Router for navigation
- Firebase Authentication
- Tailwind CSS + DaisyUI
- Axios for API calls
- React Hot Toast for notifications

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

## Deployment

Deploy to Netlify or Firebase Hosting. Make sure to configure the `_redirects` file for SPA routing.

