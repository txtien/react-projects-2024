import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <Flex
      flexDirection={"column"}
      gap={"1rem"}
      width={"100dvw"}
      height={"100dvh"}
    >
      <Button
        display={"inline-flex"}
        width={"max-content"}
        gap="0.25rem"
        alignItems={"center"}
        variant={"primary"}
        onClick={() => navigate("/")}
      >
        <ArrowBackIcon />
        <Text color={"#fff"} fontSize={"0.875rem"}>
          Quay lại
        </Text>
      </Button>
      <Outlet />
    </Flex>
  );
};

export default Layout;
