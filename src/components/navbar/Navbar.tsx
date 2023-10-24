import { SafeUser } from "@/src/types";
import Container from "~/components/Container";
import LoginModal from "~/components/modals/LoginModal";
import RegisterModal from "~/components/modals/RegisterModal";
import RentModal from "~/components/modals/RentModal";
import SearchModal from "~/components/modals/SearchModal";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: SafeUser | null;

}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
        <Container>
          <div
            className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
          >
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />

            <RegisterModal />
            <LoginModal />
            <SearchModal />
            <RentModal />
          </div>
        </Container>

        <Categories />
      </div>
    </div>
  );
}


export default Navbar;