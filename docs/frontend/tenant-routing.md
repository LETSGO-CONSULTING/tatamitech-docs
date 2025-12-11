---
sidebar_position: 2
---

# Tenant Routing

Tenant selection is subdomain-driven. The Angular app resolves the tenant slug early in the request lifecycle and keeps it consistent across API calls and UI state.

## Subdomain detection

- Expected hostnames: `<tenant>.tatamitech.com` (prod) and `<tenant>.localhost` (dev).
- SSR adapter or edge middleware (e.g., Angular Universal with Express/Fastify) parses the hostname and stores the tenant slug in a request header and/or cookie for the app layer.
- Unknown tenants redirect to a safe fallback (marketing home or 404).

## App routing

- **Public pages:** `/` and marketing routes are tenant-agnostic unless branding is enabled per tenant.
- **Dashboard pages:** `/dashboard`, `/students`, `/attendance`, `/promotions` require authentication and tenant context.
- **Route guard:** a global guard checks for tenant resolution; if missing, redirect to marketing or show a 404.
- **API calls:** forward the tenant slug to the backend via `X-Tenant` and include bearer token.

## Example server middleware (Angular Universal + Express)

```ts
app.use((req, _res, next) => {
  const host = req.headers.host ?? '';
  const tenant = host.split('.')[0]; // adjust for multi-level domains
  if (tenant && tenant !== 'www') {
    req.headers['x-tenant'] = tenant;
    req.cookies['tenant'] = tenant;
  }
  return next();
});
```

## Client data fetching

- Centralize API clients so every call injects `Authorization` + `X-Tenant`.
- Keep tenant slug in a stable source of truth (service/store) derived from server middleware or initial bootstrapping.
- Use Angular route resolvers to fetch tenant config before rendering dashboards.

### HTTP interceptor sketch

```ts
@Injectable()
export class TenantInterceptor implements HttpInterceptor {
  constructor(private tenantService: TenantService, private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const tenant = this.tenantService.currentTenant();
    const token = this.auth.token();
    const headers = req.headers
      .set('X-Tenant', tenant ?? '')
      .set('Authorization', token ? `Bearer ${token}` : req.headers.get('Authorization') ?? '');
    return next.handle(req.clone({ headers }));
  }
}
```

## Theming per tenant

- Allow color/logo overrides keyed by tenant slug.
- Cache tenant theme/config in the CDN when safe; invalidate on tenant updates.
