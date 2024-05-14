import { Link } from "react-router-dom";
import "./App.css";
import {
  Box, Card,
  CardBody,
  CardFooter,
  Divider,
  Grid,
  Heading,
  Stack,
  Text
} from "@chakra-ui/react";

function App() {
  return (
    <Box padding={"2rem"}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <Card maxW="sm">
          <CardBody>
            <Stack mt="6" spacing="3">
              <Heading size="md">Todo App</Heading>
              <Text>Todo app</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter display={"flex"} justifyContent={"flex-end"}>
            <Link to="/todo" className="app-link">
              Try it
            </Link>
          </CardFooter>
        </Card>
        <Card maxW="sm">
          <CardBody>
            <Stack mt="6" spacing="3">
              <Heading size="md">Movie Review App</Heading>
              <Text>Movie Review App</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter display={"flex"} justifyContent={"flex-end"}>
            <Link to="/movie-review" className="app-link">
              Try it
            </Link>
          </CardFooter>
        </Card>
        {/* <GridItem w="100%" h="10" bg="blue.500" />
      <GridItem w="100%" h="10" bg="blue.500" />
      <GridItem w="100%" h="10" bg="blue.500" />
      <GridItem w="100%" h="10" bg="blue.500" /> */}
      </Grid>
    </Box>
  );
}

export default App;
