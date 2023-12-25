import React from "react";

const TextInput = React.forwardRef(
  (
    {
      type,
      placeholder,
      styles,
      label,
      labelStyles,
      register,
      name,
      error,
      errorStyles,
    },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col md:mt-2 ">
        {label && (
          <p
            className={`text-ascent-2 md:text-sm text-xs mb-2 ml-[1vh]'${labelStyles}`}
          >
            {label}
          </p>
        )}
        <div className="">
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            className={`rounder bg-secondary border border-[#66666690] outline-none md:font text-xs text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles} `}
            {...register}
            aria-invalid={error ? "true" : "false"}
          />
        </div>
        {error && (
          <span className={`text-xs text-[#f64949fe] mt-0.5  ${errorStyles}`}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

export default TextInput;
