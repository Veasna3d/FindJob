import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";

const SignUp = ({open, setOpen}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isRegister, setIsRegister] = useState(false);
  const [accountType, setAccountType] = useState("seeker");

  const [errMsg, setErrMsg] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  let from = location.state?.from?.pathname || "/";

  const closeModal = () => setOpen(false);
  const onSubmit = () => {};

  return (
    <>
      <Transition appear show={open || false}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-md transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title>
                    {isRegister ? "Create Account" : "Account Sign In"}
                  </Dialog.Title>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SignUp;
