# Expense Client

### Tailwind

- Installation for tailwind v4 has changed to set it up with vite and react.
- Follow the guide: https://tailwindcss.com/docs/installation/using-vite
- For tailwind intellicence create and empty tailwind.config.js file in the root dir

### Deployment

- The client side code will be bundled and served as static files from the server

### Notes

- An issue occured where tanstack/router library was not generating the routeTree.gen.ts file in the src directory, in that case run the command to generate it:
  - `bunx @tanstack/router-cli generate`
