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
