# Project TODO

- [x] Fix nested anchor tags in Navigation component
- [x] Fix nested anchor tags in Home page
- [x] Verify all Link components don't wrap <a> tags
- [x] Test website after fixes

## Remove Data Decor Text
- [x] Remove data decor from Home page
- [x] Remove data decor from Navigation component
- [x] Remove data decor from Members page
- [x] Remove data decor from Events page
- [x] Remove data decor from Posts page
- [x] Remove data decor from Servers page
- [x] Remove data decor from Footer component
- [x] Remove DataDecor component usage

## Create About Page
- [x] Create About page component with history section
- [x] Add timeline of milestones
- [x] Add achievements section
- [x] Add navigation link to About page
- [x] Test About page

## Create Gallery Page
- [x] Create Gallery page component with grid layout
- [x] Add lightbox/modal for full-screen viewing
- [x] Add filter by category (All, Heists, PvP, Racing, Events)
- [x] Add video support with play button overlay
- [x] Add navigation link to Gallery page
- [x] Test Gallery page and lightbox functionality

## Fix Gallery Accessibility
- [x] Add DialogTitle to Gallery lightbox for screen reader accessibility
- [x] Test Gallery page after fix

## Increase Lightbox Size
- [x] Increase lightbox modal max-width for larger display
- [x] Adjust image max-height for better viewing
- [x] Test lightbox on different screen sizes

## Add Image Zoom Functionality
- [x] Create ZoomableImage component with zoom state
- [x] Add scroll wheel zoom support
- [x] Add pinch-to-zoom for mobile
- [x] Add double-click to toggle zoom
- [x] Add zoom controls (+ / - buttons)
- [x] Test zoom functionality on desktop and mobile

## Add Authentication & Role Management (Strapi-based)
- [x] Update Strapi service with authentication methods
- [x] Create AuthContext for managing auth state
- [x] Create Login page with Strapi integration
- [x] Create Register page with Strapi integration
- [x] Add protected route wrapper
- [x] Update Members page to filter by role (exclude "Khách")
- [x] Update Navigation with login/logout buttons
- [x] Create Strapi setup documentation
- [x] Test authentication flow

## Create Admin Dashboard
- [x] Create Admin Dashboard page with user management
- [x] Add pending users list (role "Khách")
- [x] Add role assignment functionality
- [x] Add user statistics overview
- [x] Create protected route wrapper for Admin only
- [x] Add Admin Dashboard link to Navigation (Admin only)
- [x] Test Admin Dashboard functionality

## Add Mock Login for Testing
- [x] Update AuthContext with mock users
- [x] Update Login page to support mock login
- [x] Test login with Admin account
- [x] Test Admin Dashboard access
- [x] Verify logout functionality

## Connect Frontend to Strapi Backend
- [x] Configure environment variables with Strapi URL and API token
- [x] Update AuthContext to disable mock auth and use real Strapi API
- [x] Update strapi.ts service to use correct API endpoints
- [ ] Test authentication with real Strapi backend
- [ ] Update Members page to fetch data from Strapi
- [ ] Update Events page to fetch data from Strapi
- [ ] Update Posts page to fetch data from Strapi
- [ ] Update Servers page to fetch data from Strapi
- [ ] Update Gallery page to fetch data from Strapi
- [ ] Test all pages with real data from Strapi

## Integrate Strapi via tRPC Proxy
- [ ] Create tRPC procedures to proxy Strapi API calls
- [ ] Add Strapi service in server/lib
- [ ] Create procedures for: members, events, posts, servers, categories, member-tiers
- [ ] Update frontend to use tRPC instead of direct Strapi calls
- [ ] Test all endpoints with real Strapi data

## Update Frontend to Use Strapi Directly (No tRPC)
- [x] Update client/src/lib/strapi.ts to use VITE_STRAPI_URL from env
- [x] Ensure strapi.ts works from browser (CORS handled)
- [x] Update AuthContext to use Strapi auth endpoints
- [ ] Update Members page to fetch from Strapi
- [ ] Update Events page to fetch from Strapi
- [ ] Update Posts page to fetch from Strapi
- [ ] Update Servers page to fetch from Strapi
- [ ] Test login with Strapi user
- [ ] Verify all data displays correctly

## Test Strapi HTTP Connection
- [x] Update environment variables with HTTP Strapi URL
- [x] Create vitest test for Strapi connection
- [x] Verify all Strapi API endpoints respond correctly
- [x] Restart dev server with new configuration
- [x] Create test user in Strapi admin panel
- [x] Test login with real Strapi credentials
- [x] Discovered Mixed Content issue (HTTPS frontend → HTTP Strapi)
- [ ] Create tRPC proxy procedures for Strapi authentication
- [ ] Create tRPC proxy procedures for Strapi data (members, events, posts, servers)
- [ ] Update frontend to use tRPC proxy instead of direct Strapi calls
- [ ] Verify JWT token storage and user session
- [ ] Test logout functionality
