 

// Use const or function before the component name
const MainCarousel = () => {
  return (
    <>
      <div className=" w-full h-[50vh] cursor-pointer flex justify-center gap-4 ">
        <img alt="Card background" src="/slider/banner1.jpg" className="hidden md:block" />
    <img alt="Card background" src="/slider/banner2.jpg" /> 
    <img alt="Card background" src="/slider/banner3.jpg"  className="hidden lg:block"/> 
      </div>
    </>
  );
};

export default MainCarousel;
