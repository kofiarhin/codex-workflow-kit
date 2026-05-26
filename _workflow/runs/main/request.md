# Active Request

Date: 2026-05-26

Implement conditional frontend skill routing in this repo.

Use the existing skill file at:
`.skills/design-taste-frontend/SKILL.md`

Keep the current workflow exactly as-is.

Only add this rule:
When a task involves frontend UI code generation, JSX/TSX markup, CSS/Tailwind styling, UI redesign, or UI polish, load/apply `.skills/design-taste-frontend/SKILL.md`.

Do not apply it for backend-only, API-only, database-only, auth-only, test-only, or docs-only tasks.

Requirements:
1. Preserve the existing workflow sequence.
2. Do not create a new default workflow.
3. Do not create a separate taste skill.
4. Record when it is applied with:
   `Applied skill: design-taste-frontend`
5. Add/update tests or fixtures proving:
   - frontend UI task triggers it
   - backend-only task does not
   - mixed frontend/backend task applies it only to frontend UI work
6. Run available checks and report results.
