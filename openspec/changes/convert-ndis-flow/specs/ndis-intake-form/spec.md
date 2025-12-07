# NDIS Intake Form Specification

## MODIFIED Requirements

### Requirement: Participant Details Section
The system SHALL provide a form section to capture NDIS participant details including NDIS number, name, date of birth, contact information, and address.

#### Scenario:
- User arrives from qualified screening
- Form pre-fills any available data from screening
- User completes participant details:
  - NDIS Number (required)
  - First Name (required)
  - Surname (required)
  - Date of Birth (required, date picker)
  - Preferred Language (dropdown with common options)
  - Home Address (required, multi-line or address lookup)
  - Email (required, validated)
  - Contact Number (required, validated for Australian format)

### Requirement: Disability Information
The system SHALL provide fields for collecting disability-related information including diagnosis, behavior support plans, personal care needs, and mobility requirements.

#### Scenario:
- User provides disability and support needs information
- Fields include:
  - Primary Diagnosis/Disability (required, text area)
  - Behaviour Support Plan (Yes/No radio buttons)
  - If Yes: Upload or describe current plan (optional)
  - Personal Care Needs (checkboxes: showering, dressing, toileting, meals, mobility)
  - Mobility Requirements (select: independent, walking aid, wheelchair, other)

### Requirement: NDIS Plan Details
The system SHALL capture NDIS plan information including management type, funding amounts, and support coordinator details.

#### Scenario:
- User provides NDIS plan information
- Fields include:
  - Plan Management Type (Self-managed, Plan-managed, NDIA-managed - required)
  - Plan Start Date (date picker)
  - Plan End Date (date picker)
  - Core Funding Amount (optional, numeric)
  - Capacity Building Funding (optional, numeric)
  - Support Coordinator Name/Contact (optional)

### Requirement: Support Person/Guardian Details
The system SHALL collect emergency contact and guardian information for participants who require support person details.

#### Scenario:
- User provides emergency/support contact information
- If participant is under 18 or requires guardian:
  - Guardian Name (required if applicable)
  - Relationship (select: Parent, Guardian, Other)
  - Guardian Phone (required if applicable)
  - Guardian Email (optional)

### Requirement: Service Preferences
The system SHALL capture user preferences for service delivery including start date, frequency, timing, and special requirements.

#### Scenario:
- User specifies service requirements
- Fields include:
  - Preferred Start Date (date picker, required)
  - Service Frequency (select: one-time, weekly, fortnightly, monthly, as needed)
  - Preferred Service Times (checkboxes: morning, afternoon, evening, weekends)
  - Support Worker Preferences (optional, text area for gender, language, etc.)
  - Special Requirements (optional, text area for medical needs, equipment, etc.)

### Requirement: Pre-fill from Screening Data
The system SHALL automatically populate intake form fields with data collected during the screening phase.

#### Scenario:
- User arrives from screening with qualified responses
- System automatically populates:
  - Support Type (from screening question 2)
  - Location (from screening question 4)
  - Timeframe Preference (from screening question 5)
  - NDIS Plan Status (from screening question 3)
- User can modify these values if needed

### Requirement: Form Validation
The system SHALL validate all required fields and provide clear error messages for invalid inputs.

#### Scenario:
- User attempts to submit incomplete form
- System validates all required fields
- Shows inline error messages for invalid inputs
- Prevents submission until all errors are resolved
- Specific validation for:
  - Email format
  - Australian phone format
  - NDIS number format (9 digits)
  - Future date for preferred start date

### Requirement: Mobile-Friendly Layout
The system SHALL provide an optimized mobile experience with collapsible sections and large touch targets.

#### Scenario:
- User completes form on mobile device
- Sections are collapsible for easier navigation
- Fixed header shows current section
- Large touch targets for all inputs
- Numeric keypad appears for phone/NDIS number fields
- Date picker is mobile-optimized

### Requirement: Save and Resume
The system SHALL allow users to save their progress and resume form completion later.

#### Scenario:
- User partially completes form but needs to leave
- System auto-saves progress to local storage
- Clear "Save Progress" button available
- User can resume from where they left out
- Data persists for 7 days

### Requirement: Submission Processing
The system SHALL process completed forms and display confirmation messages with next steps.

#### Scenario:
- User submits completed form
- System shows loading spinner
- Combines screening and intake data
- Submits to webhook with structured payload
- Shows success message with next steps
- Sends confirmation email (if email provided)

### Requirement: Error Recovery
The system SHALL handle submission failures gracefully with retry mechanisms and clear user guidance.

#### Scenario:
- Submission fails due to network issues
- System retries automatically up to 3 times
- If all retries fail, offers to save locally
- Provides instructions to contact support
- Allows user to try again manually

### Requirement: Data Structure
The system SHALL structure form data for webhook submission in a standardized format.

#### Scenario:
- System prepares data for webhook submission
- Payload includes:
  ```json
  {
    "screening": { /* all screening responses */ },
    "participant": { /* all participant details */ },
    "disability": { /* disability information */ },
    "plan": { /* NDIS plan details */ },
    "support": { /* support preferences */ },
    "timestamp": "2024-01-01T12:00:00+11:00",
    "source": "ndis_intake_form"
  }
  ```

### Requirement: Accessibility Compliance
The system SHALL meet WCAG 2.1 AA accessibility standards for users with assistive technologies.

#### Scenario:
- User with assistive technology completes form
- All form controls have proper labels
- Error messages are announced by screen readers
- Keyboard navigation works throughout form
- High contrast mode is supported
- Form works without JavaScript (basic functionality)