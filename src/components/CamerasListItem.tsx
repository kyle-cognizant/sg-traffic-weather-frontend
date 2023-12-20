import { Box, Card, Flex, Grid, Image, Text, Title } from "@mantine/core"
import { FC, MouseEventHandler } from "react"
import type { Camera } from "../../types.d.ts"

type Props = {
  camera: Camera
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const CamerasListItem: FC<Props> = ({
  camera,
  onClick
}) => {
  const {
    camera_id,
    area_name,
    location,
    timestamp,
    image,
    image_metadata,
  } = camera;

  const { height, width } = image_metadata
  const { latitude, longitude } = location
  
  return (
    <Box onClick={onClick} component="button" w="100%" className="cameras-list-item hover-opacity pressable">
      <Card withBorder shadow="xs" key={camera_id} radius="md" p={0} component="article">
        <Grid gutter="sm">
          <Grid.Col span={{ xs: 3 }} miw={180}>
            <Box style={{overflow: 'hidden' }}>
            <Image
              className="grayscale transition"
              src={image}
              width={width}
              height={height}
              alt={`Traffic camera image taken in ${area_name} at ${timestamp}`}
            />
            </Box>
          </Grid.Col>
          <Grid.Col span={{ xs: 'auto' }}>
            <Box p="md">
              <Flex justify="space-between" mb={4} component="header" gap="sm">
                <Title order={1} size="h5">{area_name}</Title>
                <Text c="dimmed" size="sm">#{camera_id}</Text>
              </Flex>
              <Flex gap={4}>
              <Text size="xs" className="grayscale">
              📍 
              </Text>
              <Text size="xs" c="dimmed">
                {latitude}<br /> {longitude}
              </Text>
              </Flex>
            </Box>
          </Grid.Col>
        </Grid>
      </Card>
    </Box>
  )
}

export default CamerasListItem
