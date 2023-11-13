<template>
    <div id="mapDiv" class="h-full"></div>
</template>

<script setup>
    import { useApiLoader } from '@/utils/tianditu'

    // useApiLoader({
    //     tk: '58b65604b1f77a753b0019a0994f1e72',
    //     plugins: [
    //         'D3',
    //         'CarTrack',
    //         'HeatmapOverlay',
    //         'BufferTool',
    //         'ImageOverLayer',
    //     ],
    // }).then(() => {
    //     init()
    // })

    const init = () => {
        var map = null
        var T = window.T
        map = new T.Map('mapDiv')
        map.setMapType(window.TMAP_SATELLITE_MAP)
        map.centerAndZoom(new T.LngLat(112, 36), 7)
    }
    onMounted(() => {
        useApiLoader({
            tk: '58b65604b1f77a753b0019a0994f1e72',
            plugins: [
                'D3',
                'CarTrack',
                'HeatmapOverlay',
                'BufferTool',
                'ImageOverLayer',
            ],
        }).then(() => {
            init()
        })
    })
</script>
