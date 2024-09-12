import fs from 'fs';
import sharp from 'sharp';

/**
 * Compress an image file (JPG or PNG) to a target size in bytes (e.g., 4MB = 4 * 1024 * 1024 bytes)
 * @param inputFilePath - Path to the input image file
 * @param outputFilePath - Path where the compressed file will be saved
 * @param targetSizeMB - Target size in megabytes (default is 4MB)
 */
export async function compressImageToTargetSize(
  inputFilePath: string,
  outputFilePath: string,
  targetSizeMB: number = 4
): Promise<void> {
  const targetSizeBytes = targetSizeMB * 1024 * 1024;
  const metadata = await sharp(inputFilePath).metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error('Invalid image file');
  }

  let quality = 100; // Start with the highest quality

  while (quality > 0) {
    const buffer = await sharp(inputFilePath)
      .jpeg({ quality }) // Use PNG if the input is PNG
      .toBuffer();

    if (buffer.length <= targetSizeBytes) {
      // Save the compressed image
      fs.writeFileSync(outputFilePath, buffer);
      console.log(`Image compressed to ${buffer.length / (1024 * 1024)} MB`);
      return;
    }

    quality -= 5; // Decrease quality and retry
  }

  throw new Error('Unable to compress image to the target size');
}
