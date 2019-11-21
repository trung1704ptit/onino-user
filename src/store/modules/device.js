import { getDeviceList, updateDevice, registerDevice, getDeviceById } from '@/api/device'

const state = {
    deviceList: [],
    deviceRegistered: []
}

const mutations = {
    SET_DEVICE_LIST: (state, deviceList) => {
        state.deviceList = deviceList
    },
    SET_DEVICE_REGISTERED: (state, deviceRegistered) => {
        state.deviceRegistered = deviceRegistered
    }
}

const actions = {
    getDeviceList({ commit, state }) {
        return new Promise((resolve, reject) => {
            getDeviceList().then(response => {
                commit('SET_DEVICE_LIST', response.groups)
                resolve(response.groups)
            }).catch(error => {
                reject(error)
            })
        })
    },
    updateDevice({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            updateDevice(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    registerDevice({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            registerDevice(data).then(response => {
                commit('SET_DEVICE_REGISTERED', response.devices)
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    },
    getDeviceById({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            getDeviceById(id).then(response => {
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
