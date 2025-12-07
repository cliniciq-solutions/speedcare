# Convert SurveyBoss to NDIS Screening Flow

## Overview
This proposal outlines the conversion of the SurveyBoss application from its current survey/eligibility checker structure to a dedicated NDIS participant screening and intake flow. The new flow will implement a two-layer approach: an initial screening questionnaire followed by a full intake form for qualified prospects.

## Current State
- Static HTML application with three pages: Gateway, Survey, and Eligibility Checker
- Current eligibility checker focuses on bulk bill services eligibility
- Uses webhook-based backend integration via Netlify functions
- Responsive design with consistent ClinicIQ branding

## Desired Future State
- QR code-driven entry point to screening page
- Layer 1: Short screening questionnaire (5 questions) to filter suitable NDIS participants
- Layer 2: Comprehensive NDIS intake form for qualified participants
- Automated decision logic to route users based on screening responses
- Maintain existing technical architecture (static HTML + webhook integration)
- Use same n8n workflow backend logic with placeholder endpoints
- Keep all existing styling elements (clickable pills, dropdowns, modals, etc.)

## Key Changes Required

### 1. New Screening Page (screening.html)
- Replace current eligibility checker with NDIS-specific screening questions
- 5 critical questions:
  1. Looking for NDIS support services? (Yes/No)
  2. Type of support needed (In-home care/Community access/Behaviour support/Supported living/Other)
  3. Current NDIS plan status (Yes - managed/Not yet applying)
  4. Location (VIC/NSW/Other)
  5. Preferred timeframe (Immediately/1-2 weeks/1-2 months/Researching)

### 2. Modify/Replace Intake Form
- Transform existing detailed form into NDIS-specific intake
- Sections: Participant Details, NDIS Information, Support Requirements, Plan Details
- Capture all required NDIS participant information

### 3. Decision Logic Implementation
- JavaScript-based routing based on screening responses
- Suitable prospects → Redirect to full intake form
- Unsuitable prospects → Show polite message with next steps

### 4. QR Code Integration
- QR codes point directly to screening page
- Remove multi-option gateway page for QR code flows
- Maintain gateway as optional entry point

## Benefits
- Filters unqualified prospects before lengthy form completion
- Improves conversion rate by focusing on qualified NDIS participants
- Reduces administrative overhead from ineligible inquiries
- Streamlined user experience with clear qualification criteria
- Maintains technical simplicity while adding business logic

## Considerations
- Need to define qualification criteria for "suitable" responses
- Webhook endpoints will be placeholders that integrate with existing n8n workflow
- Screening and intake forms will be separate pages maintaining current architecture
- Ensure mobile-optimized experience for QR code scanning
- Reuse existing components: clickable pills, dropdowns, modal system, form validation