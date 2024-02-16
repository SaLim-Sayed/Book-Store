import { Divider } from "antd";
import Layout from "../Layouts/Layout";

export default function About() {
  return (
    <Layout title="About" description="About Page">
      <div className="grid grid-cols-1 justify-center items-center gap-4 md:grid-cols-2 w-[90%] mx-auto mt-8">
        <img src="about.jpeg" alt="" className="w-full" />
        <div className="col-md-4">
          <h1 className=" bg-black p-2 text-white text-center">ABOUT US</h1>
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            fugiat illum velit id veritatis blanditiis dolores earum, cumque
            iure ratione temporibus veniam? Consequatur autem cumque quo animi
            doloremque accusantium officia?Lorem ipsum dolor sit amet
            consectetur adipisicing elit. 
            
          </p>
          <Divider/>
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            fugiat illum velit id veritatis blanditiis dolores earum, cumque
            iure ratione temporibus veniam? Consequatur autem cumque quo animi
            doloremque accusantium officia?Lorem ipsum dolor sit amet
            consectetur adipisicing elit. 
            
          </p>
        </div>
      </div>
    </Layout>
  );
}
