import { getPhotos } from '../utils/getPhotos'
import MediasClient from './MediasClient'

export default function Medias() {
  const photos = getPhotos()
  return <MediasClient photos={photos} />
}
