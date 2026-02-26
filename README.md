**Decepti Bank UI**
*Interactive Multi-Page Banking Simulation with MFA & Risk Detection*

This project is built for cybersecurity awareness, frontend logic simulation, and authentication workflow demonstration.

## Login System
- Username & Password authentication
- Session-based login handling using sessionStorage
- Automatic redirect protection using requireLogin()

## Multi-Factor Authentication (MFA)
- Popup-based OTP verification
- MFA step enforced before dashboard access
- Simulates real banking authentication layer

## Multi-page Navigation
After login:
- Dashboard
- Accounts
- Transfers
- Statements
- Update Account
- Logout
All pages are protected using session validation.

## Risk Scoring System
- Each sensitive input field contains a data-risk="high" attribute
- JavaScript calculates cumulative risk score
- Risk is stored in sessionStorage
- Final suspicious activity popup displays: Total risk and Security alert warning

## Automated Flow-Control
- Login → MFA → Dashboard → Accounts → Transfers → Statements
- Loading spinner during redirection
- Logout clears session and resets state

## Technologies Used
- HTML5
- CSS3
- Vanilla Javascript
- Browser sessionStorage
- DOM manipulation
- Event-driven navigation
- No backend (frontend simulation alone)

## Security Simulation Concepts Demonstrated
- Authentication flow control
- Session validation
- Multi-step verification
- Risk scoring logic
- Sensitive data monitoring
- Suspicious behavior detection
- Redirect protection
- Secure logout handling
