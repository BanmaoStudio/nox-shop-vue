export const DEFAULT_CONFIG = {
    v: '4.0',
    tk: '',
    plugins: [],
}

export const PLUGINS_URL = {
    D3: [
        'https://cdn.bootcss.com/d3/3.5.17/d3.min.js',
        'http://lbs.tianditu.gov.cn/api/js4.0/opensource/openlibrary/D3SvgOverlay.min.js',
    ],
    CarTrack: [
        'https://cdn.bootcss.com/d3/3.5.17/d3.min.js',
        'http://lbs.tianditu.gov.cn/api/js4.0/opensource/openlibrary/D3SvgOverlay.min.js',
        'http://lbs.tianditu.gov.cn/api/js4.0/opensource/openlibrary/CarTrack.min.js',
    ],
    HeatmapOverlay: [
        'http://lbs.tianditu.gov.cn/api/js4.0/opensource/openlibrary/HeatmapOverlay.min.js',
    ],
    BufferTool: [
        'https://cdn.bootcss.com/Turf.js/3.0.14/turf.js',
        'http://lbs.tianditu.gov.cn/api/js4.0/opensource/openlibrary/BufferTool.min.js',
    ],
    ImageOverLayer: [
        'http://lbs.tianditu.gov.cn/api/js4.0/opensource/openlibrary/ImageOverlay.min.js',
    ],
}

let isLoading = false

/**
 * 加载天地图脚本
 * @param {object} config - 加载配置
 * @param {string=} v - 版本号
 * @param {string=} tk - 天地图应用 Key
 * @param {Array} plugins - 天地图插件，包括 [D3, CarTrack, HeatmapOverlay, BufferTool, ImageOverLayer]
 */
export async function useApiLoader(config = {}) {
    if (isLoading) {
        return new Promise(resolve => {
            setTimeout(() => resolve(useApiLoader(config)))
        })
    } else if (globalThis.T) {
        return
    } else {
        isLoading = true
        const { v, tk, plugins } = { ...DEFAULT_CONFIG, ...config }
        await loadScript(`//api.tianditu.gov.cn/api?v=${v}&tk=${tk}`)
        await Promise.all(
            plugins.map(name => PLUGINS_URL[name])
            .flat()
            .map(url => loadScript(url))
        )
        isLoading = false
    }
}

function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = globalThis.document?.createElement('script')
        if (!script) resolve()
        script.src = url
        script.type = 'text/javascript'
        script.async = true
        script.defer = true
        script.onload = () => resolve()
        script.onerror = () => resolve()
        globalThis.document?.body.appendChild(script)
    })
}
