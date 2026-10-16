---
trigger: model_decision
description: Apply when organizing new features or creating, moving, styling, or refactoring shared, custom, feature, or Glass UI components.
---

# Custom and Shared Component Architecture

Create a dedicated structure for project-owned components that need customization beyond the default Crenspire Glass UI library.

### Folder Structure
```text
src/
  components/
    ui/        # Existing or library-provided base components (Crenspire Glass UI)
    shared/    # Reusable, project-wide components
    custom/    # Project-specific customized components
  features/    # Feature-specific components and business logic
```

### Component Ownership Rules
1. **Library components**: Use Crenspire Glass UI directly when its default behavior and appearance meet requirements.
2. **Shared components**: Place reusable components used across multiple pages or features in `components/shared/`.
3. **Custom components**: Place components that require project-specific appearance, behavior, layout, or customization in `components/custom/`.
4. **Feature components**: Keep components used only by one feature inside that feature's directory instead of making them globally shared.

### Customization Requirements
- Do not modify or copy the entire Crenspire library into the project.
- Prefer composition and documented props over duplicating library implementations.
- Wrap library components when project-specific defaults or behavior need to be applied consistently.
- Keep custom styling in the appropriate component stylesheet, CSS module, or existing styling system.
- Centralize reusable design tokens such as glass variants, blur levels, radii, shadows, spacing, and colors when appropriate.
- Allow components to accept typed props for supported customization.
- Preserve accessibility, responsive behavior, and keyboard interactions.
- Avoid unnecessary wrapper layers when the original component already supports the required customization.

### Shared Component Standards
- Keep each component focused on one responsibility.
- Prefer fewer than 300 lines where practical.
- Review files approaching 400 lines for possible decomposition.
- Do not exceed 500 lines without a documented justification.
- Extract genuinely reusable hooks, types, constants, and utilities when beneficial.
- Avoid duplicated business logic, oversized prop interfaces, deeply nested conditionals, and excessive component fragmentation.
- Maintain backward compatibility when refactoring existing components.
- Update imports and tests when moving or extracting components.

### Feature Organization as the Product Grows

- Keep `src/app/` responsible for routes, layouts, metadata, and HTTP entry points. Put business rules and data access in server-only modules close to the feature that owns them; do not bury them in page or component files.
- Co-locate a feature's UI, server-side operations, validation, and types under `src/features/<feature>/` when the feature actually needs them. Move code to `components/shared/` or `src/lib/` only after it is reused across features.
- Import server-only code only into Server Components, Server Actions, or Route Handlers. Pass Client Components the minimum serializable, authorized data they need.
- Keep boundaries explicit and dependency direction simple: route → feature service/data access → external service or database. Avoid route-to-route HTTP calls and circular feature imports.
- Add folders, interfaces, services, and abstractions when a real feature needs them. Do not scaffold RBAC, repositories, API layers, or configuration for hypothetical future use.
