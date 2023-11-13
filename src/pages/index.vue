<template>
    <div>
        <n-grid x-gap="12" y-gap="12" :cols="4">
            <template v-if="panels.length === 0">
                <n-gi :span="1" v-for="i in 4" :key="i">
                    <n-card title="" size="medium" hoverable>
                        <template #header>
                            <div class="flex justify-between">
                                <n-skeleton text height="24px" width="50%" />
                                <n-skeleton text height="24px" width="24px" />
                            </div>
                        </template>
                        <n-divider />
                        <n-skeleton text height="36px" width="80%" />
                        <n-divider />
                        <template #footer>
                            <div class="flex justify-between">
                                <n-skeleton text height="24px" width="50%" />
                                <n-skeleton text height="24px" width="24px" />
                            </div>
                        </template>
                    </n-card>
                </n-gi>
            </template>
            <n-gi :span="1" v-for="(item, index) in panels" :key="index">
                <n-card hoverable>
                    <template #header>
                        <n-space justify="space-between">
                            <span>{{ item.title }}</span>
                            <n-tag :type="item.unitColor" size="medium">{{
                                item.unit
                            }}</n-tag>
                        </n-space>
                    </template>
                    <n-divider style="margin-top: 0" />
                    <span class="font-bold text-32px">
                        <count-to :value="item.value" />
                    </span>
                    <n-divider style="margin-bottom: 0" />

                    <template #footer>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-500">{{ item.subTitle }}</span>
                            <span class="text-lg">{{ item.subValue }}</span>
                        </div>
                    </template>
                </n-card>
            </n-gi>
        </n-grid>
        <index-navs />
        <n-grid x-gap="12" y-gap="12" class="mt-12px" :cols="2">
            <n-gi :span="1">
                <index-chart v-permission="['getStatistics3,GET']"/>
            </n-gi>
            <n-gi :span="1">
                <index-card
                    title="店铺及商品提示"
                    tip="店铺及商品提示"
                    :data="goodsData" />
                <index-card
                    title="交易提示"
                    tip="需要立即处理的交易订单"
                    class="mt-12px"
                    :data="orderData" />
            </n-gi>
        </n-grid>
    </div>
</template>

<script setup>
    import { getStatistics, getStatistics2 } from '@/api/home'
    import CountTo from '@/components/CountTo.vue'
    import IndexNavs from '../components/IndexNavs.vue'
    import IndexChart from '../components/IndexChart.vue'
    import IndexCard from '../components/IndexCard.vue'

    const panels = ref([])
    getStatistics()
        .then((res) => {
            panels.value = res.panels
        })
        .catch((err) => {})

    setTimeout(() => {
        panels.value = [
            {
                title: '支付订单',
                subTitle: '总支付订单',
                unit: '年',
                subUnit: '',
                value: 49,
                subValue: 49,
                unitColor: 'success',
            },
            {
                title: '订单量',
                subTitle: '转化率',
                unit: '周',
                subUnit: '',
                value: 555,
                subValue: '60%',
                unitColor: 'error',
            },
            {
                title: '销售额',
                subTitle: '总销售额',
                unit: '年',
                subUnit: '',
                value: 3.54,
                subValue: 3.54,
                unitColor: 'success',
            },
            {
                title: '支付订单',
                subTitle: '总支付订单',
                unit: '年',
                subUnit: '',
                value: 49,
                subValue: 49,
                unitColor: 'success',
            },
        ]
    }, 300)

    getStatistics2().then((res) => {})

    const goodsData = ref([])
    const orderData = ref([])
    setTimeout(() => {
        goodsData.value = [
            { label: '审核中', value: 0, path: '' },
            { label: '销售中', value: 9, path: '' },
            { label: '已下架', value: 0, path: '' },
            { label: '库存预警', value: 0, path: '' },
        ]
        orderData.value = [
            { label: '待付款', value: 3, path: '' },
            { label: '待发货', value: 14, path: '' },
            { label: '已发货', value: 1, path: '' },
            { label: '退款中', value: 17, path: '' },
        ]
    }, 300)
</script>
