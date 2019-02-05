<template>
  <div class="home">
    <h1>taskboard sample</h1>
    <TaskBoard />
  </div>
</template>

<script>
import TaskBoard from '@/components/TaskBoard.vue'

export default {
  name: 'home',
  components: {
    TaskBoard
  }
}
</script>
