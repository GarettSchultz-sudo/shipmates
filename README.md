# ShipMates

A Tinder-style matching platform for indie hackers and builders to find collaborators.

## Features

- GitHub/Twitter OAuth authentication
- Profile creation with tech stack, goals, and building pace
- Swipe interface with pass, connect, and super connect actions
- Real-time matching and chat
- Keyboard shortcuts for power users

## Tech Stack

- **Frontend**: React with Vite
- **Styling**: Tailwind CSS v4
- **Backend**: Supabase (auth, database, realtime)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to SQL Editor and run the contents of `supabase-schema.sql`

### 2. Configure OAuth Providers

1. In Supabase Dashboard, go to Authentication > Providers
2. Enable GitHub:
   - Create a GitHub OAuth App at https://github.com/settings/developers
   - Set callback URL to: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
   - Copy Client ID and Secret to Supabase
3. Enable Twitter:
   - Create a Twitter App at https://developer.twitter.com
   - Set callback URL to: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
   - Copy API Key and Secret to Supabase

### 3. Environment Variables

Create a `.env` file:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Install & Run

```bash
npm install
npm run dev
```

## Keyboard Shortcuts

- Arrow Left: Pass
- Arrow Right: Connect
- S: Super Connect

## Deployment (Vercel)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## License

MIT
# Trigger redeploy
