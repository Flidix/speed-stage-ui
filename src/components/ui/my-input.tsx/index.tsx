import React, { FC } from "react";
import { Input } from "../input";

type MyInputProps = { className?: string } & React.ComponentProps<typeof Input>;

const MyInput: FC<MyInputProps> = ({ className: styles, ...props }) => {
  return (
    <Input
      {...props}
      className={`bg-customBlack mt-4 border-borderGray color-white text-inherit	text-white text-xs ${styles}`}
    />
  );
};

export default MyInput;
