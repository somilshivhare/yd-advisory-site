#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting YD Advisory Server...\n');

// Check if we're in the right directory
const serverPath = path.join(__dirname, 'server');
const packageJsonPath = path.join(serverPath, 'package.json');

try {
  require(packageJsonPath);
} catch (error) {
  console.error('❌ Error: Could not find server package.json');
  console.error('Please make sure you\'re running this from the project root directory.');
  process.exit(1);
}

// Start the server
const server = spawn('npm', ['run', 'dev'], {
  cwd: serverPath,
  stdio: 'inherit',
  shell: true
});

server.on('error', (error) => {
  console.error('❌ Failed to start server:', error.message);
  console.log('\n💡 Try running these commands manually:');
  console.log('   cd server');
  console.log('   npm install');
  console.log('   npm run dev');
});

server.on('close', (code) => {
  if (code !== 0) {
    console.log(`\n❌ Server process exited with code ${code}`);
  } else {
    console.log('\n✅ Server stopped');
  }
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping server...');
  server.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Stopping server...');
  server.kill('SIGTERM');
  process.exit(0);
});

console.log('📡 Server is starting...');
console.log('🌐 API will be available at: http://localhost:5000');
console.log('📧 Newsletter endpoint: http://localhost:5000/api/newsletter/subscribe');
console.log('\nPress Ctrl+C to stop the server\n');
