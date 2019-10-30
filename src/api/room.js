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