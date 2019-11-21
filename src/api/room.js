import request from '@/utils/request';
import { roomEndpoint } from './endpoint';

export function getGroupIcons() {
    return request({
        url: roomEndpoint.groupIconsEndpoint,
        method: 'get'
    })
}

export function createRoom(data) {
    return request({
        url: roomEndpoint.createRoomEndpoint,
        method: 'post',
        data
    })
}

export function getAllRoom() {
    return request({
        url: roomEndpoint.getAllRoomEndpoint,
        method: 'get'
    })
}

export function deleteRoom(groupId){
    return request({
        url: roomEndpoint.deleteRoomEndpoint,
        method: 'delete',
        params: { groupId } 
    })
}

export function getInfo(groupId){
    return request({
        url: roomEndpoint.groupEndpoint + '/' + groupId + '/getInfo',
        method: 'get',
    })
}

export function updateRoom(data, groupId){
    return request({
        url: roomEndpoint.updateRoomEndpoint,
        method: 'put',
        data,
        params: { groupId }
    })
}

export function getRoomDevices(groupId){
    return request({
        url: roomEndpoint.groupEndpoint + '/' + groupId + '/getAllDevices',
        method: 'get'
    })
}