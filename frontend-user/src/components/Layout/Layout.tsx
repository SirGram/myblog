import { ReactNode, useEffect, useState } from "react";
import Nav from "../Nav";
import SocialMedia from "../SocialMedia";
import { IBlogEntry } from "@/types/types";
import { useBlogsQuery } from "@/api/queries";
import { Toaster } from "../ui/toaster";
import SearchContent from "./components/SearchContent";
import TopPosts from "./components/TopPosts";
import NewsLetter from "./components/NewsLetter";

export default function Layout({
  showAside = true,
  children,
}: {
  showAside?: boolean;
  children: ReactNode;
}) {
  const { data = [] } = useBlogsQuery();
  const posts: IBlogEntry[] = Array.isArray(data)
    ? [...data].sort((a, b) => b.likes - a.likes)
    : [];
  const topPosts = posts.slice(0, 3);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      <div className="min-h-screen flex flex-col relative">
        <Nav visible={visible} />
        <main className=" flex flex-col lg:flex-row gap-4 lg:gap-0 justify-center flex-1  ">
          <section className="  md:col-span-1 flex justify-center flex-1 w-full pb-20">
            {children}
          </section>
          {showAside && (
            <aside className="container lg:col-span-1 lg:border-l-4 p-4  flex flex-col gap-12  lg:w-96 bg-secondary text-foreground pb-40">
              <SearchContent />
              <TopPosts topPosts={topPosts} />
              <NewsLetter />
            </aside>
          )}
        </main>
        <Toaster />
        <SocialMedia />
      </div>
    </>
  );
}
