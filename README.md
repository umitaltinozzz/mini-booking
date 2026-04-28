# Mini Randevu

**Multi-tenant appointment, booking, and business dashboard experience for service businesses.**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![next-intl](https://img.shields.io/badge/next--intl-i18n-000000?style=for-the-badge)](https://next-intl.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-3D-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)]()

---

## Overview

Mini Randevu is a modern appointment platform interface for small and medium service businesses such as barbershops, salons, restaurants, clinics, and similar reservation-based teams.

The repository currently focuses on a polished **Next.js frontend** with localized marketing pages, tenant-scoped booking flows, admin screens, staff dashboards, mock data, and reusable scheduling UI primitives.

Live demo: [https://minirandevu.up.railway.app](https://minirandevu.up.railway.app)

Default locale is Turkish under `/tr`. English pages are available under `/en`.

## Project Status

Active portfolio build / product prototype. The public repository focuses on the frontend product experience, booking flows, and dashboard structure; backend or commercial deployment work may remain private when needed.

## Features

- **Multi-tenant booking flows** - Tenant-specific appointment pages and sector-aware demo experiences
- **Admin dashboard** - Tenant management, plans, logs, demo requests, and settings screens
- **Staff workspace** - Staff dashboard, appointments, availability, profile, schedule, and settings routes
- **Localized experience** - Turkish and English routing powered by `next-intl`
- **Scheduling core** - Slot engine, appointment selectors, tenant data, and role-based permission helpers
- **Modern interface** - Tailwind CSS, Framer Motion, lucide icons, Sonner toasts, and responsive UI components
- **3D and motion visuals** - Three.js and React Three Fiber scenes for interactive marketing sections
- **Mock-first product demo** - Demo credentials and seeded data for presenting flows before backend integration

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router, React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Forms & Validation | react-hook-form, Zod |
| Internationalization | next-intl |
| Motion | Framer Motion |
| 3D | Three.js, React Three Fiber, Drei |
| UI Utilities | lucide-react, clsx, tailwind-merge, Sonner |
| Package Manager | pnpm workspace |

## Getting Started

```bash
pnpm install
cd frontend
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

You can also run the frontend with npm:

```bash
cd frontend
npm install
npm run dev
```

| Command | Description |
|---|---|
| `pnpm dev` | Start the local development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Run the production server |
| `pnpm lint` | Run ESLint |

## Environment

No required `process.env` variables are needed for the current frontend-only local demo.

If you add authentication, payments, analytics, or API integrations, create a local `.env.local` file and document every required variable in an `.env.example` file. Never commit secrets.

## Demo Notes

The current app includes mock data and hard-coded demo helpers for UI presentation. These values are not production credentials.

Before using this project in production:

- Replace mock authentication with a real auth backend
- Connect booking, tenant, staff, and admin flows to real APIs
- Remove or gate demo quick-fill helpers behind development-only checks
- Review `sitemap.ts`, `robots.ts`, and canonical production URLs
- Confirm no `.env`, `.env.local`, or private credentials are committed

## Project Structure

```text
minirandevu/
|-- frontend/
|   |-- src/app/[locale]/          # Localized App Router pages
|   |-- src/components/            # Marketing, dashboard, booking, UI, and 3D components
|   |-- src/core/                  # Scheduling, appointments, and RBAC helpers
|   |-- src/data/                  # Mock product, tenant, admin, and demo data
|   |-- src/i18n/                  # next-intl routing and request config
|   `-- src/types/                 # Shared TypeScript types
|-- backend/                       # Workspace package, if enabled locally
|-- docs/                          # Project documentation, if present locally
|-- package.json                   # Workspace root
|-- pnpm-workspace.yaml
`-- LICENSE
```

## Repository Notes

This repository is configured as a pnpm workspace with `frontend` and `backend` packages. The frontend is the active published surface in the current codebase.

Some local folders may be excluded by `.gitignore`. Review the ignore rules before publishing a full monorepo snapshot.

## Contributing

1. Fork the repository and create a focused feature branch.
2. Install dependencies with `pnpm install`.
3. Run `pnpm lint` from `frontend` before opening a pull request.
4. Keep UI, data, and routing changes aligned with the existing App Router structure.

## License

[MIT License](./LICENSE) - see the license file for details.
