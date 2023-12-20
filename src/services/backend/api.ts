import { Camera } from "../../../types";

const fetchCameras = async (timestamp: number): Promise<Camera[] | undefined> => {
  try {
    const response = await fetch(`http://localhost:3000/cameras?timestamp=${timestamp}`)
    if (response.status !== 200) throw new Error(response.statusText);
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('FAILED_TO_FETCH_CAMERAS')
  }
}

const fetchCameraDetails = async (timestamp: number, cameraId: string): Promise<Camera[] | undefined> => {
  try {
    const response = await fetch(`http://localhost:3000/cameras/${cameraId}?timestamp=${timestamp}`)
    if (response.status !== 200) throw new Error(response.statusText);
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('FAILED_TO_FETCH_CAMERA_DETAILS')
  }
}

export {
  fetchCameraDetails, fetchCameras
};

