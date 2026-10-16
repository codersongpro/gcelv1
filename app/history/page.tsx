import HistoryView from "@/components/HistoryView";
import Shell from "@/components/Shell";

export const metadata = { title: "내 풀이 기록" };

export default function HistoryPage() {
  return (
    <Shell>
      <HistoryView />
    </Shell>
  );
}
