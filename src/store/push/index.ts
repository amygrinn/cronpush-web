import { Module } from 'vuex'
import http from '../http'
import getPushSubscription from './get-push-subscription'

interface Subscription {
  enabled: boolean
  endpoint: string
  timeZone: string
}

interface PushModule {
  subscription: Subscription
  vapidPublicKey: string
}

const pushModule: Module<PushModule, any> = {
  namespaced: true,
  state: {
    subscription: {
      enabled: false,
      endpoint: '',
      timeZone: '',
    },
    vapidPublicKey: '',
  },
  getters: {
    enabled(state) {
      return state.subscription.enabled
    },
    endpoint(state) {
      return state.subscription.endpoint
    },
    timeZone(state) {
      return state.subscription.timeZone
    },
    vapidPublicKey(state) {
      return state.vapidPublicKey
    },
  },
  mutations: {
    setSubscription(state, subscription: Subscription) {
      state.subscription.enabled = subscription.enabled
      state.subscription.endpoint = subscription.endpoint
      state.subscription.timeZone = subscription.timeZone
    },
    disable(state) {
      state.subscription.enabled = false
    },
    setVapidPublicKey(state, key: string) {
      state.vapidPublicKey = key
    },
  },
  actions: {
    init: {
      root: true,
      async handler({ commit, dispatch }) {
        try {
          let { data: vapidPublicKey } = await http.get(
            '/push/vapid-public-key'
          )

          commit('setVapidPublicKey', vapidPublicKey)
          await navigator.serviceWorker.ready
          const subscription = await getPushSubscription(vapidPublicKey, false)
          const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

          if (!subscription) {
            commit('disable')
          } else {
            const result = await http.patch('/push', {
              endpoint: subscription.endpoint,
              timeZone,
            })

            commit('setSubscription', result.data)
            dispatch('schedules/refresh', null, { root: true })
          }
        } catch {
          commit('disable')
        }
      },
    },
    async updateSubscription({ commit, dispatch, getters }) {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

      try {
        const subscription = await getPushSubscription(
          getters.vapidPublicKey,
          true
        )
        if (subscription) {
          try {
            let result = await http.get('/push', {
              params: { endpoint: subscription.endpoint },
            })
            if (!result.data.enabled) {
              result = await http.patch('/push', {
                endpoint: subscription.endpoint,
                enabled: true,
                timeZone,
              })
            }
            commit('setSubscription', result.data)
          } catch {
            const result = await http.post('/push', {
              ...subscription.toJSON(),
              enabled: true,
              timeZone,
            })
            commit('setSubscription', result.data)
          } finally {
            dispatch('schedules/refresh', null, { root: true })
          }
        } else {
          commit('disable')
        }
      } catch {
        commit('disable')
      }
    },
    async disableSubscription({ commit, getters }) {
      if (getters.endpoint) {
        const result = await http.patch('/push', {
          endpoint: getters.endpoint,
          enabled: false,
        })
        commit('setSubscription', result.data)
      } else {
        commit('disable')
      }
    },
    async sendSubscription({ commit, getters }) {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

      if (getters.endpoint) {
        const result = await http.patch('/push', {
          endpoint: getters.endpoint,
          enabled: getters.enabled,
          timeZone,
        })
        commit('setSubscription', result.data)
      }
    },
  },
}

export default pushModule
