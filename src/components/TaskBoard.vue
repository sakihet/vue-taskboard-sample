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
      >
      <button @click="addTask">Add</button>
    </div>
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
export default {
  name: 'TaskBoard',
  data () {
    return {
      newTaskName: '',
      newTaskAssigneeId: null,
      newTaskPoint: 0,
      members: [
        { id: 1, name: '🐱' },
        { id: 2, name: '🐶' },
        { id: 3, name: '🐹'}
      ],
      statuses: [
        { id: 1, name: 'Open' },
        { id: 2, name: 'Doing' },
        { id: 3, name: 'Closed' }
      ],
      tasks: [
        { id: 1, name: 'task 1', statusId: 1, assigneeId: 1, point: 3 },
        { id: 2, name: 'task 2', statusId: 1, assigneeId: 2, point: 2 },
        { id: 3, name: 'task 3', statusId: 2, assigneeId: 1, point: 1 },
        { id: 4, name: 'task 4', statusId: 3, assigneeId: 3, point: 1 }
      ],
    }
  },
  methods: {
    incrementTaskStatus: function (task) {
      if (1 <= task.statusId && task.statusId <= 2) {
        task.statusId++
      }
    },
    decrementTaskStatus: function (task) {
      if (2 <= task.statusId && task.statusId <= 3) {
        task.statusId--
      }
    },
    addTask: function () {
      let newId = this.tasks[this.tasks.length - 1].id + 1
      this.tasks.push(
        {
          id: newId,
          name: this.newTaskName,
          statusId: 1,
          assigneeId: this.newTaskAssigneeId,
          mandays: this.newTaskMandays
        }
      ),
      this.newTaskName = ''
      this.newTaskAssigneeId = null
      this.newTaskPoint = 0
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
.statuses {
  border: 1px solid;
}
</style>
