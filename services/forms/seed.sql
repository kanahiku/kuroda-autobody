-- Shared Cloudflare Worker form service. One row per client site.
-- from_email uses Resend's test sender until the client domain is verified.
-- After DNS is verified, update from_email to an approved sender on kurodaautobody.com.
-- Replace notify_email with the shop's real inbox BEFORE running this against a live database.
INSERT OR REPLACE INTO sites (slug, name, notify_email, from_email, from_name, allowed_origins)
VALUES (
  'kuroda-autobody',
  'Kuroda Autobody',
  'REPLACE-WITH-SHOP-EMAIL@example.com',
  'Kuroda Autobody <onboarding@resend.dev>',
  'Kuroda Autobody',
  '["http://localhost:4321","https://*.vercel.app","https://kurodaautobody.com","https://www.kurodaautobody.com"]'
);
