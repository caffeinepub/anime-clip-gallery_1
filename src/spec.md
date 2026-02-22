# Anime Clip Gallery

## Current State
The application has a working upload form that allows users to upload anime clips with metadata. The category dropdown currently shows "english" and "japanese" as the first two options, followed by dynamically fetched categories from the backend. When clips are uploaded, they all appear on the home page regardless of category.

The Twixtor page is a dedicated informational page that explains Twixtor effects and includes an upload form, but uploads from this page still route clips to the home page.

## Requested Changes (Diff)

### Add
- Add "twixtor" as the third category option in the upload form dropdown (after "english" and "japanese")
- Add filtering logic to separate regular clips from Twixtor clips based on category
- Add Twixtor clip display on the Twixtor page with grid layout similar to home page
- Add dedicated state and queries for fetching Twixtor-specific clips

### Modify
- Update `UploadForm.tsx` to include "twixtor" in the hardcoded category options
- Update `TwixtorPage.tsx` to display clips with category "twixtor" instead of just showing informational content
- Update `App.tsx` to handle Twixtor page data fetching and state management for Twixtor clips

### Remove
- None

## Implementation Plan

### Backend
No backend changes needed - the existing `getClipsByCategory` API already supports filtering by "twixtor" category.

### Frontend
1. **Update UploadForm component**:
   - Add "twixtor" as third SelectItem in category dropdown
   - Keep the ordering: english, japanese, twixtor, then dynamic categories

2. **Update TwixtorPage component**:
   - Accept props for clips data, loading state, search/filter capabilities
   - Add clips grid display section below the upload section
   - Reuse ClipCard component for consistent display
   - Add search bar and category filter specific to Twixtor page
   - Show empty state when no Twixtor clips exist

3. **Update App component**:
   - Add state management for Twixtor page (search, filters)
   - Add query to fetch clips by "twixtor" category when on Twixtor page
   - Pass clips data and handlers to TwixtorPage component
   - Ensure Twixtor clips are excluded from home page by filtering

## UX Notes
- When users upload with "twixtor" category, clips should only appear on the Twixtor page, not on home
- The Twixtor page should function as a dedicated gallery for Twixtor clips with its own search/filter
- Upload form behavior remains the same - users can upload from anywhere (header or Twixtor page)
- Maintain the neon black/white aesthetic with consistent card styles
- Empty state on Twixtor page should encourage users to upload first Twixtor clip
