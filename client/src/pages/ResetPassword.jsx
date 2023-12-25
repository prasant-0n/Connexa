import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomButton, Loading, TextInput } from "../components";

export default function ResetPassword() {
  const [errMsg, setErrMsg] = useState("");
  const [issubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const onSubmit = async () => {};

  return (
    <div className="w-full h-[100vh] bg-bgColor flex items-center justify-center p-6 ">
      <div className="bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg">
        <p className=" text-ascent-1 md:text-lg text-[14px] font-semibold ">
          Email Address
        </p>
        <span className="text-sm text-ascent-2">
          Enter email address used during registration
        </span>
        <form
          className="py-8 flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            name="email"
            label="Email Address"
            type="email"
            register={register("email", {
              required: "Email Address is Required",
            })}
            styles="w-full rounded-md"
            labelStyles="ml-2"
            error={errors.email ? errors.email.message : ""}
          />
          {errMsg?.message && (
            <span
              className={`text-sm ${
                errMsg?.status === "failed"
                  ? "text-[#f64949fe]"
                  : "text-[#2ba150fe]"
              }mt-0.5`}
            >
              {errMsg?.message}
            </span>
          )}

          {issubmitting ? (
            <Loading />
          ) : (
            <CustomButton
              type="submit"
              containerStyles={
                "inline-flex justify-center rounded-md hover:bg-[#004080] transition duration-300 ease-in-out bg-[#065ad8] px-8 py-3 text-sm font-medium text-white outline-none mt-2 "
              }
              title="Login"
            />
          )}
        </form>
        {/* <div className="flex flex-col justify-center pt-5 pb-10 border-t border-gray-800 sm:flex-row text-sm text-ascent-2"> */}
        <p className=" flex justify-center mt-4 md:text-xs text-[6px] text-ascent-2 text-gray-900 items-center cursor-pointer">
          &copy; 2023 Connexa | Privacy Policy | Terms of Service
        </p>
        <p className=" flex justify-center mt-1 md:text-xs text-[6px] text-ascent-2 text-gray-900 items-center cursor-pointer">
          Designed by Prashant ~
        </p>

        {/* </div> */}
      </div>
    </div>
  );
}
