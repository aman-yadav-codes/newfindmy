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
