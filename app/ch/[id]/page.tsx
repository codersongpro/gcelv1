import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ChapterView from "@/components/ChapterView";
import Shell from "@/components/Shell";
import { CHAPTERS, chapterById } from "@/content/chapters";

export function generateStaticParams() {
  return CHAPTERS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const ch = chapterById((await params).id);
  return { title: ch ? `${ch.no}. ${ch.title}` : "장" };
}

export default async function ChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const ch = chapterById((await params).id);
  if (!ch) notFound();
  return (
    <Shell>
      <ChapterView ch={ch} />
    </Shell>
  );
}
