<template>
  <div class="taskBoard">
    <div>
      <input
        type="text"
        v-model="newTaskName"
      >
      <select v-model="newTaskAssigneeId">
        <option
          v-for="member in members"
          :key="member.id"
          :value="member.id"
        >{{ member.name }}</option>
      </select>
      <input
        type="number"
        v-model.number="newTaskPoint"
        min="0"
      >
      <button @click="addTask">Add</button>
    </div>
    <div>
      <p>Statuses:</p>
      <span
        v-for="(status, index) in statuses"
        :key="status.id"
      >{{ status.name }}
        <button
          v-if="status.deletable"
          @click="deleteStatus(status.id)"
        >x</button>
        <button
          v-if="status.deletable && statuses[index + 1].deletable"
          @click="swapStatus(status)"
        >⇔</button>
        <input
          type="text"
          size="8"
          v-if="status.id !== statuses[statuses.length - 1].id"
          v-model="newStatusNames[status.id]"
          @keyup.enter="addStatus(status.id)"
        >
      </span>
    </div>
    <p>Tasks:</p>
    <div class="grid">
      <div
        v-for="status in statuses"
        :key="status.id"
        class="cell"
      >
        <p>{{ status.name }} ({{ tasks.filter(x => x.statusId === status.id).length }})</p>
        <div
          v-for="task in tasks.filter(x => x.statusId === status.id)"
          :key="task.id"
          class="taskCard"
        >
          <p>{{ task.name }}</p>
          <div class="taskCardGrid">
            <p class="taskCardCell">{{ members.find(x => x.id === task.assigneeId).name }}</p>
            <p class="taskCardCell">{{ task.point }} pt</p>
          </div>
          <div class="taskCardGrid">
            <button
              @click="decrementTaskStatus(task)"
              class="taskCardCell"
            >◀︎</button>
            <button
              @click="incrementTaskStatus(task)"
              class="taskCardCell"
            >▶︎</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TaskBoard',
  data () {
    return {
      newTaskName: '',
      newTaskAssigneeId: null,
      newTaskPoint: 0,
      newStatusNames: []
    }
  },
  computed: {
    ...mapGetters([
      'members',
      'statuses',
      'tasks'
    ])
  },
  methods: {
    incrementTaskStatus: function (task) {
      this.$store.dispatch('incrementTaskStatus', task)
    },
    decrementTaskStatus: function (task) {
      this.$store.dispatch('decrementTaskStatus', task)
    },
    addTask: function () {
      let params = {
        name: this.newTaskName,
        statusId: 1,
        assigneeId: this.newTaskAssigneeId,
        point: this.newTaskPoint
      }
      this.$store.dispatch('addTask', params)
      this.newTaskName = ''
      this.newTaskAssigneeId = null
      this.newTaskPoint = 0
    },
    addStatus: function (statusId) {
      if (this.newStatusNames.length !== 0) {
        let params = {
          previousStatusId: statusId,
          statusName: this.newStatusNames[statusId]
        }
        this.$store.dispatch('addStatus', params)
        this.newStatusNames = []
      }
    },
    deleteStatus: function (statusId) {
      this.$store.dispatch('deleteStatus', statusId)
    },
    swapStatus: function (status) {
      this.$store.dispatch('swapStatus', status)
    }
  }
}
</script>

<style scoped>
.grid {
  display: flex;
}
.cell {
  flex: 1;
  border-right: 1px dotted;
}
.taskCard {
  border: 1px solid;
  margin: 5px;
}
.taskCardGrid {
  display: flex;
}
.taskCardCell {
  flex: 1;
  text-align: center;
}
</style>
