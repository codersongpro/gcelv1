import FinishView from "@/components/FinishView";
import Shell from "@/components/Shell";

export const metadata = { title: "실제 시험 응시 안내" };

export default function FinishPage() {
  return (
    <Shell>
      <FinishView />
    </Shell>
  );
}
