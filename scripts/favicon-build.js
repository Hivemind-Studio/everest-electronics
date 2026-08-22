const sharp = require("sharp");
const fs = require("fs");

(async () => {
  const src = "/tmp/everest-logo.webp";
  const meta = await sharp(src).metadata(); // 288x288

  // swoosh = top 45% band (excludes ALL text), then trim transparent border
  const cropH = Math.round(meta.height * 0.45);
  const swooshRaw = await sharp(src)
    .extract({ left: 0, top: 0, width: meta.width, height: cropH })
    .png().toBuffer();
  const trimmed = await sharp(swooshRaw).trim().png().toBuffer();
  const t = await sharp(trimmed).metadata();
  console.log("swoosh content:", t.width, "x", t.height);

  // Candidate C: swoosh fills ~92% of a transparent square
  const sideC = Math.round(Math.max(t.width, t.height) / 0.92);
  const C = await sharp({
    create: { width: sideC, height: sideC, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  }).composite([{ input: trimmed, gravity: "center" }]).png().toBuffer();

  // Candidate D: same swoosh on an ink rounded-square tile (#1C1C1C)
  const S = 256, pad = 36;
  const inner = Math.round((S - 2 * pad));
  const scaled = await sharp(trimmed).resize(inner, inner, { fit: "inside" }).png().toBuffer();
  const tile = Buffer.from(
    `<svg width="${S}" height="${S}"><rect x="4" y="4" width="${S - 8}" height="${S - 8}" rx="52" fill="#1C1C1C"/></svg>`
  );
  const D = await sharp({ create: { width: S, height: S, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: tile }, { input: scaled, gravity: "center" }])
    .png().toBuffer();

  fs.writeFileSync("/tmp/cand-C.png", await sharp(C).resize(64, 64).png().toBuffer());
  fs.writeFileSync("/tmp/cand-D.png", await sharp(D).resize(64, 64).png().toBuffer());
  fs.writeFileSync("/tmp/master-C.png", await sharp(C).resize(256, 256).png().toBuffer());
  fs.writeFileSync("/tmp/master-D.png", D);
  console.log("candidates C (transparent) + D (ink tile) written");
})();
