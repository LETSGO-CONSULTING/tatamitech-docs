import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';

import styles from './index.module.css';

const highlights = [
  {
    title: 'Multitenant by design',
    description: 'Subdomains per academy, tenant_id enforcement, and guarded APIs keep data isolated.',
  },
  {
    title: 'Operationally ready',
    description: 'QR attendance, belt progression, dashboards per role, and audited overrides.',
  },
  {
    title: 'Secure & observable',
    description: 'RBAC, scoped queries, health/readiness, structured logs, and alerts by tenant.',
  },
];

const docSections = [
  {
    title: 'Product & People',
    badge: 'Start here',
    description: 'Positioning, journeys, and responsibilities across roles.',
    links: [
      {label: 'Product overview', href: '/docs/product-overview'},
      {label: 'User journeys', href: '/docs/user-journeys'},
      {label: 'Roles & permissions', href: '/docs/roles-permissions'},
    ],
  },
  {
    title: 'Tenants & Architecture',
    badge: 'System',
    description: 'Multitenancy model, data isolation, and lifecycle of a tenant.',
    links: [
      {label: 'Architecture', href: '/docs/architecture/overview'},
      {label: 'Multitenancy', href: '/docs/architecture/multitenancy'},
      {label: 'Tenant lifecycle', href: '/docs/tenant-lifecycle'},
    ],
  },
  {
    title: 'Data & APIs',
    badge: 'Build',
    description: 'Schemas, contracts, and flows for integrations and frontend.',
    links: [
      {label: 'Data model', href: '/docs/data-model'},
      {label: 'API reference', href: '/docs/api-reference'},
      {label: 'QR spec', href: '/docs/qr-spec'},
    ],
  },
  {
    title: 'Experience',
    badge: 'UX',
    description: 'Dashboards, routing, and progression flows tuned for academies.',
    links: [
      {label: 'Frontend overview', href: '/docs/frontend/overview'},
      {label: 'Tenant routing', href: '/docs/frontend/tenant-routing'},
      {label: 'Dashboards & UX', href: '/docs/frontend/dashboards-ux'},
    ],
  },
];

const opsLinks = [
  {label: 'Deployment playbook', href: '/docs/deployment'},
  {label: 'Security', href: '/docs/security'},
  {label: 'Observability', href: '/docs/observability'},
  {label: 'Runbooks', href: '/docs/runbooks'},
  {label: 'Roadmap', href: '/docs/roadmap'},
  {label: 'Changelog', href: '/docs/changelog'},
];

function Hero(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroCopy}>
          <div className={styles.badgeRow}>
            <span className={styles.badge}>Multitenant SaaS</span>
            <span className={styles.badge}>Martial Arts Ops</span>
          </div>
          <Heading as="h1" className={styles.title}>
            {siteConfig.title}
          </Heading>
          <p className={styles.subtitle}>
            Multitenant SaaS for martial arts academies.
          </p>
          <div className={styles.ctaRow}>
            <Link className={clsx('button button--primary', styles.cta)} to="/docs/getting-started">
              Get started
            </Link>
            <Link className={clsx('button button--secondary', styles.cta)} to="/docs/product-overview">
              Product & roles
            </Link>
          </div>
          <div className={styles.meta}>
            <span>Subdomains</span>
            <span>Angular · Express · Prisma</span>
            <span>QR attendance</span>
          </div>
        </div>
        <div className={styles.heroPanel}>
          <div className={styles.panelHeader}>
            <span>Golden Tiger</span>
            <span className={styles.status}>Tenant live</span>
          </div>
          <div className={styles.panelBody}>
            <div className={styles.metric}>
              <strong>Attendance today</strong>
              <span>132</span>
            </div>
            <div className={styles.metric}>
              <strong>Eligible for promotion</strong>
              <span>18</span>
            </div>
            <div className={styles.metric}>
              <strong>Reliability</strong>
              <span>99.9%</span>
            </div>
          </div>
          <Link className={styles.panelLink} to="/docs/backend/qr-attendance">
            QR flow →
          </Link>
        </div>
      </div>
    </header>
  );
}

function Highlights(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Highlights</Heading>
          <p className={styles.sectionSubtitle}>What sets TatamiTech apart for multi-academy operations.</p>
        </div>
        <div className={styles.grid}>
          {highlights.map((item) => (
            <div key={item.title} className={styles.card}>
              <Heading as="h3">
                {item.title}
              </Heading>
              <p>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickLinks(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Documentation map</Heading>
          <p className={styles.sectionSubtitle}>Dive into the areas you need: product, architecture, data, and UX.</p>
        </div>
        <div className={styles.cardGrid}>
          {docSections.map((section) => (
            <div key={section.title} className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.chip}>{section.badge}</span>
                <Heading as="h3">{section.title}</Heading>
                <p>{section.description}</p>
              </div>
              <div className={styles.cardLinks}>
                {section.links.map((link) => (
                  <Link key={link.href} to={link.href}>
                    {link.label} →
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Operate(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Operate & ship safely</Heading>
          <p className={styles.sectionSubtitle}>Guides to deploy, monitor, secure, and respond when things go wrong.</p>
        </div>
        <div className={styles.quickLinks}>
          {opsLinks.map((link) => (
            <Link key={link.href} className={styles.quickLink} to={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main>
        <Hero />
        <Highlights />
        <QuickLinks />
        <Operate />
      </main>
    </Layout>
  );
}
