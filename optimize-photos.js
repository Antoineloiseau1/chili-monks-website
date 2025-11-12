const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'public/images/photos';
const outputDir = 'public/images/photos-compressed';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizePhoto(filename) {
  const inputPath = path.join(inputDir, filename);
  const outputPath = path.join(outputDir, filename);

  try {
    await sharp(inputPath)
      .resize(1920, 1080, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({
        quality: 85,
        progressive: true
      })
      .toFile(outputPath);

    const originalSize = fs.statSync(inputPath).size;
    const compressedSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

    console.log(`✓ ${filename}: ${(originalSize/1024/1024).toFixed(1)}MB → ${(compressedSize/1024/1024).toFixed(1)}MB (${reduction}% reduction)`);
  } catch (error) {
    console.error(`✗ Error processing ${filename}:`, error.message);
  }
}

async function optimizeAllPhotos() {
  console.log('Starting photo optimization...\n');

  const files = fs.readdirSync(inputDir)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file));

  console.log(`Found ${files.length} photos to optimize\n`);

  for (const file of files) {
    await optimizePhoto(file);
  }

  console.log('\n✅ Photo optimization complete!');
}

optimizeAllPhotos().catch(console.error);