import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
type IProps = {
  description: string;
  title: string;
  children: React.ReactNode;
};
export default function Layout({ children, description, title }: IProps) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content="React , tailwind , typescript,SEO" />
        <meta name="author" content="Salim Sayed" />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="min-h-[70vh] w-full ">
        <div className=" ">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Book Store",
  description: "Book Store",
};
