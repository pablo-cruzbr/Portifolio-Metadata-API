"use client";

import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { FaGithub } from "react-icons/fa";

const USERNAME = "pablo-cruzbr";

const streakUrl =
  `https://streak-stats.demolab.com/?user=${USERNAME}` +
  `&background=0d1117&border=1e2a3a&ring=01A7C0&fire=01A7C0` +
  `&currStreakLabel=01A7C0&sideLabels=8b949e&sideNums=ffffff` +
  `&currStreakNum=ffffff&dates=8b949e&hide_border=false&border_radius=12`;

const GitHubStats = () => {
  return (
    <section className="bg-[#050709] py-14 border-t border-white/5">
      <div className="w-[90%] xl:w-[80%] mx-auto">

        {/* Header */}
        <div data-aos="fade-up" className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <FaGithub className="w-5 h-5 text-white" />
            <h2 className="text-xl font-bold text-white">
              GitHub <span className="text-cyan-400">Stats</span>
            </h2>
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-cyan-400 transition font-mono ml-2"
            >
              @{USERNAME}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Streak */}
          <div data-aos="fade-up" data-aos-delay="100">
            <img
              src={streakUrl}
              alt="GitHub Streak"
              className="w-full rounded-xl border border-white/10"
              loading="lazy"
            />
          </div>

          {/* Contribution Calendar */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="bg-[#0d1117] rounded-xl border border-white/10 p-4 overflow-x-auto"
          >
            <GitHubCalendar
              username={USERNAME}
              colorScheme="dark"
              theme={{
                dark: ["#0d1117", "#013a4a", "#015e77", "#0189ae", "#01A7C0"],
              }}
              fontSize={11}
              blockSize={11}
              blockMargin={3}
              blockRadius={2}
              hideColorLegend={false}
              hideTotalCount={false}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default GitHubStats;
