import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "filled" | "outlined" | "underline";
  label?: string;
  error?: string;
}

const variantStyles: Record<NonNullable<InputProps["variant"]>, string> = {
  filled: "bg-surface-grey rounded-[12px] p-4 w-full focus:outline-none",
  outlined:
    "rounded-[12px] border p-4 w-full focus:outline-none focus:placeholder-transparent focus:border-action",
  underline: "p-2 w-full focus:outline-none border-b",
};

export default function Input({
  variant = "filled",
  label,
  error,
  disabled,
  className = "",
  ...props
}: InputProps) {
  const underlineColor =
    variant === "underline"
      ? error
        ? "border-b-red-500"
        : "border-b-primary-500"
      : "";

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-grey-500 text-sm">{label}</label>
      )}
      <input
        disabled={disabled}
        className={[
          variantStyles[variant],
          underlineColor,
          disabled ? "opacity-40 cursor-not-allowed" : "",
          error && variant !== "underline" ? "border-red-400" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
