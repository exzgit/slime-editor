import React, { useState } from "react";

type IconButtonProps = {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
};

export const IconButton = ({
  icon,
  label,
  onClick,
  disabled = false,
  className = "",
  style,
  type = "button",
}: IconButtonProps) => {
  return (
    <button
      type={type}
      className={`group flex items-center transition-all duration-150 ${className} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      <span className="group-hover:rotate-16 transition-all duration-150 icon">{icon}</span>
      {label && <span className="label ml-2">{label}</span>}
    </button>
  );
}


type IconButtonCheckboxProps = {
  icon: React.ReactNode;
  label?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  checked?: boolean; // <-- dari luar
  onClick?: () => void; // <-- handler dari luar
};

export const IconButtonCheckbox = ({
  icon,
  label,
  disabled = false,
  className = "",
  style,
  checked,
  onClick,
}: IconButtonCheckboxProps) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = typeof checked === "boolean";
  const actualChecked = isControlled ? checked : internalChecked;

  const handleClick = () => {
    if (disabled) return;

    if (!isControlled) {
      setInternalChecked((prev) => !prev);
    }

    onClick?.(); // panggil handler luar jika ada
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      style={style}
      aria-pressed={actualChecked}
      className={`flex items-center transition-all duration-300 
        ${className} 
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`icon transition-transform duration-300 ${
          actualChecked ? "rotate-16" : "rotate-0"
        }`}
      >
        {icon}
      </span>
      {label && (
        <span
          className={`label ml-2 transition-all duration-300 ${
            actualChecked ? "tracking-wider" : "tracking-normal"
          }`}
        >
          {label}
        </span>
      )}
    </button>
  );
};