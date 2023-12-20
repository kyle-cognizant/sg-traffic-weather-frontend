import { Box, Card, Container, Grid, Stack, Text, Title } from "@mantine/core"
import { FC } from "react"
import type { Camera } from "../../types.d.ts"
import CamerasListItem from "./CamerasListItem.tsx"

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
          <Container size="sm">
            <Card withBorder padding="xl" className="text-center" radius="xl">
              <Text size="xl">📸</Text>
              <Text c="dimmed" size="xl">
                Select a date and time to view Traffic Cameras
              </Text>
            </Card>
          </Container>
        ) : (
            <Container size="sm">
              <Title order={2} size="h4" className="text-center">
                Found {cameras.length} Traffic Cameras
              </Title>
              <Text c="dimmed" size="sm" color="dimmed" className="text-center" mb="md">
                Select a camera to view more details
              </Text>
              <Grid component="ul" gutter="xs">
                {cameras.map(camera =>(
                  <Grid.Col span={{ base: 12, xs: 6}} component="li">
                    <Box maw={360} mx="auto">
                    <CamerasListItem camera={camera} />
                    </Box>
                  </Grid.Col>
                ))}
              </Grid>
            </Container>
        )
      }
    </>
  )
}

export default CamerasList
