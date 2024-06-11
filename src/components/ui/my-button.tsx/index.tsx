import React, { FC } from "react";
import { Button } from "../button";
import { ButtonProps } from "../../ui/button";
import Spinner from "../spinners";

type MyButtonProps = ButtonProps & {
  onClick?: () => void;
  isLoading?: boolean;
  children?: React.ReactNode;
};
const MyButton: FC<MyButtonProps> = ({ isLoading, children, ...props }) => {
  return <Button {...props}>{isLoading ? <Spinner /> : children}</Button>;
};

export default MyButton;
