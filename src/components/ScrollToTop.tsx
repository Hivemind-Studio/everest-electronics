"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Scroll to top on every route change. Hash anchors (#layanan etc.) don't
   change the pathname, so in-page anchor scrolling still works. */
export function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
