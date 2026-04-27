import Div from "../atoms/Div";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

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
