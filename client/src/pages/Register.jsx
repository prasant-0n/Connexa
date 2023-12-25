import React, { useState } from "react";
import { FcAbout } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Loading, TextInput, CustomButton } from "../components";
import { BgImage } from "../assets";
import { BsShareFill } from "react-icons/bs";

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  // eslint-disable-next-line no-unused-vars
  const [errMsg, setErrMsg] = useState();
  const [issubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = async () => {};
  return (
    <div className=" w-full bg-bgColor h-[100vh] flex items-center justify-center p-6">
      <div className=" bg-primary w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/4  py-8 lg:py-0 flex rounded-xl overflow-hidden shadow-xl  ">
        {/* left */}
        <div className="w-full lg:w-1/2 h-full px-8 2xl:px-20 flex flex-col justify-center">
          <div className="w-full flex gap-2 items-center mb-4">
            <div className="p-2 text-xs bg-[#065ad8] rounder text-white">
              <FcAbout />
            </div>
            <span className=" md:text-2xl text-sm  text-[#065ad8] font-semibold">
              Connexa
            </span>
          </div>
          <p className="text-ascent-1 md:text-sm text-xs font-semibold">
            Login to Your Account
          </p>
          <span className="md:text-sm text-xs mt-2 font-semibold	 text-ascent-2">
            Welcome Back
          </span>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="py-8 flex flex-col gap-6 gap-y-2"
          >
            <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2 ">
              <TextInput
                name="firstName"
                label="FirstName"
                type="firstName"
                placeholder="FirstName"
                register={register("firstName", {
                  required: "FirstName is Required",
                })}
                styles="w-full rounded-md"
                labelStyles="ml-2"
                error={errors.firstName ? errors.firstName.message : ""}
              />
              <TextInput
                name="lastName"
                label="LastName"
                type="lastName"
                placeholder="lastName"
                register={register("lastName", {
                  required: "LastName is Required",
                })}
                styles="w-full rounded-md"
                labelStyles="ml-2"
                error={errors.lastName ? errors.lastName.message : ""}
              />
            </div>
            <TextInput
              name="email"
              label="Email Address"
              type="email"
              placeholder="example@example.com"
              register={register("email", {
                required: "Email Address is Required",
              })}
              styles="w-full rounded-md"
              error={errors.email ? errors.email.message : ""}
            />

            <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
              <TextInput
                name="password"
                label="Password"
                type="password"
                placeholder="password"
                register={register("password", {
                  required: "Password is Required",
                })}
                styles="w-full rounded-md"
                labelStyles="ml-2"
                error={errors.password ? errors.password.message : ""}
              />
              <TextInput
                label="Conform Password"
                type="password"
                placeholder="password"
                register={register("cPassword", {
                  validate: (value) => {
                    const { password } = getValues();
                    if (password !== value) {
                      return "Password do not match";
                    }
                  },
                })}
                styles="w-full rounded-md"
                labelStyles="ml-2"
                error={
                  errors.cPassword && errors.cPassword.type === "validate"
                    ? errors.cPassword?.message
                    : ""
                }
              />
            </div>

            {/* <Link
              to="/reset-password"
              className="text-sm text-right text-blue font-semibold"
            >
              Forgot Password ?
            </Link> */}
            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status === "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                }mt-0.5 `}
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
                  "inline-flex justify-center rounded-md hover:bg-[#004080] hover:text-slate-600 transition duration-300 ease-in-out bg-[#065ad8] px-8 py-3 text-sm font-medium text-white outline-none mt-2 "
                }
                title="Create Account"
              />
            )}
          </form>

          <p className="md:text-sm text-xs text-right text-white -mt-5">
            Already have an Account ?
            <Link
              to="/login"
              className="text-blue  font-semibold ml-2 cursor-pointer"
            >
              {" "}
              Login
            </Link>
          </p>
          <p className=" flex justify-center mt-10 md:text-xs text-[6px] text-ascent-2 text-gray-900 items-center cursor-pointer">
            &copy; 2023 Connexa | Privacy Policy | Terms of Service
          </p>
          <p className=" flex justify-center mt-1 md:text-xs text-[6px] text-ascent-2 text-gray-900 items-center cursor-pointer">
            Designed by Prashant ~
          </p>
        </div>
        {/* right */}

        <div className="hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue ">
          <div className="relative w-full flex items-center justify-center">
            <img
              className="w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover"
              src={BgImage}
              alt="Bg_image"
            />
            <div className="absolute flex items-center gap-1 bg-white right-10 top-6 py-2 px-5 rounded-full">
              <BsShareFill size={14} />
              <span className="text-xs font-medium">share</span>
            </div>
            <div className="absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full">
              <BsShareFill size={14} />
              <span className="text-xs font-medium">share</span>
            </div>
            <div className="absolute flex items-center gap-1 bg-white left-12 button-6 py-2 px-5 rounded-full">
              <BsShareFill size={14} />
              <span className="text-xs font-medium">share</span>
            </div>
          </div>
          <div className="mt-16 text-center">
            <p className="text-white text-base">
              Connect with friends and have share for fun
            </p>
            <span className="text-sm text-white/80">
              Share memories with friends and the worlds
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
