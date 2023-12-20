import { Container } from "@mantine/core"
import { FC, useState } from "react"
import type { Camera } from "../types.d.ts"
import AppLayout from "./components/AppLayout"
import CamerasList from "./components/CamerasList.tsx"
import DatetimeForm from "./components/DatetimeForm"
import { fetchCameras } from "./services/backend/api.ts"

const App: FC = () => {
  const [cameras, setCameras] = useState<Camera[]>([])

  const onSearch = async (datetime: Date | undefined) => {
    if (!datetime) return;

    try {
      const cameras = await fetchCameras(+datetime);
      if (cameras) {
        setCameras(cameras)
      } else {
        console.error('No cameras found')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AppLayout>
      <Container fluid p="md" pt={0}>
        <Container size={320} p={0}>
          <DatetimeForm onSubmit={onSearch} />
        </Container>

        <CamerasList cameras={cameras} />
      </Container>
    </AppLayout>
  )
}

export default App
