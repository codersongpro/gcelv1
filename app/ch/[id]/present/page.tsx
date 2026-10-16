import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PresentView from "@/components/PresentView";
import { CHAPTERS, chapterById } from "@/content/chapters";

export function generateStaticParams() {
  return CHAPTERS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const ch = chapterById((await params).id);
  return { title: ch ? `발표 · ${ch.no}. ${ch.title}` : "발표" };
}

// 발표 화면은 머리말·꼬리말 없이 화면 전체를 쓴다.
export default async function PresentPage({ params }: { params: Promise<{ id: string }> }) {
  const ch = chapterById((await params).id);
  if (!ch) notFound();
  return <PresentView ch={ch} />;
}
