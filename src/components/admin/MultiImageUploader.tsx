"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { buildAssetUrl } from "@/lib/storage/url";

/**
 * Reusable admin multi-image uploader (for the promo carousel).
 * Stores a list of storage keys in a hidden comma-separated <input name={name}>.
 */
export function MultiImageUploader({
  name,
  label,
  defaultValue = [],
}: {
  name: string;
  label: string;
  defaultValue?: string[] | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const initial = (defaultValue || []).filter(Boolean) as string[];
  const [keys, setKeys] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload gagal");
      setKeys((k) => [...k, data.key]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload gagal");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      {/* hidden input carrying the comma-separated list of storage keys */}
      <input type="hidden" name={name} value={keys.join(",")} />

      {/* uploaded thumbs */}
      {keys.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-3">
          {keys.map((k, i) => (
            <div key={k} className="relative h-24 w-36 overflow-hidden rounded-lg border border-line">
              <Image src={buildAssetUrl(k)} alt="" fill className="object-cover" sizes="144px" unoptimized />
              <button
                type="button"
                aria-label="Hapus gambar"
                onClick={() => setKeys((arr) => arr.filter((_, j) => j !== i))}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-navy px-4 py-2 text-sm font-medium text-navy hover:bg-navy/5">
        {uploading ? "Uploading…" : "+ Tambah Gambar"}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          className="hidden"
          disabled={uploading}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </label>
      <p className="mt-2 text-xs text-mist">JPG, PNG, WebP, GIF, AVIF. Maks 12MB. Tambahkan beberapa gambar untuk carousel.</p>
      {uploading && <p className="mt-1 text-xs text-navy">Mengunggah…</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}