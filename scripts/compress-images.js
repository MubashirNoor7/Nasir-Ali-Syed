import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '../public/images');

async function compressImages() {
  try {
    // Check if images directory exists
    if (!fs.existsSync(imagesDir)) {
      console.log(`Images directory not found: ${imagesDir}`);
      return;
    }

    // Recursively get all files in the images directory
    const getAllFiles = (dirPath, arrayOfFiles = []) => {
      const files = fs.readdirSync(dirPath);

      files.forEach(file => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
          arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
        } else {
          arrayOfFiles.push(filePath);
        }
      });

      return arrayOfFiles;
    };

    const allFiles = getAllFiles(imagesDir);
    const imageFiles = allFiles.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
    });

    if (imageFiles.length === 0) {
      console.log('No image files found to compress');
      return;
    }

    console.log(`Found ${imageFiles.length} image files to compress...`);

    let successCount = 0;
    let errorCount = 0;

    for (const filePath of imageFiles) {
      try {
        const ext = path.extname(filePath).toLowerCase();
        const dir = path.dirname(filePath);
        const filename = path.basename(filePath, ext);
        const webpPath = path.join(dir, `${filename}.webp`);

        // Convert to WebP
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(webpPath);

        // Delete original file
        fs.unlinkSync(filePath);

        console.log(`✓ Converted: ${path.relative(imagesDir, filePath)} → ${path.basename(webpPath)}`);
        successCount++;
      } catch (error) {
        console.error(`✗ Error processing ${filePath}:`, error.message);
        errorCount++;
      }
    }

    console.log(`\n✅ Compression complete!`);
    console.log(`   Successfully converted: ${successCount} files`);
    if (errorCount > 0) {
      console.log(`   Errors: ${errorCount} files`);
    }
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

compressImages();
