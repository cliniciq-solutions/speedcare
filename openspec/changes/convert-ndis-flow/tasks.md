# Implementation Tasks - NDIS Screening Flow

## Phase 1: Setup and Foundation

### 1. Create New HTML Pages
- [ ] Create `screening.html` based on existing form templates
- [ ] Create `thank-you.html` for unqualified prospects
- [ ] Copy existing CSS and JavaScript patterns
- [ ] Add responsive design for mobile-first QR code flow
- [ ] Ensure consistent ClinicIQ branding across all pages

### 2. Refactor Intake Form
- [ ] Duplicate `eligibility.html` to `intake.html`
- [ ] Remove bulk bill service fields
- [ ] Add NDIS-specific fields (NDIS number, plan details, etc.)
- [ ] Reorganize form into logical sections
- [ ] Implement collapsible sections for mobile

### 3. Update Navigation
- [ ] Modify `index.html` to include NDIS screening option
- [ ] Add back button to screening page linking to gateway
- [ ] Update banner component links if needed
- [ ] Ensure proper navigation flow between pages

## Phase 2: Screening Implementation

### 4. Build Screening Questions UI
- [ ] Implement 5 screening questions with large touch targets
- [ ] Create radio button component for Yes/No questions
- [ ] Build button group for multiple choice questions
- [ ] Add conditional "Other" text field where applicable
- [ ] Style question groups for clarity and accessibility

### 5. Add Progress Indicator
- [ ] Create progress bar component
- [ ] Update progress as questions are answered
- [ ] Show "Step X of Y" indicator
- [ ] Add animations for smooth transitions

### 6. Implement Form Validation
- [ ] Add required field validation
- [ ] Show inline error messages
- [ ] Prevent submission with incomplete answers
- [ ] Style error states for accessibility
- [ ] Test validation on various devices

## Phase 3: Decision Logic

### 7. Build Qualification Engine
- [ ] Create qualification rules object
- [ ] Implement rule evaluation function
- [ ] Add debug mode for testing
- [ ] Create unit tests for edge cases
- [ ] Document rule configuration

### 8. Implement Routing Logic
- [ ] Build URL parameter encoding function
- [ ] Create redirect mechanism for qualified users
- [ ] Build thank-you page for unqualified users
- [ ] Add data persistence to local storage
- [ ] Test all routing scenarios

### 9. Data Persistence Layer
- [ ] Implement session storage for screening data
- [ ] Add local storage for save/resume functionality
- [ ] Create data encryption for privacy
- [ ] Build data cleanup mechanism (7-day retention)
- [ ] Test persistence across browser sessions

## Phase 4: Intake Form Enhancement

### 10. Pre-fill Screening Data
- [ ] Parse URL parameters from screening
- [ ] Auto-populate relevant intake fields
- [ ] Allow modification of pre-filled data
- [ ] Highlight pre-filled sections
- [ ] Handle edge cases for missing data

### 11. Enhanced Form Validation
- [ ] Add NDIS number format validation (9 digits)
- [ ] Implement Australian phone number validation
- [ ] Add email format checking
- [ ] Validate date inputs (DOB, start dates)
- [ ] Show real-time validation feedback

### 12. Form Sections and UX
- [ ] Create collapsible form sections
- [ ] Add sticky section navigation
- [ ] Implement auto-save functionality
- [ ] Build "Save Progress" button
- [ ] Add keyboard navigation support

## Phase 5: Backend Integration

### 13. Update Webhook Payload
- [ ] Modify payload structure to include screening data
- [ ] Maintain n8n workflow compatibility
- [ ] Add source tracking (QR code vs direct)
- [ ] Implement same retry logic as existing forms
- [ ] Add error handling matching current implementation
- [ ] Use placeholder endpoints for SCREENING_WEBHOOK_URL and INTAKE_WEBHOOK_URL

### 14. Test Webhook Integration
- [ ] Create test webhook endpoint
- [ ] Verify data structure and encoding
- [ ] Test with various qualification scenarios
- [ ] Validate NDIS-specific fields
- [ ] Check payload size limits

### 15. Error Handling Enhancement
- [ ] Build network error detection
- [ ] Implement offline queue for submissions
- [ ] Add user-friendly error messages
- [ ] Create retry mechanism with exponential backoff
- [ ] Log errors for debugging

## Phase 6: Testing and Optimization

### 16. Mobile Testing
- [ ] Test QR code scanning on iOS/Android
- [ ] Verify form usability on small screens
- [ ] Check touch target sizes (44px minimum)
- [ ] Test on various network speeds (3G, 4G, WiFi)
- [ ] Validate no horizontal scrolling

### 17. Accessibility Testing
- [ ] Test with screen readers (NVDA, VoiceOver)
- [ ] Verify keyboard navigation
- [ ] Check color contrast ratios
- [ ] Test high contrast mode
- [ ] Validate with accessibility tools

### 18. Performance Optimization
- [ ] Optimize images for faster loading
- [ ] Minimize JavaScript bundle size
- [ ] Enable gzip compression
- [ ] Implement lazy loading where applicable
- [ ] Target <3s load time on 3G

### 19. Cross-Browser Testing
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Verify functionality on older browsers
- [ ] Check polyfill requirements
- [ ] Test on iOS Safari and Android Chrome
- [ ] Validate form submission across browsers

## Phase 7: Deployment and Monitoring

### 20. Prepare for Deployment
- [ ] Update Netlify configuration if needed
- [ ] Set up environment variables for new features
- [ ] Create deployment checklist
- [ ] Plan rollback strategy
- [ ] Document migration steps

### 21. Analytics Integration
- [ ] Add tracking for screening completion rate
- [ ] Monitor qualification ratio
- [ ] Track form abandonment points
- [ ] Measure QR code conversion
- [ ] Set up alerts for unusual activity

### 22. User Acceptance Testing
- [ ] Test with actual NDIS participants
- [ ] Gather feedback on form length
- [ ] Validate clarity of questions
- [ ] Check qualification logic accuracy
- [ ] Test complete user flow

## Dependencies

- Must complete Phase 1 before starting Phase 2
- Decision logic (Phase 3) depends on screening UI (Phase 2)
- Backend integration (Phase 5) requires completed frontend changes
- Testing (Phase 6) runs in parallel with deployment prep (Phase 7)

## Estimated Timeline

- Phase 1: 2 days
- Phase 2: 3 days
- Phase 3: 2 days
- Phase 4: 4 days
- Phase 5: 2 days
- Phase 6: 3 days
- Phase 7: 2 days

Total: ~18 business days