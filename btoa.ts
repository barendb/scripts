#!/usr/bin/env deno run --allow-read

/**
 * Base64 File Converter
 * 
 * This script takes a file path as a command-line argument and outputs
 * the base64-encoded contents of the file.
 * 
 * Usage:
 *   deno run --allow-read base64-converter.ts /path/to/file
 */

// Check if a file path was provided
if (Deno.args.length !== 1) {
  console.error("Error: Please provide a single file path as an argument");
  console.error("Usage: deno run --allow-read base64-converter.ts /path/to/file");
  Deno.exit(1);
}

const filePath = Deno.args[0];

try {
  // Read the file
  const fileData = await Deno.readFile(filePath);
  
  // Convert the file data to base64
  const base64Data = btoa(
    new Uint8Array(fileData).reduce(
      (data, byte) => data + String.fromCharCode(byte), 
      ''
    )
  );
  
  // Output the base64-encoded data
  console.log(base64Data);
} catch (error) {
  console.error(`Error: Failed to process file "${filePath}"`);
  console.error(error.message);
  Deno.exit(1);
}
