# Design Decisions - NDIS Screening Flow

## Architecture Overview

### Single Page Application Flow
```
QR Code → screening.html → decision logic → intake.html (if qualified)
                                    → thank-you.html (if not qualified)
```

### Key Architectural Decisions

#### 1. Page Structure Decision
**Approach**: Separate screening and intake pages (vs. single-page flow)

**Rationale**:
- Maintains current technical simplicity
- Allows focused attention on each step
- Better for form abandonment tracking
- Easier to maintain and debug
- Supports bookmarking/sharing of specific steps

**Trade-offs**:
- Additional page load between screening and intake
- More files to maintain

#### 2. Data Persistence Strategy
**Approach**: Pass screening data via URL parameters to intake form

**Rationale**:
- No server-side state management required
- Preserves screening responses for final submission
- Maintains stateless architecture
- Transparent data flow for debugging

**Implementation**:
- Encode screening responses as query parameters
- Decode on intake page load
- Pre-fill relevant fields in intake form
- Include screening data in final submission

#### 3. Qualification Logic
**Decision**: Client-side qualification rules

**Qualification Criteria**:
```javascript
// Must be looking for NDIS support
if (answers.lookingForNDIS !== 'Yes') -> NOT QUALIFIED

// Must have or be actively applying for NDIS plan
if (answers.ndisPlanStatus === 'Not yet (still applying)') -> QUALIFIED
if (answers.ndisPlanStatus === 'Yes') -> QUALIFIED
// (Any "No" answer would be NOT QUALIFIED, but this isn't an option in the flow)

// Must be in service area (VIC or NSW)
if (answers.location === 'Other') -> NOT QUALIFIED

// Timeframe doesn't affect qualification
```

#### 4. Form Design Pattern
**Approach**: Maintain existing styling and component patterns

**Benefits**:
- Consistent brand experience
- Reuse of existing CSS/JS patterns
- Faster implementation
- Proven responsive design

**Modifications Needed**:
- New question types (radio buttons, dropdowns)
- Progress indicator for multi-step form
- Conditional logic handling
- Enhanced validation for NDIS-specific fields

#### 5. Error Handling Strategy
**Approach**: Graceful degradation with clear messaging

**Scenarios**:
- Webhook unavailable: Store locally with retry mechanism
- Partial data completion: Save progress with session storage
- Invalid responses: Client-side validation before submission
- Network issues: Clear retry instructions

#### 6. Mobile Optimization Considerations
**Critical for QR Code Flow**:

- Large touch targets (44px minimum)
- Thumb-friendly navigation
- Minimal scrolling on screening page
- Fast loading times (<3s on 3G)
- Readable font sizes without zooming
- Simplified input methods (radio > dropdown for mobile)

### Technical Specifications

#### File Structure Changes
```
Current:
├── index.html (Gateway)
├── eligibility.html (To be replaced)
└── survey.html (To be replaced)

New:
├── index.html (Optional gateway)
├── screening.html (New - Layer 1)
├── intake.html (Modified from eligibility.html)
└── thank-you.html (New - for unqualified prospects)
```

#### Data Flow Architecture
```
Screening Form → Validation → Qualification Check → Route Decision
                                        ↓
                               URL Parameters + Intake Form → Final Submission → Webhook
```

#### Webhook Payload Structure
```javascript
{
  // Screening responses
  "screening": {
    "lookingForNDIS": "Yes",
    "supportType": "In-home personal care",
    "ndisPlanStatus": "Yes (Self-managed)",
    "location": "VIC",
    "timeframe": "Immediately"
  },

  // Intake form data (if qualified)
  "participant": {
    "ndisNumber": "123456789",
    "firstName": "John",
    "surname": "Doe",
    "dob": "1990-01-01",
    // ... other participant details
  },

  "timestamp": "2024-01-01T12:00:00+11:00",
  "source": "qr_code",
  "formType": "ndis_intake"
}
```

#### Backend Integration
- Maintain same n8n workflow integration pattern
- Use placeholder endpoints: `SCREENING_WEBHOOK_URL` and `INTAKE_WEBHOOK_URL`
- Follow existing configuration loading pattern via `/api/config`
- Use same error handling and retry logic as current implementation

## Implementation Considerations

### Performance
- Lazy load intake form only for qualified users
- Compress/optimize images for faster loading
- Minimize external dependencies
- Use local storage for offline capability

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Clear error messaging

### Security
- No sensitive data in URL parameters
- Input sanitization on all fields
- HTTPS enforcement
- Rate limiting on webhook submissions

### Analytics Integration
- Track screening completion rate
- Monitor qualification ratio
- Measure form abandonment points
- QR code scan attribution