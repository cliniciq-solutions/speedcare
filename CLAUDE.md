<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SurveyBoss is a static web application consisting of three main pages for healthcare service interaction:

- **Gateway (index.html)**: Landing page with navigation to survey and eligibility checker
- **Survey (survey.html)**: Customer feedback collection with star ratings and comments
- **Eligibility Checker (eligibility.html)**: Medical eligibility assessment for bulk bill services

## Architecture

### File Structure
```
├── index.html          # Main gateway/landing page
├── eligibility.html    # Eligibility assessment form
├── survey.html         # Customer survey form
└── survybox.png        # Logo image asset
```

### Technical Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Inline CSS with consistent component-based patterns
- **API Integration**: REST endpoints at `dermalink.xyz/webhook/`
- **Hosting**: Static file hosting (no build process required)

### Common Patterns

#### Banner Component
Reusable ClinicIQ branding component used across all pages:
```html
<a href="https://cliniciq.com.au" target="_blank" class="banner">
  <img src="/logo/logo.png" alt="ClinicIQ Logo">
  <span>Automation Powered by ClinicIQ Solutions</span>
</a>
```

#### Form Styling
Consistent form styling with:
- White background with rounded corners and shadow
- Blue (#2563eb) primary buttons with hover effects
- Responsive design with max-width containers
- Centered layout with flexbox

#### Configuration Management
- Webhook URLs loaded dynamically via `/api/config` endpoint
- Serverless function at `netlify/functions/config.js` provides URLs
- Environment variables: `SURVEY_WEBHOOK_URL`, `ELIGIBILITY_WEBHOOK_URL`
- Fallback URLs hardcoded for development/testing

## Development Workflow

### Local Development
Since this is a static HTML application, no build process is required:

1. **Local Server**: Use any static file server (e.g., `python -m http.server 8000`)
2. **File Editing**: Direct HTML/CSS/JS modification
3. **Testing**: Open files in browser or serve locally
4. **Local Testing with Functions**: Use `netlify dev` for testing serverless functions locally

### Deployment (Netlify)

#### Environment Variables Setup
In Netlify dashboard, configure these environment variables:
- `SURVEY_WEBHOOK_URL`: URL for survey form submissions
- `ELIGIBILITY_WEBHOOK_URL`: URL for eligibility form submissions

#### Deployment Process
1. Connect repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically triggers on git push
4. No build commands needed (static site with serverless functions)

#### Security Features
- Webhook URLs are hidden from client-side code
- Configuration loaded via serverless function (`/api/config`)
- Fallback URLs available if config loading fails

## Key Implementation Details

### Eligibility Form Logic
- Dynamic condition selection with clickable pills
- Conditional "Other" inputs for conditions and ethnicity
- Australian timezone timestamp formatting
- Modal-based results display with service tables

### Survey Form Features
- Interactive star rating system with hover effects
- Form validation for required fields
- Success message replacement after submission
- Timestamp tracking in ISO format

### Shared Components
- Logo positioning and responsive sizing
- Consistent color scheme and typography
- Hover effects and transitions
- Error handling for API calls

## API Data Structures

### Survey Payload
```json
{
  "rating": "1-5",
  "comment": "string",
  "name": "string", 
  "email": "string",
  "timestamp": "ISO string"
}
```

### Eligibility Payload
```json
{
  "age": "number",
  "conditions": ["array of strings"],
  "ethnicity": "string",
  "email": "string (optional)",
  "timestamp": "Australian formatted string"
}
```

## Style Guide

- **Colors**: Primary blue (#2563eb), backgrounds (#f3f4f6), borders (#d1d5db)
- **Typography**: Arial sans-serif, consistent sizing hierarchy
- **Spacing**: 1rem base unit, responsive margins/padding
- **Animations**: Subtle hover effects with 0.2s transitions
- **Layout**: Flexbox-based centering, max-width containers