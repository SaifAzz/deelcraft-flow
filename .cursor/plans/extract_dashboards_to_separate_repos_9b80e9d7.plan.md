---
name: Extract Dashboards to Separate Repos
overview: Extract three dashboards (admin, client, contractor) into separate repositories, create a shared npm package for common code, and clean up the main repository to only contain architecture/documentation pages.
todos:
  - id: create-shared-package
    content: Create mindlinks-shared npm package repository with proper structure, package.json, and TypeScript config
    status: in_progress
  - id: move-shared-code
    content: Move all code from src/shared/ to mindlinks-shared package (components, hooks, services, types, lib, data)
    status: pending
  - id: configure-shared-build
    content: Configure shared package build system (TypeScript compilation, CSS bundling, exports configuration)
    status: pending
  - id: extract-admin-dashboard
    content: Create admin-dashboard repo, move admin code, update imports to use @mindlinks/shared, set up routing
    status: pending
  - id: extract-client-dashboard
    content: Create client-dashboard repo, move client code, update imports to use @mindlinks/shared, set up routing
    status: pending
  - id: extract-contractor-dashboard
    content: Create contractor-dashboard repo, move contractor code, update imports to use @mindlinks/shared, set up routing
    status: pending
  - id: cleanup-main-repo
    content: Remove src/dashboards/ and src/shared/ from main repo, update App.tsx to remove dashboard routes
    status: pending
  - id: test-integration
    content: Test all three dashboards work with shared package, verify imports and styling
    status: pending
---

# Dashboard Extraction Plan

## Overview

Extract three dashboards into separate repositories while creating a shared npm package for common code. The main repository will retain only architecture/documentation pages.

## Repository Structure

Each dashboard and the shared package will be in separate folders (separate git repositories):

```javascript
parent-folder/
├── deelcraft-flow/                # Main repo (architecture pages only)
│   ├── src/pages/                # Keep: architecture/documentation pages
│   └── ... (config files)
│
├── mindlinks-shared/              # NEW: Shared npm package (separate repo)
│   ├── src/
│   │   ├── components/ui/        # All shadcn/ui components
│   │   ├── components/            # MindLinksLogo, HelpGuide, etc.
│   │   ├── hooks/                 # use-theme, use-toast, use-mobile
│   │   ├── services/              # affindaOcrService, aiService
│   │   ├── types/                 # common.ts, flowNode.ts
│   │   ├── lib/                   # utils.ts
│   │   └── data/                  # contractTemplate.ts
│   ├── package.json
│   └── tsconfig.json
│
├── admin-dashboard/              # NEW: Admin dashboard (separate repo)
│   ├── src/
│   │   ├── pages/                # Dashboard.tsx, ClientDetails.tsx
│   │   ├── data/                  # adminData.ts
│   │   └── types/                 # admin.ts
│   ├── package.json
│   └── ... (config files)
│
├── client-dashboard/              # NEW: Client dashboard (separate repo)
│   ├── src/
│   │   ├── pages/                # Dashboard.tsx
│   │   ├── components/           # InviteContractorWizard, OnboardingPage
│   │   ├── data/                 # clientData.ts
│   └── ... (config files)
│
└── contractor-dashboard/          # NEW: Contractor dashboard (separate repo)
    ├── src/
    │   ├── pages/                # Dashboard.tsx
    │   ├── data/                 # contractorData.ts
    └── ... (config files)
```

**Note**: Each folder will be its own git repository with its own `.git` directory.

## Implementation Steps

### Phase 1: Create Shared Package (`mindlinks-shared`)

1. **Create new repository folder and initialize**

- Create `mindlinks-shared/` folder (sibling to `deelcraft-flow/`)
- Initialize git repository: `git init`
- Initialize npm package with `package.json`
- Set up TypeScript configuration
- Configure build output (dist/)

2. **Move shared code from `src/shared/`**

- `components/ui/*` → All shadcn/ui components
- `components/MindLinksLogo.tsx`, `HelpGuide.tsx`, etc.
- `hooks/use-theme.tsx`, `hooks/use-toast.ts`, `hooks/use-mobile.tsx`
- `services/affindaOcrService.ts`, `services/aiService.ts`
- `types/common.ts`, `types/flowNode.ts`, `types/custom-elements.d.ts`
- `lib/utils.ts`
- `data/contractTemplate.ts`

3. **Package configuration**

- Update `package.json` with proper exports
- Configure TypeScript paths for `@mindlinks/shared/*` exports
- Set up build scripts (tsc or vite library mode)
- Include all dependencies from main `package.json`

4. **Styling setup**

- Copy `src/index.css` (CSS variables and Tailwind setup)
- Copy `tailwind.config.ts` (with shared theme)
- Ensure CSS is bundled or exported properly

### Phase 2: Extract Admin Dashboard

1. **Create repository folder and initialize**

- Create `admin-dashboard/` folder (sibling to `deelcraft-flow/`)
- Initialize git repository: `git init`
- Initialize Vite + React + TypeScript project
- Copy Vite config, Tailwind config, tsconfig from main repo

2. **Move dashboard-specific code**

- `src/dashboards/admin/pages/*` → `src/pages/`
- `src/dashboards/admin/data/*` → `src/data/`
- `src/dashboards/admin/types/*` → `src/types/`

3. **Update imports**

- Replace `@/shared/*` with `@mindlinks/shared/*`
- Update path aliases in `tsconfig.json` and `vite.config.ts`
- Remove `@/shared` path mapping

4. **Create App.tsx and routing**

- Set up React Router with dashboard routes
- Add QueryClient provider
- Add theme provider and toast providers

5. **Update package.json**

- Add `@mindlinks/shared` as dependency (local path initially)
- Include all React dependencies
- Set up scripts for dev/build

### Phase 3: Extract Client Dashboard

1. **Create repository folder and initialize**

- Create `client-dashboard/` folder (sibling to `deelcraft-flow/`)
- Initialize git repository: `git init`
- Same structure as Admin Dashboard
- Move `src/dashboards/client/*` to new repo
- Update imports to use `@mindlinks/shared`
- Set up routing and providers

### Phase 4: Extract Contractor Dashboard

1. **Create repository folder and initialize**

- Create `contractor-dashboard/` folder (sibling to `deelcraft-flow/`)
- Initialize git repository: `git init`
- Same structure as Admin Dashboard
- Move `src/dashboards/contractor/*` to new repo
- Update imports to use `@mindlinks/shared`
- Set up routing and providers

### Phase 5: Clean Up Main Repository

1. **Remove dashboard code**

- Delete `src/dashboards/` directory
- Delete `src/shared/` directory (moved to package)

2. **Update App.tsx**

- Remove dashboard route imports
- Remove dashboard routes from `<Routes>`
- Keep only architecture/documentation page routes

3. **Update dependencies**

- Remove dashboard-specific dependencies if not used by remaining pages
- Keep shared dependencies if architecture pages use them

4. **Update path aliases**

- Remove `@/shared` if no longer needed
- Update imports in remaining pages if they used shared code

## Files to Move/Copy

### To `mindlinks-shared` package:

- `src/shared/components/ui/*` (all UI components)
- `src/shared/components/MindLinksLogo.tsx`
- `src/shared/components/HelpGuide.tsx`
- `src/shared/hooks/*`
- `src/shared/services/*`
- `src/shared/types/*`
- `src/shared/lib/utils.ts`
- `src/shared/data/contractTemplate.ts`
- `src/index.css` (CSS variables)
- `tailwind.config.ts` (for reference/export)

### To each dashboard repo:

- Respective `src/dashboards/{admin|client|contractor}/*` contents
- `package.json` (with dependencies)
- `vite.config.ts` (updated paths)
- `tsconfig.json` (updated paths)
- `tailwind.config.ts` (dashboard-specific if needed)
- `index.html`
- `src/index.css` (import shared styles)
- `src/main.tsx` (entry point)

### Keep in main repo:

- `src/pages/*` (architecture/documentation pages)
- `src/App.tsx` (updated routes)
- All config files (may need cleanup)

## Configuration Updates Needed

### Shared Package (`mindlinks-shared/package.json`):

```json
{
  "name": "@mindlinks/shared",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    "./components/ui/*": "./dist/components/ui/*",
    "./hooks/*": "./dist/hooks/*",
    "./services/*": "./dist/services/*",
    "./types/*": "./dist/types/*",
    "./lib/*": "./dist/lib/*",
    "./styles": "./dist/styles.css"
  }
}
```



### Each Dashboard (`vite.config.ts`):

- Update path alias: `"@mindlinks/shared": path.resolve(__dirname, "../mindlinks-shared/dist")`
- Or use npm link/local path during development
- **Note**: Since repos are siblings, use relative path `../mindlinks-shared/dist` for local development

### Each Dashboard (`tsconfig.json`):

- Add path mapping for `@mindlinks/shared/*`
- Remove `@/shared` mapping

## Dependencies Strategy

### Shared Package needs:

- All `@radix-ui/*` packages
- `class-variance-authority`, `clsx`, `tailwind-merge`
- `lucide-react`
- `next-themes` (for theme hook)
- `sonner` (for toast)
- React/React-DOM (peer dependencies)

### Each Dashboard needs:

- React, React-DOM
- React Router
- TanStack Query
- Framer Motion
- All other dashboard-specific dependencies
- `@mindlinks/shared` (as dependency)

## Development Workflow

1. **Local development**: 

- Use relative path in package.json: `"@mindlinks/shared": "file:../mindlinks-shared"`
- Or use `npm link` for more flexible development
- Build shared package first: `cd mindlinks-shared && npm run build`
- Then work on dashboards: `cd admin-dashboard && npm run dev`

2. **Publishing**: 

- Publish shared package to npm (private or public registry)
- Update dashboard package.json to use published version

3. **CI/CD**: 

- Each dashboard repo has its own build/deploy pipeline
- Shared package can be published separately or included as dependency

## Migration Checklist

- [ ] Create `mindlinks-shared` repository and package structure
- [ ] Move all shared code to package
- [ ] Configure package exports and build
- [ ] Create `admin-dashboard` repository
- [ ] Move admin code and update imports
- [ ] Create `client-dashboard` repository
- [ ] Move client code and update imports
- [ ] Create `contractor-dashboard` repository
- [ ] Move contractor code and update imports
- [ ] Remove dashboards from main repo
- [ ] Update main repo App.tsx routes
- [ ] Test all three dashboards independently