"use client";

import React from "react";
import GitHubCalendar from "react-github-calendar";
import { FaGithub } from "react-icons/fa";

const USERNAME = "pablo-cruzbr";

const streakUrl =
  `https://streak-stats.demolab.com/?user=${USERNAME}` +
  `&background=0d1117&border=1e2a3a&ring=01A7C0&fire=01A7C0` +
  `&currStreakLabel=01A7C0&sideLabels=8b949e&sideNums=ffffff` +
  `&currStreakNum=ffffff&dates=8b949e&hide_border=false&border_radius=12`;

const GitHubStats = () => {
  return (
    <section className="bg-[#050709] py-20 border-t border-white/5">
      <div className="w-[90%] xl:w-[80%] mx-auto">

        {/* Header */}
        <div data-aos="fade-up" className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 mb-2">
            <FaGithub className="w-6 h-6 text-white" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              GitHub <span className="text-cyan-400">Stats</span>
            </h2>
          </div>
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition font-mono mt-1"
          >
            @{USERNAME}
          </a>
        </div>

        {/* Streak */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="flex justify-center mb-6"
        >
          <img
            src={streakUrl}
            alt="GitHub Streak"
            className="w-full max-w-2xl rounded-2xl border border-white/10"
            loading="lazy"
          />
        </div>

        {/* Contribution Calendar */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="bg-[#0d1117] rounded-2xl border border-white/10 p-6 overflow-x-auto"
        >
          <p className="text-xs text-gray-500 font-mono mb-4 uppercase tracking-widest">
            Contribution Graph
          </p>
          <GitHubCalendar
            username={USERNAME}
            colorScheme="dark"
            theme={{
              dark: ["#0d1117", "#013a4a", "#015e77", "#0189ae", "#01A7C0"],
            }}
            fontSize={12}
            blockSize={13}
            blockMargin={4}
            blockRadius={3}
          />
        </div>

      </div>
    </section>
  );
};

export default GitHubStats;
