"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  SpotifyWidgetPreview,
  WidgetMode,
} from "../components/SpotifyWidgetPreview";

const DEFAULT_TRACK_URL =
  "https://open.spotify.com/track/23UBSdCPcsloNVmQZ508Zv?si=08254db9960c4996";

const widgetModes: { id: WidgetMode; label: string; helper: string }[] = [
  {
    id: "not-playing",
    label: "Not playing",
    helper: "Base state with idle controls",
  },
  {
    id: "playing",
    label: "Playing",
    helper: "Active playback with progress",
  },
  {
    id: "menu",
    label: "Menu",
    helper: "Overflow menu expanded",
  },
];

function toEmbedUrl(input: string): string | null {
  if (!input) {
    return null;
  }

  const trimmed = input.trim();

  const trackMatch = trimmed.match(
    /(?:track\/|spotify:track:|track%2F)([a-zA-Z0-9]{22})/
  );

  if (trackMatch?.[1]) {
    return `https://open.spotify.com/embed/track/${trackMatch[1]}?utm_source=generator`;
  }

  try {
    const url = new URL(trimmed);
    if (url.hostname === "open.spotify.com" && url.pathname.startsWith("/embed/track/")) {
      const trackId = url.pathname.split("/").filter(Boolean).pop();
      if (trackId) {
        return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export default function HomePage() {
  const [widgetMode, setWidgetMode] = useState<WidgetMode>("not-playing");
  const [adminInput, setAdminInput] = useState(DEFAULT_TRACK_URL);
  const [submittedLink, setSubmittedLink] = useState(DEFAULT_TRACK_URL);
  const [error, setError] = useState<string | null>(null);

  const embedUrl = useMemo(() => toEmbedUrl(submittedLink), [submittedLink]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedEmbed = toEmbedUrl(adminInput);
    if (!parsedEmbed) {
      setError("We couldn't recognise that Spotify track link. Try copying it from the Share menu in Spotify.");
      return;
    }

    setError(null);
    setSubmittedLink(adminInput.trim());
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 lg:flex-row lg:items-start">
        <section className="flex-1 space-y-10">
          <header className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              Spotify widget
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Curate a Spotify-powered radio moment
            </h1>
            <p className="max-w-2xl text-base text-white/70 sm:text-lg">
              Drop any Spotify track into the admin console and preview how it sits across widget states. The live embed below stays in sync so you can hear the track instantly.
            </p>
          </header>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
              Widget states
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {widgetModes.map((mode) => {
                const isActive = widgetMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setWidgetMode(mode.id)}
                    className={`flex flex-col items-start rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-white bg-white/10 text-white"
                        : "border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <span className="text-sm font-semibold">{mode.label}</span>
                    <span className="text-xs text-white/60">{mode.helper}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <SpotifyWidgetPreview mode={widgetMode} />

          <div className="rounded-[26px] border border-white/10 bg-white/5 p-6 shadow-[0_40px_80px_-60px_rgba(0,0,0,0.6)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Live Spotify embed</h3>
                <p className="text-sm text-white/60">
                  The official Spotify player below uses the link from the admin panel. Hit play to hear the track instantly.
                </p>
              </div>
              {embedUrl ? (
                <a
                  href={submittedLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:bg-white/20"
                >
                  Open track ↗
                </a>
              ) : null}
            </div>
            <div className="mt-6 overflow-hidden rounded-3xl">
              {embedUrl ? (
                <iframe
                  key={embedUrl}
                  src={embedUrl}
                  width="100%"
                  height="152"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="h-[152px] w-full border-0"
                  title="Spotify player"
                />
              ) : (
                <div className="flex h-[152px] items-center justify-center rounded-3xl border border-dashed border-white/20 text-sm text-white/60">
                  Paste a Spotify track link in the admin console to activate the player.
                </div>
              )}
            </div>
          </div>
        </section>

        <aside className="w-full max-w-md rounded-[32px] border border-white/10 bg-white text-slate-950 shadow-[0_40px_80px_-60px_rgba(15,23,42,0.6)]">
          <div className="rounded-[32px] bg-gradient-to-b from-white to-slate-100 p-8">
            <h2 className="text-lg font-semibold text-slate-900">Admin console</h2>
            <p className="mt-2 text-sm text-slate-500">
              Paste any Spotify track URL. We support the share links from the Spotify app as well as spotify: URIs.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="spotify-url" className="text-sm font-semibold text-slate-700">
                  Spotify track link
                </label>
                <input
                  id="spotify-url"
                  name="spotify-url"
                  type="url"
                  value={adminInput}
                  onChange={(event) => setAdminInput(event.target.value)}
                  placeholder="https://open.spotify.com/track/..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-inner focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
                <p className="text-xs text-slate-500">
                  Tip: right-click a track in Spotify → Share → Copy link.
                </p>
              </div>

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                className="w-full rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                Update widget
              </button>
            </form>

            <dl className="mt-8 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <dt className="font-semibold text-slate-700">Current embed</dt>
                <dd className="max-w-[180px] truncate text-right text-xs text-slate-500">
                  {embedUrl ?? "No embed active"}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="font-semibold text-slate-700">Widget state</dt>
                <dd className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  {widgetMode.replace("-", " ")}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </main>
  );
}
