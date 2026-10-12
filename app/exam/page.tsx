import ExamView from "@/components/ExamView";
import Shell from "@/components/Shell";

export const metadata = { title: "최종 모의고사" };

export default function ExamPage() {
  return (
    <Shell>
      <ExamView />
    </Shell>
  );
}
