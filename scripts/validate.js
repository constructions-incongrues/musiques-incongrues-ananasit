#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const EXTENSION_DIR = path.join(ROOT_DIR, 'chrome-extension');

console.log('🔍 Validating Ananasit Chrome Extension...\n');

let hasErrors = false;

// Validate manifest.json
console.log('Checking manifest.json...');
const manifestPath = path.join(EXTENSION_DIR, 'manifest.json');
try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  // Check required fields
  const requiredFields = ['manifest_version', 'name', 'version', 'description'];
  for (const field of requiredFields) {
    if (!manifest[field]) {
      console.error(`  ✗ Missing required field: ${field}`);
      hasErrors = true;
    }
  }

  // Validate manifest version
  if (manifest.manifest_version !== 3) {
    console.error(`  ✗ manifest_version should be 3, got ${manifest.manifest_version}`);
    hasErrors = true;
  }

  // Validate version format
  if (!/^\d+\.\d+\.\d+$/.test(manifest.version)) {
    console.error(`  ✗ Invalid version format: ${manifest.version} (should be X.Y.Z)`);
    hasErrors = true;
  }

  if (!hasErrors) {
    console.log('  ✓ manifest.json is valid');
    console.log(`    Name: ${manifest.name}`);
    console.log(`    Version: ${manifest.version}`);
  }
} catch (error) {
  console.error('  ✗ Invalid JSON:', error.message);
  hasErrors = true;
}

// Check required files
console.log('\nChecking required files...');
const requiredFiles = [
  { path: 'manifest.json', desc: 'Extension manifest' },
  { path: 'background.js', desc: 'Background service worker' },
  { path: 'icons/icon16.png', desc: '16x16 icon' },
  { path: 'icons/icon48.png', desc: '48x48 icon' },
  { path: 'icons/icon128.png', desc: '128x128 icon' }
];

for (const file of requiredFiles) {
  const filePath = path.join(EXTENSION_DIR, file.path);
  if (!fs.existsSync(filePath)) {
    console.error(`  ✗ Missing: ${file.path} (${file.desc})`);
    hasErrors = true;
  } else {
    const stats = fs.statSync(filePath);
    console.log(`  ✓ ${file.path} (${(stats.size / 1024).toFixed(2)} KB)`);
  }
}

// Validate background.js
console.log('\nChecking background.js...');
const backgroundPath = path.join(EXTENSION_DIR, 'background.js');
if (fs.existsSync(backgroundPath)) {
  const content = fs.readFileSync(backgroundPath, 'utf8');

  // Check for webhook URL
  if (!content.includes('WEBHOOK_URL')) {
    console.error('  ✗ WEBHOOK_URL constant not found');
    hasErrors = true;
  } else {
    console.log('  ✓ WEBHOOK_URL configured');
  }

  // Check for required Chrome APIs
  const requiredAPIs = ['chrome.contextMenus', 'chrome.action', 'chrome.runtime'];
  for (const api of requiredAPIs) {
    if (content.includes(api)) {
      console.log(`  ✓ Uses ${api}`);
    }
  }
}

// Final result
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Validation failed with errors');
  process.exit(1);
} else {
  console.log('✅ All validations passed!');
  process.exit(0);
}
