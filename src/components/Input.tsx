"use client";

import React from "react";
import clsx from "clsx";

interface BaseProps {
  id: string;
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  icon?: React.ReactNode;
  rows?: number;
}

interface TextInputProps extends BaseProps {
  type?: string;
  textarea?: false;
}

interface TextAreaProps extends BaseProps {
  textarea: true;
  rows?: number;
  type?: never;
}

export type InputProps = TextInputProps | TextAreaProps;

export default function Input({
  id,
  name,
  placeholder,
  value,
  onChange,
  className,
  icon,
  textarea = false,
  type = "text",
  rows = 4,
}: InputProps) {
  const commonClasses = clsx(
    "w-full text-sm pr-2 py-2 focus:outline-none focus:ring-orange placeholder:text-gray-400",
    icon ? "pl-9" : "pl-3",
    className
  );

  return (
    <div className={clsx("relative group glass rounded-md overflow-hidden focus-within:!border-orange border-none ring-1 ring-gray-700 hover:ring-orange focus-within:ring-orange transition-all duration-300 focus:outline-none", textarea && "w-full")}>      
      {icon && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange pointer-events-none z-20">
          {icon}
        </span>
      )}
      {textarea ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          className={commonClasses}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={commonClasses}
        />
      )}
    </div>
  );
} 