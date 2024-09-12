import { promises as fs } from 'fs';
import { join } from 'path';
import { compressImageToTargetSize } from './index';

async function compressAllPngs() {
  try {
    const inputDir = './files/';
    const outputDir = './compressed-files/';
    const files = await fs.readdir(inputDir);

    for (const file of files) {
      const inputPath = join(__dirname, inputDir, file);
      const outputPath = join(__dirname, outputDir, file);

      await compressImageToTargetSize(inputPath, outputPath);
    }
  } catch (error) {
    console.error('Error processing files:', error);
  }
}

compressAllPngs();
