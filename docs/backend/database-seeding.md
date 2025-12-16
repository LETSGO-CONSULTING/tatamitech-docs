---
id: database-seeding
title: Database Seeding
---

# Database Seeding

Our backend uses a seeding mechanism to populate the database with initial data, which is essential for development, testing, and staging environments. This process ensures that the application has a consistent and predictable state.

## Seed Data

The seed data is defined in `prisma/seed.ts` and includes:

- **Default roles and permissions**: Ensures that the application has a baseline security model.
- **System settings**: Configures default settings required for the application to run.
- **Sample data**: Includes sample tenants, users, and other entities to facilitate local development and testing.

## Running the Seed Script

The seed script is executed automatically when you run `prisma db seed`. This command is typically used after migrating the database to a new version.

```bash
npx prisma db seed
```

This command will:

1. **Connect to the database**: Establishes a connection to the database specified in your `.env` file.
2. **Clean up existing data**: Deletes any existing data to ensure a clean slate.
3. **Insert new data**: Populates the database with the data defined in the seed script.

By following this process, we ensure that our development and testing environments are always in a known and consistent state.
