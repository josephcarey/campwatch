import { Container, Heading, Text, Flex } from "@chakra-ui/react";

export default function Header(props) {
  return (
    <Container padding="2.5em">
      <Flex
        direction="column"
        align="center"
        maxW={{ xl: "1200px" }}
        m="0 auto"
      >
        <Container paddingBottom="1em">
          <Heading align="center">{props.title}</Heading>
        </Container>
        <Container>
          <Text align="center">{props.description}</Text>
        </Container>
      </Flex>
    </Container>
  );
}
