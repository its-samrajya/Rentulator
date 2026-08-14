"use client";

import { useEffect } from "react";

export function BodyPointerEventsFix() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const hasOpenOverlay = document.querySelector(
        '[data-state="open"][role="dialog"], [data-state="open"][role="alertdialog"], [data-state="open"][role="menu"]',
      );
      if (document.body.style.pointerEvents === "none" && !hasOpenOverlay) {
        document.body.style.pointerEvents = "";
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
