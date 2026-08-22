const sharp = require("sharp");
const fs = require("fs");

/* Pack PNG frames into a valid .ico (PNG-compressed entries, Vista+ spec).
   Format: ICONDIR(6B) + N x ICONDIRENTRY(16B) + raw PNG blobs. */
function packIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const entries = [];
  let offset = 6 + 16 * count;
  for (let i = 0; i < count; i++) {
    const e = Buffer.alloc(16);
    const s = sizes[i];
    e.writeUInt8(s >= 256 ? 0 : s, 0); // width (0 = 256)
    e.writeUInt8(s >= 256 ? 0 : s, 1); // height
    e.writeUInt8(0, 2); // palette colors
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(pngBuffers[i].length, 8);
    e.writeUInt32LE(offset, 12);
    offset += pngBuffers[i].length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngBuffers]);
}

(async () => {
  const master = "/tmp/master-D.png"; // swoosh on #1C1C1C rounded tile
  const sizes = [16, 32, 48];
  const frames = [];
  for (const s of sizes) {
    frames.push(await sharp(master).resize(s, s).png().toBuffer());
  }
  const ico = packIco(frames, sizes);
  fs.writeFileSync("src/app/favicon.ico", ico);
  console.log("favicon.ico written:", ico.length, "bytes,", sizes.join("/"), "px");
})();
