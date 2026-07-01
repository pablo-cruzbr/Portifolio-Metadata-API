"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";

const USERNAME = "pablo-cruzbr";

const BG = "050709";
const TEXT = "c9d1d9";
const TITLE = "01A7C0";
const ICON = "01A7C0";
const BORDER = "1e2a3a";

const statsUrl = `https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&bg_color=${BG}&text_color=${TEXT}&icon_color=${ICON}&border_color=${BORDER}&title_color=${TITLE}&include_all_commits=true&count_private=true`;

const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${USERNAME}&layout=compact&bg_color=${BG}&text_color=${TEXT}&border_color=${BORDER}&title_color=${TITLE}&langs_count=8`;

const streakUrl = `https://streak-stats.demolab.com/?user=${USERNAME}&background=${BG}&border=${BORDER}&ring=${TITLE}&fire=${TITLE}&currStreakLabel=${TITLE}&sideLabels=${TEXT}&sideNums=ffffff&currStreakNum=ffffff&dates=${TEXT}`;

const activityUrl = `https://github-readme-activity-graph.vercel.app/graph?username=${USERNAME}&bg_color=${BG}&color=${TITLE}&line=${TITLE}&point=ffffff&area=true&area_color=${TITLE}&hide_border=false&border_color=${BORDER}&radius=8`;

const GitHubStats = () => {
  return (
    <section className="bg-[#050709] py-24 border-t border-white/5">
      <div className="w-[90%] xl:w-[80%] mx-auto">

        <div data-aos="fade-up" className="flex flex-col items-center mb-14">
          <div className="flex items-center gap-3 mb-3">
            <FaGithub className="w-7 h-7 text-white" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              GitHub <span className="text-cyan-400">Stats</span>
            </h2>
          </div>
          <p className="text-gray-400 text-center max-w-xl">
            Atividade e contribuições reais do meu perfil no GitHub.
          </p>
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-sm text-cyan-400 hover:text-cyan-300 transition font-mono"
          >
            @{USERNAME}
          </a>
        </div>

        {/* Stats + Languages */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        >
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <img
              src={statsUrl}
              alt="GitHub Stats"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <img
              src={langsUrl}
              alt="Most Used Languages"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>

        {/* Streak */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="rounded-2xl overflow-hidden border border-white/10 mb-4"
        >
          <img
            src={streakUrl}
            alt="GitHub Streak"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        {/* Contribution graph */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="rounded-2xl overflow-hidden border border-white/10"
        >
          <img
            src={activityUrl}
            alt="GitHub Activity Graph"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
};

export default GitHubStats;
