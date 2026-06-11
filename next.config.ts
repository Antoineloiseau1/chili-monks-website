// Le site est servi sur https://antoineloiseau1.github.io/chili-monks-website/
// Le basePath n'est appliqué qu'en production pour garder http://localhost:3000 en dev
const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/chili-monks-website' : '',
  images: {
    // unoptimized: true ignorerait le loader et donc le basePath sur les src
    loader: 'custom',
    loaderFile: './image-loader.ts'
  }
}

module.exports = nextConfig
