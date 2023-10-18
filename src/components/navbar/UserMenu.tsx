'use client';

import { signOut } from "next-auth/react";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/navigation";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { SafeUser } from "@/src/types";
import useRegisterModal from "@/src/hooks/useRegisterModal";
import useLoginModal from "@/src/hooks/useLoginModal";
import useRentModal from "@/src/hooks/useRentModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    }
    else {
      rentModal.onOpen();
    }
  }, [currentUser, loginModal, rentModal])


  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Thuê phòng qua Airbnd
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ?
              <>
                <MenuItem
                  label="Chuyến đi của tôi"
                  onClick={() => router.push('/trips')}
                />
                <MenuItem
                  label="Mục yêu thích của tôi"
                  onClick={() => { }}
                />
                <MenuItem
                  label="Chỗ đã dặt"
                  onClick={() => { }}
                />
                <MenuItem
                  label="Thêm phòng"
                  onClick={rentModal.onOpen} />
                <MenuItem
                  label="Tài sản"
                  onClick={() => { }}
                />
                <MenuItem
                  label="Đăng xuất"
                  onClick={() => signOut()}
                />
              </> :
              <>
                <MenuItem
                  label="Đăng nhập"
                  onClick={loginModal.onOpen}
                />
                <MenuItem
                  label="Đăng ký"
                  onClick={registerModal.onOpen}
                />
              </>
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;