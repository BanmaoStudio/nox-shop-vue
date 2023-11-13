import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import VueJSX from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'

import path from 'path'

const localIconPath = `/src/assets/svg-icon`

// https://vitejs.dev/config/
export default ({ command, mode }) => {
    console.log('command', command)
    console.log('mode', mode)
    const VITE_ENV = loadEnv(mode, process.cwd())
    const collectionName = VITE_ENV.VITE_ICON_LOCAL_PREFIX.replace(
        `${VITE_ENV.VITE_ICON_PREFIX}-`,
        ''
    )
    return defineConfig({
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        server: {
            proxy: {
                '/api': {
                    target: VITE_ENV.VITE_PROXY_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
        plugins: [
            vue(),
            VueJSX(),
            UnoCSS(),
            Icons({
                compiler: 'vue3',
                customCollections: {
                    [collectionName]: FileSystemIconLoader(
                        localIconPath,
                        (svg) =>
                            svg.replace(
                                /^<svg\s/,
                                '<svg width="1em" height="1em" '
                            )
                    ),
                },
                scale: 1,
                defaultClass: 'inline-block',
            }),
            AutoImport({
                imports: [
                    'vue',
                    {
                        'naive-ui': [
                            'useDialog',
                            'useMessage',
                            'useNotification',
                            'useLoadingBar',
                        ],
                    },
                ],
            }),
            Components({
                resolvers: [
                    NaiveUiResolver(),
                    IconsResolver({
                        customCollections: [collectionName],
                        componentPrefix: VITE_ENV.VITE_ICON_PREFIX,
                    }),
                ],
            }),
        ],
    })
}
