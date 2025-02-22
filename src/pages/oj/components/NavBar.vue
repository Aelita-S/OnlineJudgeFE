<template>
  <div id="header">
    <Menu
      theme="light"
      mode="horizontal"
      @on-select="handleRoute"
      :active-name="activeMenu"
      class="oj-menu"
    >
      <div class="logo">
        <span>{{website.website_name}}</span>
      </div>
      <Menu-item name="/">
        <Icon type="home"></Icon>
        {{$t('m.Home')}}
      </Menu-item>
      <Menu-item name="/problems">
        <Icon type="ios-keypad"></Icon>
        {{$t('m.NavProblems')}}
      </Menu-item>
      <Menu-item name="/contests">
        <Icon type="trophy"></Icon>
        {{$t('m.Contests')}}
      </Menu-item>
      <Menu-item name="/status">
        <Icon type="ios-pulse-strong"></Icon>
        {{$t('m.NavStatus')}}
      </Menu-item>
      <Menu-item name="/acm-rank">
        <Icon type="trophy"></Icon>
        {{$t('m.ACM_Rank')}}
      </Menu-item>

      <Submenu name="about">
        <template slot="title">
          <Icon type="information-circled"></Icon>
          {{$t('m.About')}}
        </template>
        <Menu-item name="/about">
          {{$t('m.Judger')}}
        </Menu-item>
        <Menu-item name="/FAQ">
          {{$t('m.FAQ')}}
        </Menu-item>
      </Submenu>
      
      <template v-if="!isAuthenticated">
        <div class="btn-menu">
          <Button
            type="ghost"
            ref="loginBtn"
            shape="circle"
            @click="handleBtnClick('login')"
          >{{$t('m.Login')}}</Button>
          <Button
            v-if="website.allow_register"
            type="ghost"
            shape="circle"
            @click="handleBtnClick('register')"
            style="margin-left: 5px;"
          >{{$t('m.Register')}}</Button>
        </div>
      </template>
      <template v-else>
        <div style="float:right">
          <Dropdown class="drop-menu" @on-click="handleRoute" placement="bottom" trigger="click">
            <Button type="text" class="drop-menu-title">
              {{ profile.school === '' ? user.username : profile.school }}
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list">
              <Dropdown-item name="/user-home">{{$t('m.MyHome')}}</Dropdown-item>
              <Dropdown-item name="/status?myself=1">{{$t('m.MySubmissions')}}</Dropdown-item>
              <Dropdown-item name="/setting/profile">{{$t('m.Settings')}}</Dropdown-item>
              <Dropdown-item v-if="isAdminRole" name="/admin">{{$t('m.Management')}}</Dropdown-item>
              <Dropdown-item divided name="/logout">{{$t('m.Logout')}}</Dropdown-item>
            </Dropdown-menu>
          </Dropdown>
          <div class="avatar-container">
            <a @click="goPerson">
              <img class="avatar" :src="avatar" />
              <div class="avatar-mask" />
            </a>
          </div>

        </div>
      </template>
    </Menu>
    <Modal v-model="modalVisible" :width="400">
      <div slot="header" class="modal-title">{{$t('m.Welcome_to')}} {{website.website_name_shortcut}}</div>
      <component :is="modalStatus.mode" v-if="modalVisible"></component>
      <div slot="footer" style="display: none"></div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import login from '@oj/views/user/Login'
import register from '@oj/views/user/Register'
import api from '@oj/api'

export default {
  components: {
    login,
    register
  },
  mounted () {
    this.getProfile()
  },
  methods: {
    ...mapActions(['getProfile', 'changeModalStatus']),
    getAvatar () {
      api.getUserInfo(this.user.username).then(res => {
        this.avatar = res.data.data.avatar
      })
    },
    handleRoute (route) {
      if (route && route.indexOf('admin') < 0) {
        this.$router.push(route)
      } else {
        window.location.assign('/admin/')
      }
    },
    handleBtnClick (mode) {
      this.changeModalStatus({
        visible: true,
        mode: mode
      })
    },
    goPerson () {
      this.$router.push('/user-home?username=' + this.user.username)
    }
  },
  computed: {
    ...mapGetters(['website', 'modalStatus', 'user', 'avatar', 'profile', 'isAuthenticated', 'isAdminRole']),
    // 跟随路由变化
    activeMenu () {
      return '/' + this.$route.path.split('/')[1]
    },
    modalVisible: {
      get () {
        return this.modalStatus.visible
      },
      set (value) {
        this.changeModalStatus({ visible: value })
      }
    }
  }
}
</script>

<style lang="less" scoped>
#header {
  min-width: 930px;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  .oj-menu {
    background: #fdfdfd;
  }

  .logo {
    margin-left: 2%;
    margin-right: 2%;
    font-size: 20px;
    float: left;
    line-height: 60px;
  }

  .drop-menu {
    float: right;
    margin-right: 30px;
    position: absolute;
    right: 25px;
    &-title {
      font-size: 18px;
    }
  }
  .btn-menu {
    font-size: 16px;
    float: right;
    margin-right: 10px;
  }
}

.modal {
  &-title {
    font-size: 18px;
    font-weight: 600;
  }
}

.avatar-container {
  &:hover {
    .avatar-mask {
      width: 50px;
      height: 50px;
      -moz-border-radius: 120px;
      -webkit-border-radius: 120px;
      border-radius: 120px;
      -moz-box-shadow: 0 2px 0 #00abf2 inset;
      -webkit-box-shadow: 0 2px 0 #00abf2 inset;
      box-shadow: 0 2px 0 #00abf2 inset;
      animation: rotate-360 2s linear infinite;
    }
  }
  @keyframes rotate-360 {
    from {
      -moz-transform: rotate(0);
      -ms-transform: rotate(0);
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    to {
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  position: relative;
  .avatar {
    width: 40px;
    height: 40px;
    float: right;
    margin-right: 13px;
    margin-top: 10px;
    border-radius: 50%;
    box-shadow: 0 1px 1px 0;
  }
  .avatar-mask {
    float: right;
    margin-right: -45px;
    margin-top: 6px;
  }
}
</style>
