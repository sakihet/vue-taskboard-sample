import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    members: [
      { id: 1, name: '🐱' },
      { id: 2, name: '🐶' },
      { id: 3, name: '🐹' }
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
    ]
  },
  getters: {
    members: state => state.members,
    tasks: state => state.tasks,
    statuses: state => state.statuses
  },
  mutations: {
    updateTaskStatus (state, payload) {
      state.tasks.find(x => x.id === payload.taskId).statusId = payload.statusId
    },
    addTask (state, payload) {
      state.tasks.push(payload.task)
    }
  },
  actions: {
    incrementTaskStatus ({ commit, state }, task) {
      let statusIds = state.statuses.map(x => x.id)
      let statusIndex = statusIds.findIndex(x => x === task.statusId)
      if (statusIndex < statusIds.length - 1) {
        commit('updateTaskStatus', { taskId: task.id, statusId: statusIds[statusIndex + 1] })
      }
    },
    decrementTaskStatus ({ commit, state }, task) {
      let statusIds = state.statuses.map(x => x.id)
      let statusIndex = statusIds.findIndex(x => x === task.statusId)
      if (statusIndex >= 1) {
        commit('updateTaskStatus', { taskId: task.id, statusId: statusIds[statusIndex - 1] })
      }
    },
    addTask ({ commit, state }, params) {
      let newId = state.tasks[state.tasks.length - 1].id + 1
      let task = Object.assign(params, { id: newId })
      commit('addTask', { task: task })
    }
  }
})
