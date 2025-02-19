import { readFile } from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Resolve the absolute path to the WASM file
    const wasmPath = path.join(process.cwd(), "public", "module.wasm");
    const wasmBuffer = await readFile(wasmPath);

    // Compile and instantiate the WebAssembly module
    const wasmModule = await WebAssembly.instantiate(wasmBuffer);

    // Explicitly type the exports
    const instance = wasmModule.instance as {
      exports: {
        mainFunction: () => number; // Change this based on your WASM function signature
      };
    };

    // Ensure the function exists before calling
    if (typeof instance.exports.mainFunction !== "function") {
      throw new Error("mainFunction not found in WASM exports");
    }

    // Call the exported function
    const result = instance.exports.mainFunction();

    // Send the result as JSON
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error loading WASM:", error);
    res.status(500).json({ error: "Failed to load WASM" });
  }
}
