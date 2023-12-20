import { Card, Code, Container, Divider, Flex, Grid, Image, Stack, Text, Title } from "@mantine/core"
import { FC, useState } from "react"
import type { Camera } from "../types.d.ts"
import AppLayout from "./components/AppLayout"
import DatetimeForm from "./components/DatetimeForm"
import CamerasList from "./components/CamerasList.tsx"

const App: FC = () => {
  const [cameras, setCameras] = useState<Camera[]>([])

  const onSearch = async (datetime: Date | undefined) => {
    if (!datetime) return;
    const cameras = await fetchCameras(+datetime);

    if (cameras) {
      setCameras(cameras)
    } else {
      console.log('error fetching cameras')
    }
  }

  const fetchCameras = async (timestamp: number): Promise<Camera[] | undefined> => {
    try {
      const response = await fetch(`http://localhost:3000/cameras?timestamp=${timestamp}`)
      const data = await response.json()
      return data
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
