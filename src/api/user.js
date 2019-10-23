import request from '@/utils/request'
import { userEndpoint, authorizeHeader } from './endpoint'
import axios from 'axios'
import { getToken } from '@/utils/auth'

export function login(data) {
  return request({
    url: userEndpoint.userLoginEndpoint,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authorizeHeader}`
    }
  })
}

export function register(data) {
  return request({
    url: userEndpoint.userRegisterEndpoint,
    method: 'post',
    data
  })
}

export function verify(data) {
  return request({
    url: userEndpoint.userVerifyEndpoint,
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: userEndpoint.userProfileEndpoint,
    method: 'get',
    params: { access_token: token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function updateProfile(data) {
  return request({
    url: userEndpoint.updateProfileEndpoint,
    method: 'post',
    data
  })
}

export function uploadAvatar(formData) {
  return axios.post(
    userEndpoint.uploadAvatarEndpoint,
    formData,
    {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}
