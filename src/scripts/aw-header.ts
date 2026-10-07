/**
 * <aw-header> custom element + mobile accordion click handling.
 * Imported by Header.astro; bundled by Astro like any inline <script>.
 */

const MOBILE_QUERY = '(max-width: 767px)';
const isMobileNav = () => window.matchMedia(MOBILE_QUERY).matches;

// Mobile nav: tapping the parent link navigates; tapping the chevron toggles.
document.addEventListener(
  'click',
  (e) => {
    const link = (e.target as HTMLElement)?.closest('[data-mobile-parent-link]');
    if (!link) return;
    e.stopPropagation(); // prevent <details> from toggling
  },
  true // capture phase so it fires before the <details> toggle
);

const normPath = (p: string) => '/' + p.replace(/^\/+|\/+$/g, '');

const isActiveHref = (href: string) => {
  const current = normPath(window.location.pathname);
  const url = new URL(href, window.location.origin);
  const hrefPath = normPath(url.pathname);
  const pathMatches = hrefPath === '/' ? current === '/' : current === hrefPath || current.startsWith(`${hrefPath}/`);
  if (!pathMatches) return false;
  if (url.hash) return url.hash === window.location.hash;
  return true;
};

/** Mark `trigger` active when it, or any link matching `childSelector` inside `parent`, is active. */
const markParentActive = (parent: HTMLElement, childSelector: string, triggerSelector: string) => {
  const childLinks = parent.querySelectorAll<HTMLAnchorElement>(childSelector);
  const anyChildActive = Array.from(childLinks).some((a) => isActiveHref(a.href));
  const trigger = parent.querySelector<HTMLElement>(triggerSelector);
  const triggerHref = trigger instanceof HTMLAnchorElement ? trigger.href : null;
  const triggerActive = Boolean(triggerHref && isActiveHref(triggerHref));
  if (trigger) trigger.classList.toggle('aw-link-active', anyChildActive || triggerActive);
};

class AwHeader extends HTMLElement {
  private header: HTMLElement | null = null;
  private toggle: HTMLElement | null = null;
  private nav: HTMLElement | null = null;
  private panel: HTMLElement | null = null;
  private mql?: MediaQueryList;
  private onMqlChange?: () => void;
  private onResize?: () => void;
  private removeScrolled?: () => void;
  private onPageLoad = () => {
    this.updateActiveLinks();
    this.closeOpenDropdown();
  };

  connectedCallback() {
    this.header = this.querySelector<HTMLElement>('#header');
    this.toggle = this.querySelector<HTMLElement>('[data-aw-toggle-menu]');
    this.nav = this.querySelector<HTMLElement>('[data-desktop-nav]');
    this.panel = this.querySelector<HTMLElement>('[data-mobile-panel]');

    // The header persists across view transitions (transition:persist), so
    // the server-rendered `aw-link-active` class would go stale. Re-compute it
    // on every navigation (astro:page-load fires on load and after each swap).
    this.updateActiveLinks();
    document.addEventListener('astro:page-load', this.onPageLoad);
    window.addEventListener('hashchange', this.onPageLoad);

    this.bindMobileMenu();
    this.bindMegaMenus();
    document.documentElement.classList.add('motion-safe:scroll-smooth');
    this.bindStickyShadow();
  }

  disconnectedCallback() {
    if (this.mql && this.onMqlChange) this.mql.removeEventListener('change', this.onMqlChange);
    if (this.onResize) window.removeEventListener('resize', this.onResize);
    if (this.removeScrolled) this.removeScrolled();
    document.removeEventListener('astro:page-load', this.onPageLoad);
    window.removeEventListener('hashchange', this.onPageLoad);
  }

  // ─── Mobile menu ────────────────────────────────────────────────────────────

  private setDropdownOpen(li: HTMLElement, open: boolean) {
    li.classList.toggle('expanded', open);
    li.querySelectorAll<HTMLElement>('[data-aw-toggle-dropdown]').forEach((btn) => {
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  private collapseDropdowns() {
    this.nav?.querySelectorAll<HTMLElement>('li.dropdown.expanded').forEach((li) => this.setDropdownOpen(li, false));
  }

  private closeMenu() {
    this.toggle?.classList.remove('expanded');
    this.toggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('overflow-hidden');
    this.header?.classList.remove('expanded');
    this.collapseDropdowns();
  }

  /** Mobile: accordion chevrons toggle a submenu. Desktop: ignore clicks so the menu never pins open. */
  private onNavClick(e: Event) {
    const target = e.target as HTMLElement | null;
    const dropdownToggle = target?.closest<HTMLElement>('[data-aw-toggle-dropdown]');
    if (dropdownToggle) {
      if (!isMobileNav()) {
        dropdownToggle.blur();
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      const li = dropdownToggle.closest<HTMLElement>('li.dropdown');
      if (!li) return;
      const willOpen = !li.classList.contains('expanded');
      this.nav?.querySelectorAll<HTMLElement>('li.dropdown.expanded').forEach((open) => {
        if (open !== li) this.setDropdownOpen(open, false);
      });
      this.setDropdownOpen(li, willOpen);
      return;
    }

    const link = target?.closest<HTMLElement>('a');
    if (link) link.blur();

    if (this.header?.classList.contains('expanded')) this.closeMenu();
  }

  private bindMobileMenu() {
    this.toggle?.addEventListener('click', () => {
      const expanded = this.toggle?.classList.toggle('expanded') ?? false;
      this.toggle?.setAttribute('aria-expanded', String(expanded));
      document.body.classList.toggle('overflow-hidden', expanded);
      this.header?.classList.toggle('expanded', expanded);
      if (!expanded) this.collapseDropdowns();
    });

    this.nav?.addEventListener('click', (e) => this.onNavClick(e));

    this.panel?.addEventListener('click', (e) => {
      const link = (e.target as HTMLElement)?.closest<HTMLElement>('a');
      if (link) this.closeMenu();
    });

    // Close it when leaving the mobile breakpoint.
    this.mql = window.matchMedia(MOBILE_QUERY);
    this.onMqlChange = () => this.closeMenu();
    this.mql.addEventListener('change', this.onMqlChange);
  }

  // ─── Desktop mega menu ──────────────────────────────────────────────────────

  private bindMegaMenus() {
    this.querySelectorAll<HTMLElement>('li.mega').forEach((li) => {
      li.addEventListener('mouseenter', () => this.clampMegaMenu(li));
      li.addEventListener('focusin', () => this.clampMegaMenu(li));
    });
    this.onResize = () => {
      this.querySelectorAll<HTMLElement>('li.mega:hover, li.mega:focus-within').forEach((li) => {
        this.clampMegaMenu(li);
      });
    };
    window.addEventListener('resize', this.onResize);
  }

  private clampMegaMenu(li: HTMLElement) {
    const menu = li.querySelector<HTMLElement>('.mega-menu');
    if (!menu) return;
    if (isMobileNav()) {
      menu.style.removeProperty('--mega-shift');
      return;
    }

    menu.style.setProperty('--mega-shift', '0px');
    requestAnimationFrame(() => {
      const pad = 16;
      const vw = window.innerWidth;
      const rect = menu.getBoundingClientRect();
      if (!rect.width) return;

      let shift = 0;
      if (rect.width >= vw - pad * 2) {
        shift = pad - rect.left;
      } else if (rect.left < pad) {
        shift = pad - rect.left;
      } else if (rect.right > vw - pad) {
        shift = vw - pad - rect.right;
      }
      menu.style.setProperty('--mega-shift', `${Math.round(shift)}px`);
    });
  }

  // ─── Sticky shadow ──────────────────────────────────────────────────────────

  /** Figma Shadow/Sticky Header — add .scrolled when user has scrolled down. */
  private bindStickyShadow() {
    const header = this.header;
    if (!header?.hasAttribute('data-aw-sticky-header')) return;
    const updateScrolled = () => header.classList.toggle('scrolled', window.scrollY > 0);
    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });
    this.removeScrolled = () => window.removeEventListener('scroll', updateScrolled);
  }

  // ─── Active links ───────────────────────────────────────────────────────────

  // With `transition:persist` the header (and its focus) survives client-side
  // navigations, so a clicked dropdown link keeps `:focus-within` and its menu
  // would stay open on the next page. Drop the focus so the CSS closes it.
  private closeOpenDropdown() {
    const active = document.activeElement as HTMLElement | null;
    if (active && this.contains(active) && active.closest('.dropdown')) active.blur();
  }

  private updateActiveLinks() {
    this.querySelectorAll<HTMLAnchorElement>('nav a[href]').forEach((a) => {
      a.classList.toggle('aw-link-active', isActiveHref(a.href));
    });

    this.querySelectorAll<HTMLElement>('nav > ul > li.dropdown').forEach((li) =>
      markParentActive(
        li,
        '.dropdown-menu a[href]',
        ':scope > a, :scope > span, :scope > div > a, :scope > div > span, :scope > div > button'
      )
    );

    // Desktop: mark sub-dropdown parent links active when any grandchild is active
    // e.g. "Certifications & Training" becomes active when on /certifications/honda/
    this.querySelectorAll<HTMLElement>('li.sub-dropdown').forEach((li) =>
      markParentActive(li, '.sub-dropdown-menu a[href]', ':scope > a')
    );

    // Mobile: mark parent summary links active when any descendant leaf is active
    this.querySelectorAll<HTMLElement>('[data-mobile-panel] details').forEach((details) => {
      const parentLink = details.querySelector(':scope > summary')?.querySelector<HTMLAnchorElement>('a[href]');
      if (!parentLink) return;
      const nestedLinks = details.querySelectorAll<HTMLAnchorElement>('ul a[href]');
      const anyChildActive = Array.from(nestedLinks).some((a) => isActiveHref(a.href));
      parentLink.classList.toggle('aw-link-active', anyChildActive || isActiveHref(parentLink.href));
    });
  }
}

if (!customElements.get('aw-header')) {
  customElements.define('aw-header', AwHeader);
}
