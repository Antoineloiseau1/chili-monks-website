#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');

async function optimizeIcon() {
  try {
    const inputPath = 'src/app/images/icon.png';
    const outputPath = 'src/app/images/icon.optimized.png';
    
    const originalSize = fs.statSync(inputPath).size / 1024 / 1024;
    console.log(`Original icon.png: ${originalSize.toFixed(2)}MB`);
    
    // Create optimized version - 64px is good for icons
    await sharp(inputPath)
      .resize(64, 64, { 
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ 
        quality: 90,
        compressionLevel: 9,
        effort: 10
      })
      .toFile(outputPath);
    
    const newSize = fs.statSync(outputPath).size / 1024;
    const reduction = ((fs.statSync(inputPath).size - fs.statSync(outputPath).size) / fs.statSync(inputPath).size * 100);
    
    console.log(`Optimized icon.png: ${newSize.toFixed(1)}KB (-${reduction.toFixed(1)}%)`);
    console.log('✅ Icon optimization complete!');
    
  } catch (error) {
    console.error('Error optimizing icon:', error.message);
  }
}

optimizeIcon();