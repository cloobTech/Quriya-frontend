import { Box, Image, SimpleGrid } from "@mantine/core";

export interface ImageType {
  id: number;
  url: string;
}

export const GridImageDisplay = ({ images }: { images: ImageType[] }) => {
  if (images.length === 1) {
    return (
      <Box display="flex" className="justify-center">
        <Image
          src={images[0].url}
          radius="md"
          height={200}
          fit="contain"
          w={300}
        />
      </Box>
    );
  }

  return (
    <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="sm">
      {images.map((img) => (
        <Image
          key={img.id}
          src={img.url}
          radius="md"
          height={150}
          fit="cover"
        />
      ))}
    </SimpleGrid>
  );
};
