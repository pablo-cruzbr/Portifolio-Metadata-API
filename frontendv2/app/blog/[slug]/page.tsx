import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PostView from "@/components/Blog/PostView";
import { getPost, getPostSummaries } from "@/lib/posts";

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

  return (
    <div className="min-h-screen bg-[#0C0D1F] pt-[16vh] pb-24">
      <PostView
        post={posts[index]}
        bodyPt={<ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>}
        bodyEn={post.contentEn ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.contentEn}</ReactMarkdown> : null}
        newer={posts[index - 1]}
        older={posts[index + 1]}
      />
    </div>
  );
}
