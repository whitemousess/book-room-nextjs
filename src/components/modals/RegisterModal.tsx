'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import useLoginModal from "@/src/hooks/useLoginModal";
import useRegisterModal from "@/src/hooks/useRegisterModal";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
      .then(() => {
        toast.success('Đã đăng ký!');
        loginModal.onOpen();
        registerModal.onClose();
        router.refresh();
      })
      .catch((error) => {
        toast.error("Thông tin không hợp lệ");
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const toggleModal = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Chào mừng tới Airbnb"
        subtitle="Tạo tài khoản!"
      />
      <Input
        id="email"
        label="Email ..."
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Tên ..."
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Mật khẩu ..."
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Đăng ký với Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Đăng ký với Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Đã có tài khoản?
          <button
            onClick={toggleModal}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
              ml-2
            "
          >Đăng nhập</button>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Đăng ký"
      actionLabel="Tiếp tục"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
