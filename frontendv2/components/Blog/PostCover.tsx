import Image from "next/image";

/** A post's cover filling its (relative, sized) parent; posts without one get a gradient with the category. */
export default function PostCover({ cover, category, sizes }: { cover: string | null; category: string; sizes: string }) {
  if (cover) {
    return (
      <Image
        src={cover}
        alt=""
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  return (
    <div className="absolute inset-0 flex items-end bg-gradient-to-br from-cyan-500/25 via-blue-600/15 to-purple-600/25 p-4">
      <span className="font-mono text-sm font-bold text-cyan-200/80">{`// ${category}`}</span>
    </div>
  );
}
