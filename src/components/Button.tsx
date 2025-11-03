import clsx from "clsx";
import Link from "next/link";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "icon";
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button = ({
  children,
  className,
  onClick,
  href,
  variant = "primary",
  loading = false,
  disabled = false,
  type = "button",
}: ButtonProps) => {
  const isExternal = href?.startsWith("http");
  const Component: React.ElementType = href ? (isExternal ? "a" : Link) : "button";
  const isDisabled = disabled || loading;
  const content = loading ? <ArrowPathIcon className="size-5 animate-spin" aria-hidden="true" /> : children;

  const commonProps: Record<string, unknown> = {
    className: clsx(
      "py-2 px-4 rounded-md transition-all duration-300 font-bold border-2 cursor-pointer flex items-center gap-3 hover:shadow-[0_0_14px_black] shadow-orange/50 focus:outline-none focus:shadow-[0_0_14px_black]",
      variant === "primary" && "bg-orange text-darkblue border-orange",
      variant === "secondary" && "bg-darkblue text-orange border-orange",
      variant === "icon" &&
        "bg-transparent border-none text-orange hover:shadow-none !px-2 hover:bg-orange hover:text-darkblue !rounded-full",
      isDisabled && "opacity-50 cursor-not-allowed",
      className
    ),
    ...(href
      ? { href, ...(isExternal && { target: "_blank", rel: "noopener noreferrer" }) }
      : { onClick, disabled: isDisabled }),
    ...(!href && { type }),
  };

  return <Component {...commonProps}>{content}</Component>;
};

export default Button;
