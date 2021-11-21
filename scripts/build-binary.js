/**
 * This script is used to rename the binary with the platform specific postfix.
 * When `tauri build` is ran, it looks for the binary name appended with the platform specific postfix.
 */

// const execa = require("execa");
import execa from "execa";
import fs from "fs";
// const fs = require("fs");

let extension = "";
if (process.platform === "win32") {
  extension = ".exe";
}

async function main() {
  //build binary first, path is ~/code/gcsim/cmd/gcsim
  try {
    execa.sync("sh", ["-c", "cd ../gcsim/cmd/gcsim && go build"]);
  } catch (e) {
    console.log("error building: ", e);
    return;
  }

  const rustInfo = (await execa("rustc", ["-vV"])).stdout;
  const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];
  if (!targetTriple) {
    console.error("Failed to determine platform target triple");
  }
  // fs.unlinkSync(`src-tauri/binaries/gcsim-${targetTriple}${extension}`);
  fs.renameSync(
    `../gcsim/cmd/gcsim/gcsim${extension}`,
    `src-tauri/binaries/gcsim-${targetTriple}${extension}`
  );
}

main().catch((e) => {
  throw e;
});
