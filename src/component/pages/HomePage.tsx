import MainCarousel from "../Carousel/MainCarousel";
import Products from "../Home/Products";
import Layout from "../Layouts/Layout";

export default function HomePage() {
  return (
    <Layout title="Home| Book Store" description="Home Page">
      <MainCarousel />
      <div className="pb-8">
        <Products />
      </div>
    </Layout>
  );
}
