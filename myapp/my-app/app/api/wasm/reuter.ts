import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    // Resolve absolute path to the WASM file
    const wasmPath = path.join(process.cwd(), "public", "module.wasm");
    const wasmBuffer = await readFile(wasmPath);

    // Compile and instantiate the WebAssembly module
    const wasmModule = await WebAssembly.instantiate(wasmBuffer);

    // Explicitly type the exports
    const instance = wasmModule.instance as {
      exports: {
        mainFunction: () => number; // Adjust this based on your WASM function
      };
    };

    // Ensure the function exists before calling
    if (typeof instance.exports.mainFunction !== "function") {
      return Response.json({ error: "mainFunction not found in WASM exports" }, { status: 500 });
    }

    // Call the exported function
    const result = instance.exports.mainFunction();

    // Return the result as JSON
    return Response.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Error loading WASM:", error);
    return Response.json({ error: "Failed to load WASM" }, { status: 500 });
  }
}
