# SBI Network

SBI Network connects student-led chapters with local small businesses for free
digital services, while giving future chapter leaders a clear path to launch
their own chapter.

## Requirements

- Node.js 20 or newer
- pnpm 10 or newer

## Local setup

```bash
pnpm install
pnpm --filter @workspace/sbi-network run dev
```

The website runs through the Vite development server. To run the optional API
server used by the Ask SBI concierge in a second terminal:

```bash
pnpm --filter @workspace/api-server run dev
```

The API server needs the Replit-managed OpenAI integration environment
variables when the concierge is enabled. Keep those values in local
environment configuration; never commit them.

## Useful commands

```bash
pnpm run typecheck
pnpm run build
pnpm --filter @workspace/sbi-network run build
```

The public-facing React + Vite site lives in `artifacts/sbi-network`. Shared API
packages are in `lib/`, and the optional Express API is in
`artifacts/api-server`.

## Public repository checklist

Before changing the GitHub repository to public:

1. Confirm the current branch contains no credentials, environment files,
   private contact data, or unapproved media.
2. Review the complete Git history and remove any sensitive content with a
   history rewrite before publishing.
3. Rotate any credential that may ever have been committed, even if it was
   later deleted.
4. Confirm team portraits, forms, contact details, and other public-facing
   content have the required approval.
5. Change the repository visibility in GitHub only after the checks above pass.