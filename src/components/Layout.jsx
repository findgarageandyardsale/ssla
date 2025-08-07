import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Home/components/Footer";

const Layout = ({
  children,
  isOpenModal,
  setIsOpenModal,
  isOpenCalendarModal,
  setIsOpenCalendarModal,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        isOpenCalendarModal={isOpenCalendarModal}
        setIsOpenCalendarModal={setIsOpenCalendarModal}
      />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
