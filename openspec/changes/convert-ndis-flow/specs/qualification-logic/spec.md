# NDIS Qualification Logic Specification

## ADDED Requirements

### Requirement: Automatic Qualification Assessment
The system SHALL automatically evaluate user responses against qualification criteria without requiring additional user action.

#### Scenario:
- User completes all 5 screening questions
- System automatically evaluates responses without user action
- Qualification rules are applied instantly
- User is immediately routed based on qualification status

### Requirement: Qualification Rules Engine
The system SHALL implement a rules engine that evaluates responses against predefined business qualification criteria.

#### Scenario:
- System evaluates responses against business rules
- REQUIRED qualifications:
  - lookingForNDIS MUST be "Yes"
  - location MUST be "VIC" or "NSW"
  - ndisPlanStatus MUST be "Yes" or "Not yet (still applying)"
- Support type and timeframe do NOT affect qualification
- Rules are configurable via JavaScript object

### Requirement: Qualified User Routing
The system SHALL automatically redirect qualified users to the intake form with their screening data preserved.

#### Scenario:
- User meets all qualification criteria
- System constructs URL with screening parameters
- User is redirected to intake.html with encoded data
- Parameters include: supportType, ndisStatus, location, timeframe
- Redirect happens within 500ms of qualification

### Requirement: Unqualified User Messaging
The system SHALL display a polite message to unqualified users with appropriate next steps.

#### Scenario:
- User does not meet qualification criteria
- User is redirected to thank-you.html
- Page displays polite, encouraging message:
  "Thank you for your enquiry. Once your NDIS plan is approved, we would be happy to provide support. Please contact us anytime."
- Includes contact information for questions
- Option to restart screening if mistake was made

### Requirement: Data Encoding for URL Parameters
The system SHALL encode screening data for secure transmission to the intake form via URL parameters.

#### Scenario:
- System needs to pass screening data to intake form
- Responses are encoded using URL-safe base64
- Data structure includes all 5 screening responses
- Timestamp of screening completion is included
- Data is compressed to minimize URL length

### Requirement: Qualification Edge Cases
The system SHALL handle edge cases in qualification logic, particularly for location responses.

#### Scenario:
- User selects "Other" for location
- System treats "Other" as not qualified (only VIC/NSW supported)
- Clear message explains service area limitations
- User can restart if they made an error

### Requirement: Real-time Validation Feedback
The system SHALL provide subtle visual indicators as users select answers that may affect qualification.

#### Scenario:
- User selects answers that would disqualify them
- System provides subtle visual indicators
- No explicit "You don't qualify" message until completion
- Maintains positive user experience throughout

### Requirement: Debug Mode
The system SHALL provide a debug mode for testing and troubleshooting qualification logic.

#### Scenario:
- Developer needs to test qualification logic
- URL parameter ?debug=true enables debug mode
- Console logs all qualification decisions
- Visual overlay shows rule evaluation
- Can force qualification status for testing

### Requirement: A/B Testing Support
The system SHALL support A/B testing of different qualification rules.

#### Scenario:
- Organization wants to test different qualification rules
- Rules object can be overridden via URL parameters
- Support for percentage-based traffic splitting
- Analytics tracking of qualification rates

### Requirement: Offline Capability
The system SHALL function offline and sync data when connectivity is restored.

#### Scenario:
- User completes screening but loses connection
- Responses are saved to local storage
- Qualification logic runs client-side
- User can proceed to intake form when online
- Data syncs when connection restored

### Requirement: Privacy Compliance
The system SHALL ensure screening data is handled in compliance with privacy requirements.

#### Scenario:
- Screening responses contain personal information
- No PII stored in URL parameters
- Local storage data is encrypted
- Clear data retention policy (7 days)
- Option to clear all data immediately

### Requirement: Performance Optimization
The system SHALL execute qualification logic with optimal performance.

#### Scenario:
- Qualification logic must execute instantly
- Rules evaluation completes in <50ms
- URL encoding completes in <100ms
- No server round-trips required
- Works on low-end mobile devices

### Requirement: Fallback Mechanism
The system SHALL provide a fallback mechanism if JavaScript fails to execute.

#### Scenario:
- JavaScript fails to load or execute
- Default behavior routes all users to intake form
- Server-side validation catches unqualified submissions
- Graceful degradation maintains functionality
- Error tracking identifies JavaScript failures