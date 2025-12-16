import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'getting-started',
    {
      type: 'category',
      label: 'Architecture',
      collapsible: false,
      items: [
        'architecture/overview',
        'architecture/multitenancy',
      ],
    },
    {
      type: 'category',
      label: 'Product',
      collapsible: false,
      items: [
        'product-overview',
        'user-journeys',
        'roles-permissions',
        'tenant-lifecycle',
        'environment',
        'data-model',
        'api-reference',
        'qr-spec',
        'faq-glossary',
      ],
    },
    {
      type: 'category',
      label: 'Backend',
      collapsible: false,
      items: [
        'backend/overview',
        'backend/auth-security',
        'backend/qr-attendance',
        'backend/database-seeding',
        'backend/refresh-token',
      ],
    },
    {
      type: 'category',
      label: 'Frontend',
      collapsible: false,
      items: [
        'frontend/overview',
        'frontend/tenant-routing',
        'frontend/dashboards-ux',
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      collapsible: false,
      items: [
        'operations/progression',
        'operations/promotion-rules',
      ],
    },
    'deployment',
    'observability',
    'security',
    'runbooks',
    'roadmap',
    'changelog',
  ],
};

export default sidebars;
