#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const EXTENSION_DIR = path.join(ROOT_DIR, 'chrome-extension');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const OUTPUT_FILE = path.join(DIST_DIR, 'ananasit-chrome-extension.zip');

console.log('🍍 Building Ananasit Chrome Extension...\n');

// Step 1: Validate manifest
console.log('✓ Validating manifest.json...');
const manifestPath = path.join(EXTENSION_DIR, 'manifest.json');
try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  console.log(`  Version: ${manifest.version}`);
  console.log(`  Name: ${manifest.name}`);
} catch (error) {
  console.error('✗ Invalid manifest.json:', error.message);
  process.exit(1);
}

// Step 2: Check required files
console.log('\n✓ Checking required files...');
const requiredFiles = [
  'manifest.json',
  'background.js',
  'icons/icon16.png',
  'icons/icon48.png',
  'icons/icon128.png'
];

for (const file of requiredFiles) {
  const filePath = path.join(EXTENSION_DIR, file);
  if (!fs.existsSync(filePath)) {
    console.error(`✗ Missing required file: ${file}`);
    process.exit(1);
  }
  console.log(`  ✓ ${file}`);
}

// Step 3: Create dist directory
console.log('\n✓ Creating dist directory...');
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// Step 4: Create ZIP package
console.log('\n✓ Creating ZIP package...');
try {
  // Remove old ZIP if exists
  if (fs.existsSync(OUTPUT_FILE)) {
    fs.unlinkSync(OUTPUT_FILE);
  }

  // Create ZIP (excluding README and source logo)
  const zipCommand = `cd "${EXTENSION_DIR}" && zip -r "${OUTPUT_FILE}" . -x "*.md" -x "icons/logo-*.png"`;
  execSync(zipCommand, { stdio: 'inherit' });

  const stats = fs.statSync(OUTPUT_FILE);
  console.log(`\n✓ Package created: ${OUTPUT_FILE}`);
  console.log(`  Size: ${(stats.size / 1024).toFixed(2)} KB`);
} catch (error) {
  console.error('\n✗ Failed to create ZIP package:', error.message);
  process.exit(1);
}

console.log('\n🎉 Build completed successfully!\n');
