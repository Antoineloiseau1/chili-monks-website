/**
 * Résout l'URL d'un média (audio, vidéo, grosse image).
 *
 * Les médias lourds sont hébergés sur un bucket Cloudflare R2 public, exposé
 * via le domaine ci-dessous. On sert depuis R2 partout (dev, prod, CI) : aucun
 * fichier média n'est nécessaire en local et il n'y a aucune variable d'env à
 * configurer.
 *
 * Usage : mediaUrl('/teaser.mov')
 *   -> "https://pub-15da7fb8a84a4d63945625d82d3c17f0.r2.dev/teaser.mov"
 */
const BASE = 'https://pub-15da7fb8a84a4d63945625d82d3c17f0.r2.dev'

export function mediaUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${BASE}${normalized}`
}
