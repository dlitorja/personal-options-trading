# Add authentication pages and dashboard with shadcn/ui components

- Add sign-in page with Better Auth
- Add sign-up page with Better Auth  
- Add dashboard page showing user info when logged in
- Add shadcn/ui components (Button, Card, Input)
- Configure Tailwind CSS with proper theming
- Add security documentation

## Technical Details

### Updated Dependencies
- Updated Next.js from 15.0.0 to 15.1.11 (patched for CVEs)
- Fixed pg module resolution by adding pg@8.11.0
- Added shadcn/ui components with class-variance-authority
- Added tailwindcss-animate for animations

### Database
- PostgreSQL with Supabase connection configured
- Drizzle ORM v0.41.0 schema for users, sessions, accounts, verifications

### Authentication
- Better Auth v1.4.10 configured with email/password flow
- Session management with cookies
- Sign in/up pages working

### UI Components
- Button, Card, Input components from shadcn/ui
- Theme: Neutral base color with Rose accent color
