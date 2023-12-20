import { Box, Center, Container, Flex, Loader } from "@mantine/core"
import { FC, useState } from "react"
import type { Camera } from "../types.d.ts"
import AppLayout from "./components/AppLayout"
import CamerasList from "./components/CamerasList.tsx"
import DatetimeForm from "./components/DatetimeForm"
import { fetchCameras } from "./services/backend/api.ts"

const App: FC = () => {
  const [cameras, setCameras] = useState<Camera[]>([])
  const [isFetchingCameras, setIsFetchingCameras] = useState<boolean>(false);

  const onSearch = async (datetime: Date | undefined) => {
    if (!datetime) return;

    try {
      setIsFetchingCameras(true)
      const cameras = await fetchCameras(+datetime);
      if (cameras) {
        setCameras(cameras)
      } else {
        console.error('No cameras found')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsFetchingCameras(false)
    }
  }

  return (
    <AppLayout>
      <Container fluid p={0}>
        <Container size={320} p={0}>
          <DatetimeForm onSubmit={onSearch} />
        </Container>

        <Box mt="lg">
          {isFetchingCameras ? (
            <Flex justify="center" mt="xl" pt="xl">
              <Loader size="xl" />
            </Flex>
          ) : (
            <CamerasList cameras={cameras} />
          )}
        </Box>
      </Container>
    </AppLayout>
  )
}

export default App
