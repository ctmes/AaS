# System Architecture

## Executive Summary
This project utilizes a **Modern Decoupled Architecture** (Headless CMS).
*   **Frontend**: Built with **Astro**, ensuring elite performance, zero-runtime JavaScript by default, and high SEO capability.
*   **Backend/CMS**: Powered by **Statamic Pro**, providing a robust, user-friendly content management interface and a powerful API.
*   **Infrastructure**: Managed via **Laravel Forge**, ensuring production-grade reliability, security, and automated deployments.

---

## 2. Migration & Modernization Context
This project represents a strategic migration from legacy monolithic platforms (**WordPress / Kentico**) to a modern, future-proof stack.

### Key Improvements over Legacy Systems
| Feature | Legacy (WP/Kentico) | New Stack (Astro + Statamic) |
| :--- | :--- | :--- |
| **Performance** | Server-side heavy, often reliant on caching plugins. | **Static-first (Astro)**. Zero-JS by default. Instant load times. |
| **Security** | High attack surface (SQL injection, plugin vulnerabilities). | **Immutable Content**. Flat-file storage removes SQL injection risks completely. |
| **Maintenance** | "Plugin Hell", constant updates, version conflicts. | **Composer-managed dependencies**. Controlled, atomic updates via Git. |
| **Scalability** | Hard to scale horizontally without complex architecture. | **Serverless-ready**. Frontend can be deployed to Edge; backend is API-driven. |

### Migration Strategy
1.  **Content Modeling**: Re-mapping strict schema from Kentico/WP to Statamic Blueprints.
2.  **Data Import**: utilizing Statamic's importers or custom scripts to migrate existing content.
3.  **SEO Preservation**: 301 Redirects are managed natively in Statamic to ensure no ranking loss during the switch.

---

## 3. Technological Stack

### Frontend Application (`jwa-astro`)
*   **Framework**: [Astro v5](https://astro.build/)
    *   *Why*: Best-in-class performance (Island Architecture), excellent for content-heavy sites.
*   **Styling**: TailwindCSS (Standard for modern responsive design).
*   **Language**: TypeScript (Type-safe development).
*   **Rendering Strategy**: Hybrid (Static Site Generation for marketing pages, Server Side Rendering for dynamic routes if needed).
*   **API Client**: Fetches content from the Statamic API (REST or GraphQL).

### Backend / Content Management (`jwa-demo`)
*   **CMS**: [Statamic Pro](https://statamic.com/) (v5)
    *   *Why*: Flat-file Native (version controllable content), beautiful UI for editors, Built on Laravel.
    *   *Edition*: **Pro** (Required for Multi-User, Revisions, and JSON API).
*   **Framework**: Laravel 12 (Robust PHP ecosystem).
*   **Database strategy**:
    *   **Content**: Flat File (Stored in Git for full version history and ease of rollback).
    *   **Users/Dynamic Data**: SQLite (Default) or MySQL (If scaling to thousands of concurrent writes).
*   **Caching**: Application-level caching via Statamic "Stache" + Laravel Cache.

---

## 2. Infrastructure & Deployment

### Server Management: Laravel Forge
We use **Laravel Forge** to provision and manage the production infrastructure. This ensures industry-standard security and configuration without the overhead of manual sysadmin work.

*   **Provider**: (Recommended: DigitalOcean, AWS, or Hetzner).
*   **OS**: Ubuntu 22.04 / 24.04 LTS.
*   **Services Managed by Forge**:
    *   **Nginx**: Optimized web server configuration.
    *   **PHP 8.3**: Latest consistent PHP runtime.
    *   **Auto-Deploy**: Zero-downtime deployment scripts triggered via Git push.
    *   **SSL**: Automated Let's Encrypt certificates.
    *   **Security**: Automated firewall managed (UFW).
    *   **Backups**: Configured to push database/assets to S3 (optional but recommended).

### Workflow
1.  **Development**: Developers work locally. Content structure and code are committed to Git.
2.  **Staging/Prod**: Code is pushed to GitHub/GitLab.
3.  **Deploy**: Forge detects the push and runs the deploy script:
    ```bash
    cd /home/forge/site.com
    git pull origin main
    composer install --no-interaction --prefer-dist --optimize-autoloader
    php artisan migrate --force
    php artisan statamic:stache:warm
    npm install && npm run build
    sudo -S service php8.3-fpm reload
    ```

---

## 3. Production Considerations (The "Go Live" Checklist)

### Statamic Configuration
For production, the following environment variables typically need to be set in Forge:
*   `APP_ENV=production`
*   `APP_DEBUG=false`
*   `STATAMIC_PRO_ENABLED=true`
*   `STATAMIC_API_ENABLED=true` (Crucial for Headless)
*   `STATAMIC_STATIC_CACHING_STRATEGY=half` (or `full` for maximum speed)

### Critical Services
*   **Email**: Postmark or Mailgun (Transactional emails).
    *   *Config*: Set `MAIL_MAILER` and credentials in `.env`.
*   **Queues**: Redis (Recommended) or Database.
    *   *Why*: For processing image manipulations, search indexing, and heavy tasks in the background.
    *   *Config*: `QUEUE_CONNECTION=redis`.

### Security
*   **2FA**: Enforce Two-Factor Authentication for all Admin users in Statamic.
*   **Backups**: scheduled daily backups of the `storage` folder and database.
