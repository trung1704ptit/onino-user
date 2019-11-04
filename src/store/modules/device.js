import { getDeviceList, updateDevice } from '@/api/device'
import i18n from '@/lang';

const state = {
    deviceList: [],
}

const mutations = {
    SET_DEVICE_LIST: (state, deviceList) => {
        state.deviceList = deviceList
    }
}

const actions = {
    getDeviceList({ commit, state }) {
        return new Promise((resolve, reject) => {
            getDeviceList().then(response => {
                if (!response) {
                    reject(i18n.t('root.somethingWentWrong'))
                }
                commit('SET_DEVICE_LIST', response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    updateDevice({ commit, state }) {
        return new Promise((resolve, reject) => {
            updateDevice().then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
