import type { Metadata } from "next";
import BlogIndex from "@/components/Blog/BlogIndex";
import { getPostSummaries } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Pablo Cruz",
  description: "Textos de Pablo Cruz sobre carreira, produto, o Hone e o que aprende construindo software.",
};

export default async function BlogPage({ searchParams }: PageProps<"/blog">) {
  const { category } = await searchParams;
  return (
    <div className="min-h-screen bg-[#0C0D1F] pt-[16vh] pb-24">
      <BlogIndex all={getPostSummaries()} active={typeof category === "string" ? category : null} />
    </div>
  );
}
