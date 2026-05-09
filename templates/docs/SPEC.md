# Product Specification

Project: `<PROJECT_NAME>`

Last updated: `<YYYY-MM-DD>`

Owner: `<OWNER_OR_TEAM>`

## Product Overview

`<Describe what the product is, who it serves, and the main value it provides.>`

## Goals

- `<Goal 1>`
- `<Goal 2>`
- `<Goal 3>`

## Users

Primary users:

- `<User type 1>`
- `<User type 2>`

User needs:

- `<Need 1>`
- `<Need 2>`
- `<Need 3>`

## Features

### Core Features

1. `<Feature name>`
   - Description: `<What this feature does>`
   - User value: `<Why it matters>`
   - Priority: `<Must / Should / Could>`

2. `<Feature name>`
   - Description: `<What this feature does>`
   - User value: `<Why it matters>`
   - Priority: `<Must / Should / Could>`

### Supporting Features

- `<Supporting feature>`
- `<Supporting feature>`

## Frontend Requirements

- Framework: `<React/Vue/Svelte/Next/etc.>`
- Styling: `<Tailwind/CSS Modules/SCSS/etc.>`
- Routing: `<Routing approach>`
- State management: `<Client state approach>`
- Server state: `<Query/data-fetching approach>`
- Accessibility requirements:
  - `<Requirement>`
- Responsive requirements:
  - `<Requirement>`
- Key screens:
  - `<Screen name>`: `<Purpose>`
  - `<Screen name>`: `<Purpose>`

## Backend Requirements

- Runtime/framework: `<Node/Express/etc.>`
- Database: `<MongoDB/Postgres/etc.>`
- Authentication: `<Auth approach>`
- Authorization: `<Roles/permissions>`
- Background jobs: `<Needed or not needed>`
- File storage: `<Needed or not needed>`
- Email/notifications: `<Needed or not needed>`
- Logging/monitoring: `<Approach>`

## Infrastructure

- Frontend hosting: `<Platform>`
- Backend hosting: `<Platform>`
- Database hosting: `<Platform>`
- CI/CD: `<Approach>`
- Environments:
  - Local
  - Staging
  - Production
- Required environment variables:
  - `<VARIABLE_NAME>`: `<Purpose>`

## API Expectations

- API style: `<REST/GraphQL/RPC>`
- Base URL strategy: `<Environment variable / gateway / same-origin>`
- Authentication mechanism: `<Cookie/JWT/session/etc.>`
- Error format:

  ```json
  {
    "error": {
      "code": "<ERROR_CODE>",
      "message": "<Human-readable message>"
    }
  }
  ```

- Expected endpoints:
  - `<METHOD> <PATH>`: `<Purpose>`
  - `<METHOD> <PATH>`: `<Purpose>`

## Constraints

- `<Technical constraint>`
- `<Business constraint>`
- `<Timeline constraint>`
- `<Compliance/security constraint>`

## Non-Goals

- `<What this project will not do>`
- `<What is intentionally out of scope>`

## Success Criteria

- `<Measurable outcome>`
- `<Quality bar>`
- `<Performance or reliability target>`
- `<User/business result>`

## Future Improvements

- `<Future feature or improvement>`
- `<Future feature or improvement>`
- `<Future feature or improvement>`
