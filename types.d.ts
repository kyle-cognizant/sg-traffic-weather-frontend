export type Camera = {
  camera_id: string
  area_name: string
  location: {
    longitude: number
    latitude: number
  }
  timestamp: Date
  image: string
  image_metadata: {
    width: number
    height: number
    md5: string
  }
}

export type CameraDetails = {
  camera: Camera
  weather_forecast: string
}

export type SearchTransaction = {
  id: string
  clientId: string
  queryTimestamp: string
  path: string
  params: {
    md5: string
    latitude: string
    longitude: string
    area_name: string
    weather_forecast: string
  }
  createdAt: string
}
