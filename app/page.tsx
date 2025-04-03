import FooterNav from "./common/FooterNav";
import MainHeader from "./components/MainHeader";
import Reservation from "./components/Reservation/Reservation";
// import Ticket from "./components/Ticket/Ticket";
import Footer from "./components/Footer/Footer";
import History from "./components/History/History";
import UserStatus from "./components/UserStatus";

export default function Home() {

  return (
    <div className="bg-[#f0f0f0] flex flex-col gap-8 w-full">
      <MainHeader />
      <UserStatus />
      <Reservation />
      {/* <Ticket /> */}
      <History />
      <Footer />
      <FooterNav currentpage="home" />
    </div>
  );
}