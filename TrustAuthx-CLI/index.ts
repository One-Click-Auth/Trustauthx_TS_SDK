#!/usr/bin/env node

// Usage: npx create-my-template my-app --next

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const spawn = require('child_process').spawn;

if (process.argv.length < 4) {
  console.log(
    'You have to provide a name to your app and the template to use.',
  );
  console.log('For example :');
  console.log('    npx trustauthx my-app --next');
  process.exit(1);
}

const appName = process.argv[2];
const template = process.argv[3];
const appPath = path.join(process.cwd(), appName);

const getTemplateFlagDescription = (template: string) => {
  switch (template) {
    case '--next':
      return 'Next.js template with TrustAuthX SDK';
    default:
      return 'Invalid template. Only --next is supported.';
  }
};

try {
  fs.mkdirSync(appPath);
} catch (err) {
  console.error(`Failed to create directory ${appPath}: ${err}`);
  process.exit(1);
}

const main = () => {
  if (template === '--next') {
    if (!require.main) {
      return;
    }
    const isProd = require.main.filename.includes('dist');
    // Point to the local Next.js template directory
    const templateDir = path.resolve(
      __dirname,
      isProd ? '..' : '.',
      'Templates',
      'NextJS-Example-SSR',
    );

    // Copy the contents of the template directory into the appPath directory
    console.log(
      `Creating a new ${getTemplateFlagDescription(template)} in \n${appPath}.`,
    );
    fs.copySync(templateDir, appPath);

    process.chdir(appPath);
    console.log('Installing dependencies...');
    // Install dependencies in the new project
    execSync('npm install', { stdio: 'inherit' });
    console.log('Dependencies installed.');

    // Run the app
    console.log('Run the App:');
    console.log('cd', appName);
    console.log('    npm run dev');
  } else {
    console.error('Invalid template. Only --next is supported.');
    process.exit(1);
  }
};

main();
