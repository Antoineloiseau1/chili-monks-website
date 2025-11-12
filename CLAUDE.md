# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application called "PWR/EDGE Tribute" - a tribute website built with React 19, TypeScript, and Tailwind CSS v4. The site appears to be for a music artist/band with sections for home, about, events, and news.

## Development Commands

- `npm run dev` - Start development server (available at http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture and Structure

### App Router Structure
- Uses Next.js 15 App Router with TypeScript
- Main layout in `src/app/layout.tsx` with global Header component
- Route-based pages: `/home`, `/about`, `/events`, `/news`, `/videos`, `/contact`
- All pages are server components by default

### Key Components
- **Header system**: Fixed header with burger menu, navbar, and social media bar components
- **Layout**: Root layout includes custom font loading (`solid-stencil-2023.ttf`) and global background image
- **Styling**: Tailwind CSS v4 with PostCSS processing, custom background image styling in globals.css

### Styling Architecture
- Tailwind CSS v4 configured via PostCSS (`postcss.config.mjs`)
- Global styles in `src/app/globals.css` with background image and smooth scrolling
- Component-specific styles in dedicated CSS files (e.g., `src/app/components/header/styles.css`)
- Custom font loading with Next.js `localFont`

### Configuration Files
- **TypeScript**: Strict mode enabled, path alias `@/*` for `./src/*`
- **ESLint**: Next.js core-web-vitals and TypeScript rules
- **Next.js**: Standard configuration with no custom options

### Dependencies
- Next.js 15.3.5 with React 19
- Tailwind CSS v4 (latest version)
- React Icons for icon components
- Full TypeScript support with proper type definitions

## File Organization

```
src/app/
├── components/header/     # Header components with individual CSS
├── fonts/                 # Custom font files
├── images/               # Static assets
├── [route]/page.tsx      # Route-based pages
├── layout.tsx            # Root layout
└── globals.css           # Global styles
```

## Key Technical Details

- Uses French locale (`lang="fr"`) in root HTML
- Fixed header with 40px top padding on main content
- Background image with fixed attachment and cover sizing
- Smooth scrolling enabled globally
- All components are functional components using modern React patterns

## Videos Section Implementation

### YouTube Video Integration
- **Videos page**: Located at `/videos` (`src/app/videos/page.tsx`)
- **Embedded videos**: Direct YouTube iframe embeds without API dependency
- **Video structure**: Uses array-based configuration for easy video management
- **Layout**: Custom flexbox layout ensuring proper video positioning:
  - First row: 2 videos side by side
  - Second row: Remaining videos centered
- **Video data format**: `{ url: 'https://www.youtube.com/watch?v=VIDEO_ID', title: 'Video Title' }`
- **URL conversion**: Automatic conversion from YouTube watch URLs to embed format
- **Current videos**: 3 embedded videos from @ACDCByPoweredge channel
- **YouTube channel links**: Direct links to channel and subscription with YouTube branding