# Rendering Strategy, SSR and API Latency Optimization

Use the optimal Next.js 16 App Router rendering strategy for every route and component. The objective is fast initial rendering, minimal client-side JavaScript, low data-fetching latency, and correct, fresh data.

### A. Choose the Correct Rendering Strategy
1. **Server Components by Default**:
   - Fetch data on the server when it is required to render the initial page.
   - Keep components server-rendered unless client-side interactivity is necessary.
   - Avoid fetching initial page data from `useEffect` after the page loads.
2. **SSR for Request-Dependent Content**:
   - Use server-side rendering when content depends on the current request, authenticated user, cookies, permissions, or other request-specific data.
   - Render the required content on the server before sending the response.
   - Avoid unnecessarily forcing every route into dynamic rendering.
3. **Static Rendering and Prerendering**:
   - Prefer static generation for public pages whose content can safely be generated ahead of time.
   - Use `generateStaticParams` where appropriate for known dynamic routes.
   - Use revalidation when content changes periodically but does not need to be fresh on every request.
4. **Streaming and Suspense**:
   - Use `Suspense` and streaming when independent page sections can render progressively.
   - Render important page content as early as possible.
   - Avoid blocking the entire page on a slow, noncritical API.
   - Provide appropriate loading states without causing layout shifts.

### B. Eliminate Unnecessary API Waiting
- Fetch data directly from its underlying database or service within Server Components when appropriate, rather than making an HTTP request from the server to the application's own API route.
- Reuse existing service and repository functions to prevent duplicated business logic.
- Start independent data requests concurrently with `Promise.all` or another appropriate concurrency mechanism.
- Avoid sequential API requests when they have no dependency on each other.
- Fetch only the fields and records required by the current page.
- Avoid waterfalls caused by nested components waiting unnecessarily for parent requests.
- Use pagination, filtering, and bounded queries for large datasets.
- Use appropriate database indexes and inspect slow queries before attempting to optimize them at the UI layer.
- Avoid making the same request multiple times during one render when safe deduplication is possible.

### C. Use Caching Correctly
- Follow current Next.js 16 caching APIs and documented defaults (`use cache`, `cacheLife`, `cacheTag`).
- Use `revalidateTag` or `revalidatePath` when cached content must be invalidated after relevant changes.
- Use request-level memoization for duplicate data access where appropriate.
- Distinguish request memoization, persistent data caching, and browser caching.
- Never cache user-specific or sensitive responses in a way that exposes one user's data to another.
- Do not serve stale data where business requirements demand current data.

### D. Keep API Routes Where Necessary
Retain Route Handlers for external API consumers, webhooks, integrations, client-triggered mutations, and operations requiring an HTTP boundary. Do not create an API route solely to fetch data that a Server Component can access directly.

### E. Keep Interactive Components Fast
- Render initial content and data on the server where possible.
- Pass only serializable data needed by Client Components.
- Keep `"use client"` boundaries narrow.
- Avoid refetching data immediately after hydration when the server already supplied an equivalent result.
- Avoid unnecessary hydration, large serialized payloads, and duplicated client/server state.
