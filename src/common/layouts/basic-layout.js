import { Flex } from "@chakra-ui/react";

export default function BasicLayout(props) {
  return (
    <main>
      <Flex
        direction="column"
        align="center"
        maxW={{ xl: "1200px" }}
        m="0 auto"
      >
        {props.children}
      </Flex>
    </main>
  );
}
