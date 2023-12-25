import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useFormAction } from "react-router-dom";
import TextInput from "./TextInput";
import { updateProfile } from "../redux/userSlice";
import { NoProfile } from "../assets";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState();
  const [issubmitting, setIsSubmitting] = useState(false);
  const [picture, setPicture] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValues: { ...user } });

  const onSubmit = async (data) => {};
  const handleClose = () => {
    dispatch(updateProfile(false));
  };
  const handleSelect = (e) => {
    setPicture(e.target.files[0]);
  };
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity ">
          <div className="absolute inset-0 bg-[#000] opacity-70"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className=" inline-block align-bottom bg-primary rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="flex justify-between px-6 pt-5 pb-2">
            <label
              htmlFor="name"
              className="blocked font-medium text-xl text-ascent-1 text-left"
            >
              Edit Profile
            </label>
            <button className=" text-ascent-1" onClick={handleClose}>
              <MdClose size={22} />
            </button>
          </div>
          <form
            className="px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center justify-center">
              <div className="">
                <img
                  src={picture ?? NoProfile}
                  alt="profile_pic"
                  className="w-20 h-20 object-cover rounded-full"
                />
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
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
              label="Profession"
              placeholder="Profession"
              type="text"
              styles="w-full rounded-md"
              register={register("profession", {
                required: "Profession do not exist",
              })}
              error={errors.profession ? errors.profession?.message : ""}
            />
            <TextInput
              label="Location"
              placeholder="Location"
              type="text"
              styles="w-full rounded-md"
              register={register("location", {
                required: "Location do not match",
              })}
              error={errors.location ? errors.location?.message : ""}
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
            <div className="py-5 sm:flex sm;flex-row-reverse border-t border-[#66666645] ">
              {issubmitting ? (
                <Loading />
              ) : (
                <CustomButton
                  type="submit"
                  containerStyles={
                    "inline-flex justify-center rounded-md bg-[#065ad8] px-7 py-2 text-sm font-medium text-white outline-none"
                  }
                  title="Save"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
