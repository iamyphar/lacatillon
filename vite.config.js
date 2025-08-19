import { defineConfig } from 'vite'
import vituum from 'vituum'
import twig from '@vituum/vite-plugin-twig'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// Common settings
const server = {
    host: 'localhost',
    port: 3000,
    open: true
}

const plugins = [
    vituum({
        root: './src',
        dir: '.src/pages'
    }),
    twig({
        root: './src',
        namespaces: {
            includes: './src/includes',
            layouts: './src/layouts',
            components: './src/components'
        }
    }),
    ViteImageOptimizer({
        png: { quality: 90 },
        jpeg: { quality: 90 },
        jpg: { quality: 90 },
        webp: { lossless: true },
        avif: { lossless: true },
    }),
    viteStaticCopy({
        targets: [
            {
                src: 'src/assets/img/*',
                dest: 'assets/img'
            }
        ]
    })
]

export default defineConfig(() => {
    const buildTarget = process.env.VITE_BUILD_TARGET || 'default'

    let base, outDir, assetsDir, rollupOptions

    if (buildTarget === 'default') {
        base = '/'
        outDir = './dist'
        assetsDir = 'assets'
        rollupOptions = undefined
    } else if (buildTarget === 'contao') {
        base = '/files/fz-static/'
        outDir = './fz-static'
        assetsDir = 'assets'
        rollupOptions = {
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: (assetPath) => {
                    const isCSSorJS = assetPath.name.endsWith('.css') || assetPath.name.endsWith('.js')
                    return isCSSorJS ? '[name].[ext]' : assetsDir + '/[name].[hash].[ext]'
                }
            }
        }
    }

    return {
        base,
        build: {
            outDir,
            emptyOutDir: true,
            assetsDir,
            rollupOptions,
            cssCodeSplit: false,
            target: 'modules',
            assetsInlineLimit: 0
        },
        server,
        plugins,
        css: {
            devSourcemap: true
        }
    }
})
