import React from "react";
import Div from "../atoms/Div";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

/**
 * The Home page template that contains main components
 *
 * @param {object} props component's customisable properties
 * @param {React.ReactNode} [props.children] Childrens of the HomeTemplate component
 * @returns {React.ReactNode} The basic HTML structure
 */
function HomeTemplate({ children }) {
  return (
    <Div classname="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-8">
        {children}
      </main>
      <Footer />
    </Div>
  );
}

export default HomeTemplate;
