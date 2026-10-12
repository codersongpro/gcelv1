import ReviewView from "@/components/ReviewView";
import Shell from "@/components/Shell";

export const metadata = { title: "오답 노트" };

export default function ReviewPage() {
  return (
    <Shell>
      <ReviewView />
    </Shell>
  );
}
