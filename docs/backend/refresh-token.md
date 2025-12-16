---
id: refresh-token
title: Refresh Token Flow
---

# Refresh Token Flow

Our authentication system uses refresh tokens to provide a secure and seamless user experience. This flow allows the application to maintain a user's session without requiring them to log in repeatedly.

## Token Issuance

When a user successfully logs in, the backend issues two types of tokens:

- **Access Token**: A short-lived token that grants access to protected resources.
- **Refresh Token**: A long-lived token that can be used to obtain a new access token.

The refresh token is stored securely on the client-side, typically in an HTTP-only cookie, to prevent cross-site scripting (XSS) attacks.

## Token Refresh

When the access token expires, the client can request a new access token using the refresh token. This process is as follows:

1. The client sends a request to the `/api/auth/refresh` endpoint with the refresh token.
2. The backend validates the refresh token. If it is valid and has not been revoked, the backend issues a new access token.
3. The client receives the new access token and can use it to access protected resources.

This flow ensures that the user's session remains active without compromising security.
