"use client";

import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { FaGithub } from "react-icons/fa";

const USERNAME = "pablo-cruzbr";

const streakUrl =
  `https://streak-stats.demolab.com/?user=${USERNAME}` +
  `&background=050709&border=ffffff10&ring=01A7C0&fire=01A7C0` +
  `&currStreakLabel=01A7C0&sideLabels=4b5563&sideNums=e5e7eb` +
  `&currStreakNum=ffffff&dates=4b5563&hide_border=false&border_radius=10`;

const GitHubStats = () => {
  return (
    <section className="bg-[#050709] py-10 border-t border-white/5">
      <div className="w-[90%] xl:w-[80%] mx-auto">

        <div data-aos="fade-up" className="flex items-center gap-2 mb-6">
          <FaGithub className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-semibold text-white">GitHub Stats</span>
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-600 hover:text-cyan-400 transition font-mono"
          >
            @{USERNAME}
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-3 items-center">
          {/* Contribution Calendar */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="bg-[#0a0f1a] rounded-xl border border-white/[0.06] p-4 overflow-x-auto"
          >
            <GitHubCalendar
              username={USERNAME}
              colorScheme="dark"
              theme={{
                dark: ["#0a0f1a", "#013a4a", "#015e77", "#0189ae", "#01A7C0"],
              }}
              fontSize={12}
              blockSize={13}
              blockMargin={4}
              blockRadius={2}
              hideColorLegend={false}
              hideTotalCount={false}
            />
          </div>

          {/* Streak */}
          <div data-aos="fade-up" data-aos-delay="150" className="shrink-0">
            <img
              src={streakUrl}
              alt="GitHub Streak"
              className="rounded-xl border border-white/[0.06] w-full lg:w-[420px]"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default GitHubStats;
