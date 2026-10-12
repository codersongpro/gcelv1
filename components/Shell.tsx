import Header from "./Header";
import Footer from "./Footer";
import { WelcomeName } from "./NameEditor";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WelcomeName />
    </>
  );
}
