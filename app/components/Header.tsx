
import PopupInfo from "./PopupInfo";
const Header = () => {
  return (
    <section className="h-[65vh] md:h-screen flex flex-col justify-center md:justify-end md:pb-[35vh] items-center header relative">
      <div className="relative z-10">
      <h1 className="text-3xl lg:text-8xl font-semibold text-white text-center mb-10">
        Vote Your Favourite <br /> Ambassador
      </h1>
      <PopupInfo value={"Vote Favourite Ambassador"} style={true}/>
      </div>
    </section>
  );
};

export default Header;
