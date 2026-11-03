import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PostMeta from "@/components/Blog/PostMeta";
import { getPost, getPostSummaries } from "@/lib/posts";

const HONE_LIVE = "https://labs.borderlesscoding.com/ai-mock-interview";

export function generateStaticParams() {
  return getPostSummaries().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: `${post.title} — Pablo Cruz`, description: post.description } : {};
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const posts = getPostSummaries();
  const index = posts.findIndex((p) => p.slug === slug);
  const newer = posts[index - 1];
  const older = posts[index + 1];

  return (
    <div className="min-h-screen bg-[#0C0D1F] pt-[16vh] pb-24">
      <article className="mx-auto w-[90%] max-w-2xl">
        <Link href="/blog" className="group inline-flex items-center text-sm text-gray-400 transition-colors hover:text-cyan-300">
          <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span> Blog
        </Link>

        <header className="mt-8 space-y-5">
          <PostMeta post={post} />
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-white">{post.title}</h1>
          <p className="text-lg leading-relaxed text-gray-400">{post.description}</p>
        </header>

        <hr className="my-10 border-dashed border-white/10" />

        <div className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-cyan-300 prose-strong:text-white prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-code:text-cyan-200">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        <hr className="my-12 border-dashed border-white/10" />

        <aside className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <Image
            src="/images/blog/pablo-borderless-conference.jpg"
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-full border border-white/10 object-cover object-[92%_center]"
          />
          <div className="space-y-2">
            <p className="font-bold text-white">Pablo Cruz</p>
            <p className="text-sm leading-relaxed text-gray-400">
              Desenvolvedor Full Stack com foco em back-end e IA. Co-founder do{" "}
              <a href={HONE_LIVE} target="_blank" rel="noreferrer" className="font-semibold text-cyan-300 hover:underline">
                Hone AI Mock Interview
              </a>
              , produto do Borderless Labs.
            </p>
            <div className="flex gap-4 text-sm font-semibold">
              <a href="https://www.linkedin.com/in/pablo-cruz-5b937525b/" target="_blank" rel="noreferrer" className="text-white hover:text-cyan-300">
                LinkedIn
              </a>
              <a href="https://github.com/pablo-cruzbr" target="_blank" rel="noreferrer" className="text-white hover:text-cyan-300">
                GitHub
              </a>
            </div>
          </div>
        </aside>

        {(newer || older) && (
          <nav aria-label="Outros posts" className="mt-8 grid gap-4 sm:grid-cols-2">
            {older ? (
              <Link href={`/blog/${older.slug}`} className="rounded-xl border border-white/10 p-4 transition-all hover:bg-white/5">
                <span className="text-xs text-gray-400">← Anterior</span>
                <span className="mt-1 block text-sm font-semibold text-white">{older.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link href={`/blog/${newer.slug}`} className="rounded-xl border border-white/10 p-4 text-right transition-all hover:bg-white/5">
                <span className="text-xs text-gray-400">Próximo →</span>
                <span className="mt-1 block text-sm font-semibold text-white">{newer.title}</span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </div>
  );
}
