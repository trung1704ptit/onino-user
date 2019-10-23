<template>
  <el-form ref="updateForm" :model="updateForm" :rules="updateRules" class="form-wrapper form-wrapper" autocomplete="off" label-position="left">
    <el-form-item prop="fullName" class="el-form-item">
      <span class="svg-container">
        <svg-icon icon-class="user" />
      </span>
      <el-input
        ref="fullName"
        v-model="updateForm.fullName"
        :placeholder="$t('root.fullName')"
        name="fullName"
        type="text"
        tabindex="1"
      />
    </el-form-item>

    <el-form-item prop="phoneNumber" class="el-form-item">
      <span class="svg-container">
        <i class="el-icon-phone" />
      </span>
      <el-input
        ref="phoneNumber"
        v-model="updateForm.phoneNumber"
        :placeholder="$t('root.phone')"
        name="phoneNumber"
        type="text"
        tabindex="1"
      />
    </el-form-item>

    <el-form-item prop="email" class="el-form-item">
      <span class="svg-container">
        <svg-icon icon-class="email" />
      </span>
      <el-input
        ref="email"
        v-model="updateForm.email"
        placeholder="Email"
        name="email"
        type="text"
        tabindex="1"
      />
    </el-form-item>

    <el-form-item prop="address" class="el-form-item">
      <span class="svg-container">
        <i class="el-icon-location" />
      </span>
      <el-input
        ref="address"
        v-model="updateForm.address"
        :placeholder="$t('root.address')"
        name="address"
        type="text"
        tabindex="1"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click.native.prevent="updateProfile">{{ $t('root.update')}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { isEmpty, validEmail } from '@/utils/validate'
import codes from '@/utils/country-code'
import i18n from '@/lang'

export default {
  props: {
    user: {}
  },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!isEmpty(value) && !validEmail(value)) {
        callback(new Error(i18n.t('root.incorrectEmail')))
      } else {
        callback()
      }
    }
    const validateEmpty = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error(i18n.t('root.emptyString')))
      } else {
        callback()
      }
    }
    const noValidate = (rule, value, callback) => {
      callback()
    }
    return {
      updateForm: {
        fullName: this.user.profile.fullName,
        email: this.user.profile.email,
        phoneNumber: this.user.profile.phoneNumber,
        address: this.user.profile.address,
        avatarURL: this.user.profile.avatarURL,
        dateOfBirth: this.user.profile.dateOfBirth,
        gender: this.user.profile.gender
      },
      updateRules: {
        email: [{ required: false, trigger: 'blur', validator: validateEmail }],
        fullName: [{ required: false, trigger: 'blur', validator: validateEmpty }],
        phoneNumber: [{ required: false, trigger: 'blur', validator: noValidate }],
        address: [{ required: false, trigger: 'blur', validator: noValidate }],
      }
    }
  },
  methods: {
    updateProfile() {
      this.$refs.updateForm.validate(valid => {
        if (valid) {
          const form = this.updateForm;

          const data = {
            email: form.email,
            fullName: form.fullName,
            address: form.address,
            phoneNumber: form.phoneNumber,
            avatarURL: form.avatarURL,
            dateOfBirth: form.dateOfBirth,
            gender: form.gender
          }

          this.$message({
            message: i18n.t('profile.updateProfileSuccess'),
            type: 'success',
            duration: 5 * 1000
          })
        } else {
          return false;
        }
      })
    }
  }
}
</script>