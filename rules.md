# AI Assistant Rules

## Server Management
- **NEVER start or run any development servers without explicit user permission**
- If user asks to STOP servers: Stop all servers on ports 3000, 3001, 3002 and do NOT restart them
- If user wants to start servers: Let them start servers themselves in their own terminal
- User explicitly wants control over their development environment

## General Behavior
- Read and follow all .md files in the project root for context
- When user asks to add rules, read the existing rules.md first, understand them, then append/update appropriately
- Do not be overly verbose - user prefers concise responses
- When user is frustrated or shouting, acknowledge immediately and take decisive action

## Project Context
- This is a personal options trading application
- Uses Next.js 15.1.11
- Uses shadcn/ui components
- Uses Better Auth for authentication
- Uses Tailwind CSS v3
- Database: PostgreSQL with Drizzle ORM
