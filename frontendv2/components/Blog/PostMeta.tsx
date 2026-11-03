import { formatDate, type PostSummary } from "@/lib/postFormat";

export default function PostMeta({ post }: { post: PostSummary }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-400">
      <span className="rounded-full bg-blue-950 px-3 py-1 font-bold text-white">{post.category}</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readingMinutes} min de leitura</span>
      {post.draft && (
        <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-bold text-amber-300">
          Rascunho
        </span>
      )}
    </div>
  );
}
