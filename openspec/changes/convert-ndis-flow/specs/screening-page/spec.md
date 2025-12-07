# NDIS Screening Page Specification

## ADDED Requirements

### Requirement: QR Code Entry Point
The system SHALL provide a direct entry point for users scanning QR codes that leads immediately to the screening questionnaire.

#### Scenario:
- User scans QR code on brochure/flyer/poster
- User is directed directly to screening page
- Page loads quickly on mobile device
- All content is immediately visible without scrolling

### Requirement: Screening Questionnaire
The system SHALL present 5 screening questions in a clean, mobile-friendly layout with large tappable answer options.

#### Scenario:
- User sees 5 screening questions in a clean, mobile-friendly layout
- Questions are presented one at a time or in a compact form
- Each question has clear, simple answer options
- User can easily tap to select answers

### Requirement: NDIS Support Inquiry
The system SHALL ask if the user is looking for NDIS support services with a simple Yes/No selection.

#### Scenario:
- Question: "Are you looking for NDIS support services?"
- User selects between "Yes" and "No"
- Selection is made via large radio buttons or toggle switches
- Visual feedback shows selection clearly

### Requirement: Support Type Selection
The system SHALL present options for different types of NDIS support services that users may need.

#### Scenario:
- Question: "What type of support do you need?"
- User sees options: "In-home personal care", "Community access / skill building",
  "Behaviour support", "Supported independent living", "Other"
- Options are presented as large, tappable buttons
- If "Other" selected, optional text field appears

### Requirement: NDIS Plan Status
The system SHALL inquire about the user's current NDIS plan status to determine eligibility.

#### Scenario:
- Question: "Do you currently have an NDIS plan?"
- User selects: "Yes (Self, Plan, NDIA managed)" or "Not yet (still applying)"
- If "Yes" selected, follow-up appears for plan management type
- User can specify if Self-managed, Plan-managed, or NDIA-managed

### Requirement: Location Verification
The system SHALL verify the user's location to ensure they are within the service area.

#### Scenario:
- Question: "Where are you located?"
- User selects from: "VIC", "NSW", "Other"
- Selection made via large, geographic buttons
- If "Other" selected, user can enter state/territory

### Requirement: Timeframe Preference
The system SHALL ask about the user's preferred timeframe for beginning services to help with prioritization.

#### Scenario:
- Question: "Preferred timeframe to begin services"
- User selects: "Immediately", "1-2 weeks", "1-2 months", "Just researching"
- Answer doesn't affect qualification but helps with prioritization

### Requirement: Qualification Logic
The system SHALL automatically evaluate user responses to determine if they qualify for NDIS services.

#### Scenario:
- User completes all screening questions
- System automatically evaluates responses
- If qualified (looking for NDIS, in VIC/NSW): User progresses to intake form
- If not qualified: User sees polite message with next steps

### Requirement: Mobile Optimization
The system SHALL be fully optimized for mobile devices with large touch targets and responsive design.

#### Scenario:
- User accesses screening page via phone after scanning QR code
- All text is readable without zooming
- Touch targets are at least 44px
- Form fits within viewport without horizontal scrolling
- Loading time is under 3 seconds on 3G network

### Requirement: Progress Indicator
The system SHALL provide visual feedback on the user's progress through the screening questions.

#### Scenario:
- User is completing screening questions
- Visual indicator shows progress (e.g., 3 of 5 questions answered)
- User can see remaining questions at a glance
- Progress bar updates in real-time as answers are selected

### Requirement: Data Persistence
The system SHALL save screening responses and pass them to the intake form for qualified users.

#### Scenario:
- User completes screening and qualifies for intake
- Screening responses are saved to session storage
- Data is passed to intake form via URL parameters
- Responses are included in final submission to webhook

### Requirement: Error Handling
The system SHALL validate that all questions are answered before allowing submission.

#### Scenario:
- User tries to submit incomplete screening
- System highlights missing questions
- Clear error message appears above incomplete question
- User cannot proceed until all questions are answered

### Requirement: Brand Consistency
The system SHALL maintain consistent ClinicIQ branding throughout the screening experience.

#### Scenario:
- User views screening page
- ClinicIQ logo and branding are prominently displayed
- Colors, fonts, and styling match existing application
- Professional healthcare appearance is maintained