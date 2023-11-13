<template>
    <n-card title="订单统计" size="medium">
        <template #header-extra>
            <div class="flex justify-between gap-2">
                <n-tag
                    v-for="(item, index) in options"
                    :key="index"
                    type="default"
                    :checked="current === item.value"
                    checkable
                    size="small"
                    @click="() => handleChoose(item.value)">
                    {{ item.label }}
                </n-tag>
            </div>
        </template>
        <div ref="el" id="chart" style="width: 100%; height: 300px"></div>
    </n-card>
</template>
<script setup>
    import * as echarts from 'echarts'
    import { getStatistics3 } from '@/api/home'
    import { onBeforeUnmount } from 'vue'
    import { useResizeObserver } from '@vueuse/core'

    const current = ref('week')
    const options = [
        { label: '近1个月', value: 'month' },
        { label: '近1周', value: 'week' },
        { label: '近24小时', value: 'hour' },
    ]

    const handleChoose = (v) => {
        current.value = v

        getData()
    }

    let myChart = null
    onMounted(() => {
        const chartDom = document.getElementById('chart')
        if (chartDom) {
            myChart = echarts.init(chartDom)

            getData()
        }

    })

    onBeforeUnmount(() => {
        if (myChart) {
            echarts.dispose(myChart)
        }
    })

    function getData() {
        let options = {
            xAxis: {
                type: 'category',
                // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    // data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    color: '#18A058'
                },
            ],
        }

        myChart.showLoading()
        // getStatistics3(current.value)
        //     .then(res => {
        //         options.xAxis.data = res.x
        //         options.series[0].data = res.y

        //         myChart && myChart.setOption(options)
        //     }).finally(() => {
        //        myChart.hideLoading()
        //     })
        // mock fetch
        setTimeout(() => {
            const res = {
                x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                y: [120, 200, 150, 80, 70, 110, 130],
            }
            options.xAxis.data = res.x
            options.series[0].data = res.y
            myChart && myChart.setOption(options)
            myChart.hideLoading()
        }, 300)
    }

    const el = ref(null)
    useResizeObserver(el, () => myChart&& myChart.resize())
</script>
