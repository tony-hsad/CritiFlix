import React from "react";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

type HomeTemplateProps = {
  children: React.ReactNode;
}

function HomeTemplate({ children }: HomeTemplateProps) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default HomeTemplate;
