import { Card, Container, Stack, Text } from "@mantine/core"
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
              <Stack component="ul" gap="xs">
                {cameras.map(camera =>(
                  <li>
                    <CamerasListItem camera={camera} />
                  </li>
                ))}
              </Stack>
            </Container>
          </Card>
        )
      }
    </>
  )
}

export default CamerasList
