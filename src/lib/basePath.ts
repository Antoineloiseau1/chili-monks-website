// Préfixe appliqué en production pour GitHub Pages
// (https://antoineloiseau1.github.io/chili-monks-website/)
export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/chili-monks-website' : ''

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`
}
