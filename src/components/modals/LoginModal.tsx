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

const LoginModal = () => {
  const router = useRouter();
  const LoginModal = useLoginModal();
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
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    })
    .then((callback => {
      setIsLoading(false);
      if(callback?.ok) {
        toast.success("Đã đăng ký")
        router.refresh();
        LoginModal.onClose();
      } 

      if(callback?.error) {
        toast.error(callback.error);
      }
    }))
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Chào mừng trở lại"
        subtitle="Đăng nhập!"
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
        label="Tiếp tục với Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Tiếp tục với Github"
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
        <p>Tôi chưa có tài khoản
          <button
            onClick={() => {
              registerModal.onOpen();
              LoginModal.onClose();
            }}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
              ml-2
            "
          >Đăng ký</button>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={LoginModal.isOpen}
      title="Đăng nhập"
      actionLabel="Tiếp tục"
      onClose={LoginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
