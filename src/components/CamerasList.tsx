import { Box, Card, Code, Container, Flex, Grid, Image, Stack, Text, Title } from "@mantine/core"
import { FC } from "react"
import type { Camera } from "../../types.d.ts"

type Props = {
  cameras: Camera[]
}

const CamerasList: FC<Props> = ({
  cameras
}) => {
  return (
    <>
      {
        cameras.length === 0 ? (
          <Container size="sm" mt="lg" p={0}>
            <Card withBorder padding="xl" className="text-center" radius="xl">
              <Text size="xl">📸</Text>
              <Text c="dimmed" size="xl">
                Select a date and time to view traffic cameras
              </Text>
            </Card>
          </Container>
        ) : (
          <Card withBorder radius="xl" bg="gray.1" mt="lg">
            <Container size="sm" p={0}>
              <Stack component="ul">
                {
                  cameras.map(camera => {
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
                      <Card withBorder shadow="xs" component="li" key={camera_id} radius="md" p={0}>
                        <Grid gutter="sm" component="article">
                          <Grid.Col span={3}>
                            <Image
                              className="grayscale"
                              src={image}
                              width={width}
                              height={height}
                              alt={`Traffic camera image taken in ${area_name} at ${timestamp}`}
                            />
                          </Grid.Col>
                          <Grid.Col span={9}>
                            <Box p="md">
                              <Flex justify="space-between" mb={4}>
                                <Title order={2} size="h5">{area_name}</Title>
                                <Text c="dimmed" size="sm">#{camera_id}</Text>
                              </Flex>
                              <Text size="xs" c="dimmed">
                                {latitude}, {longitude}
                              </Text>
                            </Box>
                          </Grid.Col>
                        </Grid>
                      </Card>
                    )
                  })
                }
              </Stack>
            </Container>
          </Card>
        )
      }
    </>
  )
}

export default CamerasList
