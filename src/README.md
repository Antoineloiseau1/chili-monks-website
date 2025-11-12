# PWR/EDGE Tribute - Refactored Architecture

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── components/         # Shared layout components
│   ├── events/            # Events pages
│   ├── videos/            # Videos pages
│   └── ...
├── components/            # Reusable UI components
│   └── ui/               # Core UI components
├── data/                 # Static data and configurations
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── config/               # Application configuration
```

## 🏗️ Architecture Principles

### 1. **Separation of Concerns**
- **Data Layer**: `/data` - All static data separated from components
- **Business Logic**: `/utils` - Pure functions for data processing
- **UI Layer**: `/components` - Reusable, focused components
- **State Management**: `/hooks` - Custom hooks for stateful logic

### 2. **Type Safety**
- Comprehensive TypeScript interfaces in `/types`
- Strict typing for all data structures
- Type-safe utility functions

### 3. **Maintainability**
- Single Responsibility Principle for all components
- DRY (Don't Repeat Yourself) code organization
- Consistent naming conventions

## 📋 Key Components

### UI Components (`/components/ui`)

#### `EventCard`
- Displays event information with tickets integration
- Handles date formatting and countdown logic
- Responsive design with hover effects

#### `VideoEmbed`
- YouTube video embedding with error handling
- Automatic URL conversion from watch to embed format
- Fallback for invalid URLs

#### `PastEventsCarousel`
- Infinite scrolling carousel with drag support
- Touch-friendly interactions
- Optimized performance with proper image sizing

#### `ImageModal`
- Full-screen image preview
- Keyboard and click-to-close functionality
- Backdrop blur effects

#### `ErrorBoundary`
- Catches and displays component errors gracefully
- Provides retry functionality
- Development-friendly error messages

### Custom Hooks (`/hooks`)

#### `useCarousel`
- Handles all carousel logic (dragging, auto-scroll, positioning)
- Configurable parameters for different use cases
- Performance optimized with RAF

#### `useImageModal`
- Simple modal state management
- Open/close functionality
- Type-safe image handling

## 🛠️ Utility Functions (`/utils`)

### Date Utilities
- `calculateDaysToEvent()` - Event countdown calculation
- `formatEventDate()` - Consistent date formatting
- `isEventPast()` / `isEventUpcoming()` - Event filtering

### Event Utilities
- `filterUpcomingEvents()` - Smart event filtering
- `combinePastEvents()` - Merge different event types
- `createInfiniteCarouselData()` - Carousel data preparation

### Video Utilities
- `getYouTubeEmbedUrl()` - URL conversion with validation
- `extractVideoId()` - Safe ID extraction

## 📊 Data Management (`/data`)

### Events Data
- `upcomingEventsData` - Future events with full details
- `pastEventsData` - Historical events with images
- Centralized data source for all event-related components

### Videos Data
- `videosData` - YouTube video configurations
- `youtubeChannelData` - Channel information
- Easy to update and maintain

## ⚙️ Configuration (`/config`)

### Constants
- UI constants (breakpoints, animations, layouts)
- External service URLs
- Animation timing values
- Responsive design breakpoints

## 🎯 Benefits of This Architecture

### 1. **Maintainability**
- Easy to add new events/videos - just update data files
- Clear separation makes debugging easier
- Consistent patterns across components

### 2. **Reusability**
- Components can be used across different pages
- Hooks can be shared between components
- Utilities work with any data structure

### 3. **Type Safety**
- Compile-time error detection
- IntelliSense support
- Reduced runtime errors

### 4. **Performance**
- Optimized carousel with RAF
- Lazy loading and code splitting ready
- Minimal re-renders with proper state management

### 5. **Developer Experience**
- Clear file organization
- Self-documenting code structure
- Easy to onboard new developers

## 🚀 Usage Examples

### Adding a New Event
```typescript
// In /data/events.ts
export const upcomingEventsData: Event[] = [
  // ... existing events
  {
    id: "3",
    name: "New Concert",
    date: new Date("2025-12-25"),
    // ... other properties
  }
]
```

### Adding a New Video
```typescript
// In /data/videos.ts
export const videosData: Video[] = [
  // ... existing videos
  { 
    url: 'https://www.youtube.com/watch?v=NEW_VIDEO_ID', 
    title: 'New Video Title' 
  }
]
```

### Using Components
```tsx
import { EventCard, VideoEmbed } from '@/components/ui'
import { useImageModal } from '@/hooks'

// Use in any component
<EventCard event={eventData} />
<VideoEmbed video={videoData} />
```

## 🔧 Development Commands

```bash
# Development server
npm run dev

# Type checking
npm run build

# Linting
npm run lint
```

## 📝 Code Style Guidelines

1. **Components**: PascalCase, single responsibility
2. **Hooks**: camelCase starting with 'use'
3. **Utilities**: camelCase, pure functions
4. **Types**: PascalCase interfaces
5. **Constants**: UPPER_CASE
6. **Files**: camelCase for utilities, PascalCase for components

This architecture provides a solid foundation for scaling the application while maintaining code quality and developer productivity.