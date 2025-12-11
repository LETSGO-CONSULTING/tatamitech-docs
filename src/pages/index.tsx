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
    title: 'Operational flows',
    description: 'QR attendance, belt progression rules, and dashboards for admins and instructors.',
  },
  {
    title: 'Stack ready to scale',
    description: 'Angular enterprise frontend, Express + Prisma backend, PostgreSQL shared DB.',
  },
];

const quickLinks = [
  {label: 'Architecture', href: '/docs/architecture/overview'},
  {label: 'Multitenancy model', href: '/docs/architecture/multitenancy'},
  {label: 'Backend', href: '/docs/backend/overview'},
  {label: 'Frontend routing', href: '/docs/frontend/tenant-routing'},
  {label: 'QR & Attendance', href: '/docs/backend/qr-attendance'},
  {label: 'Belt progression', href: '/docs/operations/progression'},
  {label: 'Deployment', href: '/docs/deployment'},
];

function Hero(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
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
          <Link className={clsx('button button--secondary', styles.cta)} to="/docs/architecture/overview">
            Architecture
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
    </header>
  );
}

function Highlights(): ReactNode {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <Heading as="h2">Highlights</Heading>
        <p className={styles.sectionSubtitle}>Key points for quick onboarding.</p>
      </div>
      <div className={styles.grid}>
        {highlights.map((item) => (
          <div key={item.titleId} className={styles.card}>
            <Heading as="h3">
              {item.title}
            </Heading>
            <p>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickLinks(): ReactNode {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <Heading as="h2">Explore</Heading>
        <p className={styles.sectionSubtitle}>Choose your path to understand the stack and operations.</p>
      </div>
      <div className={styles.quickLinks}>
        {quickLinks.map((link) => (
          <Link key={link.href} className={styles.quickLink} to={link.href}>
            {link.label}
          </Link>
        ))}
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
      </main>
    </Layout>
  );
}
