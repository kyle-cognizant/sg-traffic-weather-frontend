import { Box, Card, Container, Divider, Drawer, Flex, Grid, Image, Loader, ScrollArea, Stack, Table, Text, Title } from "@mantine/core"
import { FC, useEffect, useState } from "react"
import type { Camera, CameraDetails, SearchTransaction } from "../types.d.ts"
import AppLayout from "./components/AppLayout"
import CamerasList from "./components/CamerasList.tsx"
import DatetimeForm from "./components/DatetimeForm"
import RecentSearches from "./components/RecentSearches.tsx"
import { fetchCameraDetails, fetchCameras, fetchGlobalRecentSearches } from "./services/backend/api.ts"
import { useDisclosure } from "@mantine/hooks"

const recentSearchesLocalStorageKey = 'sg-traffic-weather.my-recent-searches'

const App: FC = () => {
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);

  // TODO: Refactor using react-query
  const [selectedDatetime, setSelectedDatetime] = useState<Date | undefined>(undefined)
  const [selectedCameraDetails, setSelectedCameraDetails] = useState<CameraDetails | null>(null)
  const [cameras, setCameras] = useState<Camera[]>([])
  const [globalRecentSearches, setGlobalRecentSearches] = useState<SearchTransaction[]>([])
  const [myRecentSearches, setMyRecentSearches] = useState<SearchTransaction[]>([])
  const [isFetchingCameras, setIsFetchingCameras] = useState<boolean>(false);
  const [isFetchingGlobalRecentSearches, setIsFetchingGlobalRecentSearches] = useState<boolean>(false);

  // TODO: Refactor into action
  const onSearch = async (datetime: Date | undefined) => {
    if (!datetime || isFetchingCameras) return;

    try {
      setIsFetchingCameras(true)
      const cameras = await fetchCameras(+datetime);
      if (cameras) {
        setCameras(cameras)
        setSelectedDatetime(datetime)
      } else {
        console.error('No cameras found')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsFetchingCameras(false)
    }
  }

  // TODO: Refactor into hook
  const loadGlobalRecentSearches = async () => {
    try {
      setIsFetchingGlobalRecentSearches(true)
      const data = await fetchGlobalRecentSearches()
      if (data) setGlobalRecentSearches(data)
    } catch (error) {
      console.error(error)
      // TODO: Add toast notification on error
    } finally {
      setIsFetchingGlobalRecentSearches(false)
    }
  }

  // TODO: Refactor into hook
  const loadMyRecentSearches = () => {
    try {
      const data = localStorage.getItem(recentSearchesLocalStorageKey);
      if (!data) {
        setMyRecentSearches([])
      } else {
        // TODO: Add a utility function to parse this properly and
        // validate that the expected params are present, if not,
        // gracefully handle by showing a toast error and resetting
        // the corrupted localStorage item.
        const searches = JSON.parse(data) as SearchTransaction[]
        setMyRecentSearches(searches)
      }
    } catch (error) {
      console.error(error)
      // TODO: Add toast notification on error
    }
  }

  const saveMyRecentSearch = (newSearch: SearchTransaction) => {
    const currentData = localStorage.getItem(recentSearchesLocalStorageKey);
    const currentSearches = currentData ? JSON.parse(currentData) : []

    // TODO: Implement rolling array to limit to 10 items
    localStorage.setItem(recentSearchesLocalStorageKey, JSON.stringify([
      newSearch,
      ...currentSearches,
    ]))

    loadMyRecentSearches()
  }

  const onCameraSelect = async (camera: Camera) => {
    try {
      // TODO: better error handling for this
      if (!selectedDatetime) return;
      const cameraDetails = await fetchCameraDetails(+new Date(selectedDatetime), camera.camera_id)

      if (!cameraDetails) return;

      setSelectedCameraDetails(cameraDetails)

      // TODO: Refactor input types for saveMyRecentSearch
      saveMyRecentSearch({
        id: myRecentSearches.length.toString(),
        clientId: navigator.userAgent,
        createdAt: new Date().toDateString(),
        path: `/cameras/${camera.camera_id}`,
        queryTimestamp: selectedDatetime.toDateString(),
        params: {
          area_name: camera.area_name,
          latitude: camera.location.latitude.toString(),
          longitude: camera.location.longitude.toString(),
          md5: camera.image_metadata.md5,
          weather_forecast: cameraDetails.weather_forecast
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!!selectedCameraDetails) openDrawer()
  }, [selectedCameraDetails])

  useEffect(() => {
    document.title = "🇸🇬 SG Traffic/Weather"
    loadGlobalRecentSearches()
    loadMyRecentSearches()
  }, [])

  return (
    <AppLayout>
      <Container fluid p={0}>
        <Container size={320} p={0} mt="md">
          <DatetimeForm onSubmit={onSearch} />
        </Container>

        <Box mt="xl">
          {isFetchingCameras ? (
            <Flex justify="center" mt="xl" pt="xl">
              <Loader size="xl" />
            </Flex>
          ) : (
            <CamerasList cameras={cameras} onSelect={onCameraSelect} />
          )}
        </Box>

        <Divider my="xl" />

        {/* TODO: Refactor into component and use a global store for state */}
        <Container size="sm" mt="xl">
          <Grid>
            <Grid.Col span={{ sm: 6 }}>
              <Text mb="xs" c="dimmed" className="text-center">You recently viewed</Text>
              <Card withBorder radius="lg" p={0}>
                <ScrollArea h={240}>
                  <RecentSearches
                    searchQueries={myRecentSearches}
                    isLoading={false}
                  />
                </ScrollArea>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ sm: 6 }}>
              <Text mb="xs" c="dimmed" className="text-center">People recently viewed</Text>
              <Card withBorder radius="lg" p={0}>
                <ScrollArea h={240}>
                  <RecentSearches
                    searchQueries={globalRecentSearches}
                    isLoading={isFetchingGlobalRecentSearches}
                  />
                </ScrollArea>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      </Container>

      {/* TODO: Refactor into component */}
      <Drawer opened={drawerOpened} onClose={closeDrawer} position="right">
        <Container>
          <Title size="h3">Traffic Camera Details</Title>
          <Divider my="lg" />
          {selectedCameraDetails ? (
            <Stack gap={4}>
              <Image mb="lg" src={selectedCameraDetails.camera.image} w={selectedCameraDetails.camera.image_metadata.width} h={selectedCameraDetails.camera.image_metadata.height} alt="" />
              <Text>Weather Forecast: {selectedCameraDetails.weather_forecast}</Text>
              <Text>Timestamp: {selectedCameraDetails.camera.timestamp.toString()}</Text>
              <Text>Camera ID: {selectedCameraDetails.camera.camera_id}</Text>
              <Text>Area: {selectedCameraDetails.camera.area_name}</Text>
              <Text>Latitude: {selectedCameraDetails.camera.location.latitude}</Text>
              <Text>Longitude: {selectedCameraDetails.camera.location.longitude}</Text>
            </Stack>
          ) : (
            <Text>Select a camera first.</Text>
          )}
        </Container>
      </Drawer>
    </AppLayout>
  )
}

export default App
