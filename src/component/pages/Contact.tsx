import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import Layout from "../Layouts/Layout";

export default function Contact() {
  return (
    <Layout title="ContactUs" description="contact us page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-[90%] mx-auto mt-8">
        <img src="contactus.jpeg" alt="" className="w-full" />
        <div className="col-md-4">
          <h1 className=" bg-black p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3 flex items-center gap-2">
            <BiMailSend /> : salemsayed981@gmail.com
          </p>
          <p className="mt-3 flex items-center gap-2">
            <BiPhoneCall /> : 01062913674
          </p>
          <p className="mt-3 flex items-center gap-2">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
}
