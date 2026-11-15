"use client";
import { useEffect } from "react";
import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity.types";

export default function SiteSettingsClient({
  settings,
}: {
  settings: SITE_SETTINGS_QUERY_RESULT;
}) {
  useEffect(() => {
    if (!settings) return;

    const root = document.documentElement;

    if (settings.primaryColor) {
      root.style.setProperty("--primary", settings.primaryColor);
    }
    if (settings.secondaryColor) {
      root.style.setProperty("--secondary", settings.secondaryColor);
    }
    if (settings.accentColor) {
      root.style.setProperty("--accent", settings.accentColor);
    }

    if (settings.siteTitle) {
      document.title = settings.siteTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta && settings.siteDescription) {
        meta.setAttribute("content", settings.siteDescription);
      }
    }

    const favicon = settings.favicon?.asset?.url;
    if (favicon) {
      const link = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
      if (link) {
        link.href = favicon;
      } else {
        const newLink = document.createElement("link");
        newLink.rel = "icon";
        newLink.href = favicon;
        document.head.appendChild(newLink);
      }
    }

    // Optionally handle maintenance mode by toggling a data-attribute on body
    if (typeof settings.maintenanceMode !== "undefined") {
      if (settings.maintenanceMode) {
        document.body.setAttribute("data-maintenance", "true");
      } else {
        document.body.removeAttribute("data-maintenance");
      }
    }
  }, [settings]);

  return null;
}
