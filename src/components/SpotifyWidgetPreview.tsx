"use client";

import { useMemo } from "react";

export type WidgetMode = "not-playing" | "playing" | "menu";

interface SpotifyWidgetPreviewProps {
  mode: WidgetMode;
}

const TRACK_TITLE = "De Vervelende Burger: Martine Bijlker";
const TRACK_SUBTITLE = "Opinisten op Spotify";
const TRACK_DURATION = "4:20";

const controlIcons = [
  {
    label: "Shuffle",
    svg: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    label: "Previous",
    svg: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="19 20 9 12 19 4 19 20" />
        <line x1="5" y1="19" x2="5" y2="5" />
      </svg>
    ),
  },
  {
    label: "Play",
    svg: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
      >
        <path d="M7 4.267a1 1 0 0 1 1.555-.832l9.5 6.733a1 1 0 0 1 0 1.664l-9.5 6.733A1 1 0 0 1 7 17.733V4.267Z" />
      </svg>
    ),
  },
  {
    label: "Next",
    svg: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="5 4 15 12 5 20 5 4" />
        <line x1="19" y1="5" x2="19" y2="19" />
      </svg>
    ),
  },
  {
    label: "Repeat",
    svg: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
];

const menuOptions = [
  "Afspelen op Spotify",
  "Volgen op Spotify",
  "Kopieer link",
];

export function SpotifyWidgetPreview({ mode }: SpotifyWidgetPreviewProps) {
  const progressPercent = mode === "playing" ? 42 : 0;

  const statusLabel = useMemo(() => {
    if (mode === "playing") {
      return "Playing";
    }
    if (mode === "menu") {
      return "Options";
    }
    return "Not playing";
  }, [mode]);

  return (
    <div className="relative isolate w-full max-w-3xl">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#102169] via-[#1a37ad] to-[#2752d3] p-6 text-white shadow-[0_40px_80px_-60px_rgba(0,0,0,0.6)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-1 min-w-[220px] items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl font-semibold">
              J
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.38em] text-white/60">
                {statusLabel}
              </span>
              <p className="text-base font-semibold leading-tight sm:text-lg">
                {TRACK_TITLE}
              </p>
              <p className="text-sm text-white/70">{TRACK_SUBTITLE}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-medium text-white/80">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
            <span>{mode === "playing" ? "Live now" : "Off air"}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-white/80">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
            {controlIcons.map((icon) => (
              <button
                key={icon.label}
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                aria-label={icon.label}
              >
                {icon.svg}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="font-semibold">
              {mode === "playing" ? "1:42" : "0:00"}
            </span>
            <div className="relative h-1 w-40 overflow-hidden rounded-full bg-white/20 sm:w-56">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-white"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-white/60">{TRACK_DURATION}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#1a37ad] transition hover:bg-white/80">
            Afspelen op Spotify
          </button>
          <button className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/70 hover:text-white">
            Volgen op Spotify
          </button>
          <button className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/70 transition hover:text-white">
            Kopieer link
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-white/50">
          <button type="button" className="transition hover:text-white">
            Privacy Policy
          </button>
          <span>•</span>
          <button type="button" className="transition hover:text-white">
            Terms
          </button>
          <span>•</span>
          <button type="button" className="transition hover:text-white">
            Contact
          </button>
        </div>

        {mode === "menu" ? (
          <div className="absolute inset-0 rounded-[28px] bg-[#02051a]/95 p-6">
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between text-white/70">
                <span className="text-sm font-semibold uppercase tracking-[0.4em]">
                  Options
                </span>
                <span className="text-xs">•••</span>
              </div>
              <div className="space-y-3">
                {menuOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="flex w-full items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    <span>{option}</span>
                    <span className="text-white/40">↗</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
