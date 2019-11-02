import { getGroupIcons, getDeviceIcons } from '@/api/public'
import i18n from '@/lang';

const state = {
    groupIcons: [],
    deviceIcons: []
}

const mutations = {
    SET_GROUP_ICONS: (state, groupIcons) => {
        state.groupIcons = groupIcons
    },
    SET_DEVICE_ICONS: (state, deviceIcons) => {
        state.deviceIcons = deviceIcons
    },
}

const actions = {
    getGroupIcons({ commit, state }) {
        return new Promise((resolve, reject) => {
            getGroupIcons().then(response => {
                if (!response) {
                    reject(i18n.t('root.somethingWentWrong'))
                }
                commit('SET_GROUP_ICONS', response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    getDeviceIcons({ commit, state }) {
        return new Promise((resolve, reject) => {
            getDeviceIcons().then(response => {
                if (!response) {
                    reject(i18n.t('root.somethingWentWrong'))
                }
                commit('SET_DEVICE_ICONS', response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
