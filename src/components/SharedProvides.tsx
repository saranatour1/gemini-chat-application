import { ChildProps } from "../utils/types";
import { NextUIProvider } from "@nextui-org/react"; // for the next-ui context
export const SharedProviders = ({ children }: ChildProps) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
