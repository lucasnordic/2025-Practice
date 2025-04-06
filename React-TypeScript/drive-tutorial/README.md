# Drive App

## TODO

- [x] Set up database and data model
- [x] Move folder open state to URL
- [x] Add auth
- [x] Add file uploading
- [x] upload files to the right folder
- [x] allow upload of other files(?) that aren't images
- [x] Analytics
- [ ] delete files
- [ ] real homepage
- [ ] deal with root folder

## EXTRA

- [x] change folders to link components
- [x] change breadcrumbs to use links
- [x] clean up the db and data fetching patterns
- [x] url navigation
- [ ] search is not specific to current folder
- [ ] Hamburger menu / media query for extra buttons, darkmode, grid/list, new/upload
- [ ] In breadcrumbs, display the deepest folder first, add '...' between My Drive and however many fits to the right
- [ ] Redo light mode styling
- [ ] handle infinite scrolling - limit
- [ ] Refactor repeatable logic into hooks or services
- [ ] Create drive-ui context

## Using:

- [Next.js](https://nextjs.org/docs)
- [Clerk](https://clerk.com/docs) - Authentication
- [Drizzle](https://orm.drizzle.team/docs/overview) - Object Relational Mapping (ORM) for relational databases
- [Tailwind CSS](https://tailwindcss.com/docs/installation/) - Styling
- [Uploadthing](https://docs.uploadthing.com/) - File uploading
- [Netlify](https://docs.netlify.com/) - Deploy apps
- [Posthog](https://posthog.com/docs) - Analytics
- [SingleStore](https://www.singlestore.com/) - Database

## Future extensions:

- [tRPC](https://trpc.io) - End-to-end typesafe APIs
