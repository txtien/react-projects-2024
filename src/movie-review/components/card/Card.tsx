import {
  Card,
  CardBody,
  Stack,
  Divider,
  CardFooter,
  Image,
  Text,
  Heading,
} from "@chakra-ui/react";
import { IMovie } from "../../api/types";

interface Props {
  movie: IMovie;
}

export const MovieCard = ({ movie }: Props) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={movie.poster}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{movie.title}</Heading>
          <Text className="truncate">{movie.overview}</Text>
          {movie.is_new && (
            <Text color="blue.600" fontSize="2xl">
              Vừa ra mắt
            </Text>
          )}
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        {movie.genres.map((genre) => (
          <Text key={genre.id} color="gray.500" fontSize="sm">
            {genre.name}
          </Text>
        ))}
      </CardFooter>
    </Card>
  );
};
