"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaMapMarkerAlt } from "react-icons/fa";
import { useLang } from "@/context/LanguageContext";
import { translations } from "@/translations";

interface GitHubUser {
  name: string | null;
  login: string;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  created_at: string;
}

interface GitHubRepo {
  name: string;
  html_url: string;
  language: string | null;
  pushed_at: string;
  fork: boolean;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  CSS: "#663399",
  HTML: "#e34c26",
  Python: "#3572A5",
};

const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Counts from 0 up to `value` once it is set (after Magic UI's NumberTicker). */
function Ticker({ value }: { value: number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (reduceMotion()) {
      setShown(value);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1200);
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <>{shown}</>;
}

/** Live GitHub profile header: data comes from the public GitHub API in the visitor's browser. */
export default function GitHubHeader({ username }: { username: string }) {
  const { lang } = useLang();
  const t = translations[lang].githubStats;
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [failed, setFailed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const api = `https://api.github.com/users/${username}`;
    Promise.all([
      fetch(api).then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
      fetch(`${api}/repos?sort=pushed&per_page=10`).then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
    ])
      .then(([u, r]: [GitHubUser, GitHubRepo[]]) => {
        setUser(u);
        // Skip forks and the profile README repo: they are not projects.
        setRepos(r.filter((repo) => !repo.fork && repo.name !== username).slice(0, 3));
      })
      .catch(() => setFailed(true));
  }, [username]);

  // Spotlight (after Aceternity): a soft light that follows the pointer inside the card.
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  const ago = (iso: string) => {
    const days = Math.round((Date.now() - new Date(iso).getTime()) / 86_400_000);
    const rtf = new Intl.RelativeTimeFormat(lang === "en" ? "en" : "pt-BR", { numeric: "auto" });
    if (days < 1) {
      const hours = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 3_600_000));
      return rtf.format(-hours, "hour");
    }
    return days < 30 ? rtf.format(-days, "day") : rtf.format(-Math.round(days / 30), "month");
  };

  // Without the API (rate limit, offline) the section still shows the calendar and the streak below.
  if (failed) return null;

  // Whole years since the account was created, so it never rounds up.
  const years = user ? Math.floor((Date.now() - new Date(user.created_at).getTime()) / (365.25 * 86_400_000)) : 0;
  const stats = user
    ? [
        { value: user.public_repos, label: t.repos },
        { value: user.followers, label: t.followers },
        { value: years, label: t.years, prefix: "+" },
      ]
    : [];

  return (
    <div className="border-beam rounded-2xl p-px" data-aos="fade-up">
      <div
        ref={cardRef}
        onPointerMove={onMove}
        className="group relative overflow-hidden rounded-2xl bg-[#0a0f1a] p-6 sm:p-8"
      >
        {/* Spotlight layer */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(420px circle at var(--spot-x) var(--spot-y), rgba(34,211,238,0.10), transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          {/* Who */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {user ? (
              // eslint-disable-next-line @next/next/no-img-element -- avatar comes from GitHub's CDN at runtime
              <img
                src={user.avatar_url}
                alt={user.name ?? user.login}
                className="h-20 w-20 shrink-0 rounded-2xl border border-white/10 ring-2 ring-cyan-400/30 ring-offset-4 ring-offset-[#0a0f1a]"
              />
            ) : (
              <div className="h-20 w-20 shrink-0 animate-pulse rounded-2xl bg-white/5" />
            )}
            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-2xl font-bold text-white">{user ? user.name ?? user.login : <span className="inline-block h-7 w-40 animate-pulse rounded bg-white/5" />}</h3>
                <a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-gray-500 transition-colors hover:text-cyan-400"
                >
                  @{username}
                </a>
              </div>
              {user?.bio && <p className="text-sm leading-relaxed text-gray-400">{user.bio}</p>}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
                {user?.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <FaMapMarkerAlt className="h-3 w-3 text-cyan-400" aria-hidden="true" />
                    {user.location}
                  </span>
                )}
                {repos[0] && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-emerald-300">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    {t.lastPush} {ago(repos[0].pushed_at)}
                  </span>
                )}
              </div>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-cyan-100"
              >
                <FaGithub className="h-4 w-4" aria-hidden="true" />
                {t.follow}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Numbers and recent work */}
          <div className="space-y-5">
            <dl className="grid grid-cols-3 gap-3">
              {(stats.length ? stats : [0, 1, 2]).map((s, i) =>
                typeof s === "number" ? (
                  <div key={i} className="h-[70px] animate-pulse rounded-xl bg-white/5" />
                ) : (
                  <div key={s.label} className="rounded-xl border border-white/10 bg-white/3 px-3 py-3 text-center">
                    <dd className="text-2xl font-bold text-white tabular-nums">
                      {s.prefix}
                      <Ticker value={s.value} />
                    </dd>
                    <dt className="mt-0.5 text-[11px] uppercase tracking-wider text-gray-500">{s.label}</dt>
                  </div>
                )
              )}
            </dl>

            {repos.length > 0 && (
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">{t.recent}</p>
                <ul className="flex flex-wrap gap-2">
                  {repos.map((repo) => (
                    <li key={repo.name}>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/3 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-cyan-400/40 hover:text-white"
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: LANGUAGE_COLORS[repo.language ?? ""] ?? "#6b7280" }}
                          aria-hidden="true"
                        />
                        {repo.name}
                        <span className="text-gray-500">· {ago(repo.pushed_at)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
