import { Box, Card, Flex, Grid, Image, Text, Title } from "@mantine/core"
import { FC, MouseEventHandler } from "react"
import type { Camera } from "../../types.d.ts"

type Props = {
  camera: Camera
  onClick?: (camera: Camera) => void
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

  const handleClick = () => {
    if (typeof onClick === 'function') {
      onClick(camera)
    }
  }
  
  return (
    <Box onClick={handleClick} component="button" w="100%" className="cameras-list-item hover-opacity pressable block" miw={280}>
      <Card withBorder shadow="xs" key={camera_id} radius="md" p={0} component="article">
        <Grid gutter="sm">
          <Grid.Col span={{ base: 3 }} miw={120}>
            <Box style={{overflow: 'hidden' }} bg="gray.3">
            <Image
              loading="lazy"
              className="grayscale transition"
              src={image}
              width={width}
              height={height}
              alt={`Traffic camera image taken in ${area_name} at ${timestamp}`}
            />
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 'auto' }}>
            <Box p="xs">
              <Flex justify="space-between" component="header" gap="sm">
                <Title order={1} size="h6">{area_name}</Title>
                <Text c="dimmed" size="xs">#{camera_id}</Text>
              </Flex>
              <Flex gap={4} ml={-16}>
              <Text size="xs">
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
