// Patches rollup/dist/native.js to use WASM instead of the blocked native binding
// Windows App Control blocks @rollup/rollup-win32-x64-msvc, so we use @rollup/wasm-node instead
// Only needed on Windows; harmless but unnecessary on Mac/Linux
const os = require('os');

const fs = require('fs');
const path = require('path');

const wasmDir = path.join(__dirname, '..', 'node_modules', '@rollup', 'wasm-node', 'dist', 'wasm-node');
const targetWasmDir = path.join(__dirname, '..', 'node_modules', 'rollup', 'dist', 'wasm-node');
const wasmNativePath = path.join(__dirname, '..', 'node_modules', '@rollup', 'wasm-node', 'dist', 'native.js');
const targetPath = path.join(__dirname, '..', 'node_modules', 'rollup', 'dist', 'native.js');

try {
  // Only needed on Windows where App Control blocks native binaries
  if (os.platform() !== 'win32') {
    console.log('[patch-rollup] Skipping - not Windows');
    return;
  }

  // Copy wasm bindings directory
  if (fs.existsSync(wasmDir)) {
    fs.cpSync(wasmDir, targetWasmDir, { recursive: true });
    console.log('[patch-rollup] wasm-node bindings copied');
  }
  // Copy native.js
  const wasmContent = fs.readFileSync(wasmNativePath, 'utf8');
  fs.writeFileSync(targetPath, wasmContent);
  console.log('[patch-rollup] Native binding replaced with @rollup/wasm-node');
} catch (e) {
  console.error('[patch-rollup] Failed:', e.message);
}
