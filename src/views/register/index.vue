<template>
  <div class="auth-wrapper register-container">
    <lang-select class="set-language" />
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="login-form" autocomplete="on" label-position="left">
      <div class="flex">
        <img src="../../assets/img/onino-logo.png" class="login-logo"/>
      </div>

      <el-form-item prop="username" class="el-form-item">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          :placeholder="$t('login.username')"
          name="username"
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
          v-model="registerForm.email"
          placeholder="email"
          name="email"
          type="text"
          tabindex="1"
        />
      </el-form-item>

    <el-form-item prop="phone" class="el-form-item">
        <span class="svg-container">
          <i class="el-icon-phone" />
        </span>
        <el-input
        ref="phone"
        v-model="registerForm.phone"
        :placeholder="$t('root.phone')"
        name="phone"
        type="text" 
        tabindex="1"
        />
    </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password" class="el-form-item">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="registerForm.password"
            :type="passwordType"
            :placeholder="$t('login.password')"
            name="password"
            tabindex="2"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleRegister"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="confirmPassword" class="el-form-item">
          <span class="svg-container">
              <svg-icon icon-class="password" />
          </span>
          <el-input
              :key="passwordType"
              ref="confirmPassword"
              v-model="registerForm.confirmPassword"
              :type="passwordType"
              :placeholder="$t('register.confirmPassword')"
              name="confirmPassword"
              tabindex="2"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleRegister"
          />
          <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
          </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">
        {{ $t('root.register') }}
      </el-button>

      {{ $t('register.hasAccount') }}? <router-link
        to="/login"
        class="app-link"
      >
      {{ $t('root.login') }}
      </router-link>
    </el-form>
  </div>
</template>

<script>
import { isEmpty, validEmail } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import i18n from '@/lang'

export default {
  name: 'Register',
  components: { LangSelect },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error(i18n.t('root.emptyString')))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(i18n.t('login.passwordError1')))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error(i18n.t('root.incorrectEmail')))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error(i18n.t('root.emptyString')))
      } else {
        callback()
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (isEmpty(value) || value !== this.registerForm.password) {
        callback(new Error(i18n.t('register.confirmPasswordError')))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        email: [{ required: false, trigger: 'blur', validator: validateEmail }],
        phone: [{ required: false, trigger: 'blur', validator: validatePhone }],
        confirmPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.registerForm.username === '') {
      this.$refs.username.focus()
    } else if (this.registerForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/register', this.registerForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
@import '../login/style.scss';
</style>

<style lang="scss" scoped>
$dark_gray:#889aa4;
$light_gray:#eee;

.register-container, .forgot-password-container {
  min-height: 100%;
  width: 100%;
  background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('../../assets/img/login-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
  display: flex;

  .set-language {
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 18px;
    cursor: pointer;
  }

  .login-logo {
    width: 150px;
    height: 50px;
    margin: 0 auto 40px auto;
  }

  .login-form {
    position: relative;
    min-width: 500px;
    background-color: #FFF;
    border-radius: 4px;
    max-width: 100%;
    padding: 50px 35px;
    margin: auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    position: absolute;
    width: 30px;
    display: inline-block;
    z-index: 1;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .login-form {
      min-width: 90%
    }
  }
}
</style>
