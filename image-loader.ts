import { BASE_PATH } from './src/lib/basePath'

// Loader "custom" pour next/image en export statique : pas d'optimisation,
// mais applique le basePath aux chemins locaux (unoptimized: true ne le fait pas)
export default function imageLoader({ src }: { src: string }): string {
  if (src.startsWith('http')) return src
  return `${BASE_PATH}${src}`
}
