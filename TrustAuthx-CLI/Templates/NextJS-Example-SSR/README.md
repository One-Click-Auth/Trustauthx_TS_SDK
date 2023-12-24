## **TrustAuthX Integration with NextJS**

**This guide demonstrates a simple example of implementing TrustAuthX in a NextJS app with server-side rendering (SSR).** It covers user authentication functionalities like sign-in, sign-out, profile editing, and route protection using the TrustAuthX NPM package.

**Installation Process:**

**1. Setting Up:**

- **Install dependencies:** Run `npm install` in your project directory.
- **Create `.env` file:** Add your TrustAuthX credentials:
    - `API_KEY=your_api_key`
    - `API_SECRET=your_api_secret`
    - `ORG_ID=your_org_id`
- **Configure callback URL:** Update the callback URL in your TrustAuthX dashboard to point to your app's port (default: 3535).

**2. Running the Development Server:**

- Open a terminal in your project directory.
- Set the port environment variable for development server launch: `export PORT=3535`.
- Start the NextJS development server: `npm run dev`.

**3. Additional Notes:**

- Remember to adjust the callback URL configuration based on your chosen port if different from the default 3535.
- Explore the [TrustAuthX documentation](https://docs.trustauthx.com/Integration/Python/SDK-class-structure-insight) for detailed API references and advanced use cases.