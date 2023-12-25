import React from "react";
import { FcAbout } from "react-icons/fc";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiBrightnessDown } from "react-icons/ci";
import { MdBrightness3 } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { SetTheme } from "../redux/theme";
import { Logout } from "../redux/userSlice";
const TopBar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSearch = async (data) => {};

  const handleTheme = () => {
    const themevalue = theme === "light" ? "dark" : "light";
    dispatch(SetTheme(themevalue)); // Dispatch the action returned by SetTheme
  };
  return (
    <div className="topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary">
      <Link className="flex gap-2 items-center">
        <div
          className="p-1 md:p-2 bg-[#065ad8]
        "
        >
          <FcAbout />
        </div>
        <span className="text-xl md:text-2xl text-[#065ad8] font-semibold">
          Connexa
        </span>
      </Link>

      <form action="" className="hidden md:flex items-center justify-center">
        <TextInput
          placeholder="search.."
          styles="w-[18rem] lg:w-[38rem] rounded-l-full py-3 "
          register={register("search")}
        />
        <CustomButton
          title="search"
          type="submit"
          containerStyles="bg-[#0444a4] text-white px-6 py-2.5 mt-2 border border-[#66666690] rounded-r-full"
        />
      </form>
      {/* Icons */}

      <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
        <button onClick={() => handleTheme()}>
          {theme ? <CiBrightnessDown /> : <CiBrightnessDown />}
        </button>
        <div className="hidden lg:flex">
          <IoIosNotificationsOutline />
        </div>
        <div className="">
          <CustomButton
            onClick={() => dispatch(Logout())}
            title="Log Out"
            containerStyles="text-sm text-ascent-1 px:4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
