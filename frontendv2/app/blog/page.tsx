import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PostMeta from "@/components/Blog/PostMeta";
import { categories, getPostSummaries } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Pablo Cruz",
  description: "Textos de Pablo Cruz sobre carreira, produto, o Hone e o que aprende construindo software.",
};

const HONE_LIVE = "https://labs.borderlesscoding.com/ai-mock-interview";

export default async function BlogPage({ searchParams }: PageProps<"/blog">) {
  const { category } = await searchParams;
  const all = getPostSummaries();
  const active = typeof category === "string" ? category : null;
  const posts = active ? all.filter((p) => p.category === active) : all;
  const honePost = all.find((p) => p.featured);

  const chip = (selected: boolean) =>
    `px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
      selected ? "bg-[#01A7C0] border-[#01A7C0] text-white" : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-[#0C0D1F] pt-[16vh] pb-24">
      <div className="mx-auto w-[90%] max-w-4xl">
        <p className="font-mono text-sm text-cyan-400">{"// blog"}</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white">
          O que eu aprendo <span className="text-cyan-300">construindo</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-400">
          Histórias reais de carreira, produto e código: o que deu certo, o que deu errado e o que eu faria diferente.
        </p>

        {honePost && (
          <section className="relative mt-12 overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
            <div className="grid md:grid-cols-[1fr_1.1fr]">
              <div className="relative min-h-56">
                <Image
                  src="/images/blog/pablo-borderless-conference.jpg"
                  alt="Pablo Cruz na Borderless Conference"
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover object-[92%_center]"
                  priority
                />
              </div>
              <div className="flex flex-col gap-4 p-6 sm:p-8">
                <span className="w-fit rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-400">
                  🥈 Co-founder do Hone · Borderless Labs (EUA)
                </span>
                <h2 className="text-2xl font-bold text-white">{honePost.title}</h2>
                <p className="text-sm leading-relaxed text-gray-300">{honePost.description}</p>
                <div className="mt-auto flex flex-wrap gap-3 pt-2">
                  <Link
                    href={`/blog/${honePost.slug}`}
                    className="px-5 py-2.5 rounded-lg bg-[#01A7C0] hover:bg-[#019ab1] text-sm font-semibold text-white transition-all"
                  >
                    Ler a história
                  </Link>
                  <a
                    href={HONE_LIVE}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-semibold text-white transition-all"
                  >
                    Testar o Hone ↗
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        <nav aria-label="Categorias" className="mt-12 flex flex-wrap gap-2">
          <Link href="/blog" className={chip(!active)}>
            Todos
          </Link>
          {categories(all).map((c) => (
            <Link key={c} href={`/blog?category=${encodeURIComponent(c)}`} className={chip(active === c)}>
              {c}
            </Link>
          ))}
        </nav>

        {posts.length === 0 && <p className="mt-12 text-gray-400">Nenhum post nessa categoria ainda.</p>}

        <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block space-y-3 py-8">
                <PostMeta post={post} />
                <h2 className="text-xl md:text-2xl font-bold text-white transition-colors group-hover:text-cyan-300">
                  {post.title}
                </h2>
                <p className="leading-relaxed text-gray-400">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
