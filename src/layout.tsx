import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Flex
      flexDirection={"column"}
      gap={"1rem"}
      width={"100dvw"}
      height={"100dvh"}
    >
      <Outlet />
    </Flex>
  );
};

export default Layout;
