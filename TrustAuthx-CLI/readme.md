# trustauthx-cli

CLI tool for creating trustauthx sdk examples

## Local Installation

### Prerequisites

Before using `trustauthx-cli`, ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation Steps

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/trustauthx-cli.git
   ```

2. Navigate to the project folder:

   ```bash
   cd trustauthx-cli
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

### Build

Before publishing or linking, build the TypeScript code to JavaScript:

```bash
npm run prepublish
```

### Link (for testing)

To test the CLI tool locally, you can use npm link:

```bash
npm link
```

### Create Trustauthx SDK Example

To create a new Trustauthx SDK example in your project, run:

```bash
npx create-trustauthx-sdk your-app-name --next
```

Replace `your-app-name` with the desired name for your Trustauthx SDK example.
