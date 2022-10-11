#!/usr/bin/env node

"use strict";

const { readFile, writeFile } = require("fs/promises");
const { join } = require("path");
const { EOL } = require("os");

const pathToIndexCjs = join(__dirname, "..", "dist", "cjs", "index.js");

(async () => {
    const cjsData = await readFile(pathToIndexCjs, "utf-8");
    const lines = cjsData.split(EOL);
    const res = lines.map(line => / *exports\.default *= */.test(line) ? line.replace(/ *exports\.default *= */, "module.exports = ") : line);
    writeFile(pathToIndexCjs, res.join(EOL));
})();