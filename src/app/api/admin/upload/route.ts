import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { saveFile, isAllowedExt, mimeFromExt } from "@/lib/storage";

export const runtime = "nodejs";

/**
 * Admin image upload. Multipart POST with a single "file" field.
 * Saves to the CDN (R2) via the storage driver and returns the storage KEY,
 * which the caller stores on the model (blog post, service, award, etc.).
 */
export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const name = file.name || "upload";
  if (!isAllowedExt(name)) {
    return NextResponse.json(
      { error: "Tipe file tidak diizinkan. Gunakan JPG, PNG, WebP, GIF, atau AVIF." },
      { status: 400 },
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const saved = await saveFile({
      originalName: name,
      buffer,
      mime: mimeFromExt(name),
    });
    return NextResponse.json({ key: saved.key, mime: saved.mime, size: saved.size });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 500 },
    );
  }
}