<template>
<n-result status="500" title="500 服务器错误" description="生活总归带点荒谬">
    <template #footer>
      <n-button @click="$router.push('/')">找点乐子吧</n-button>
    </template>
  </n-result>
</template>

<script setup>
</script>