<template>
  <div class="container">
    <Card :padding="0">
      <div class="flex-container">
        <div class="menu">
          <Menu accordion @on-select="goRoute" :activeName="activeName" style="text-align: center;" width="auto">
            <div class="avatar-editor">
              <div class="avatar-container">
                
                <img class="avatar" :src="profile.avatar">
                  <div class="avatar-mask"/>
                </img>
                <!-- <div class="avatar-mask"> -->
                  <!-- <a @click.stop="goRoute({name: 'profile-setting'})">
                    <div class="mask-content">
                      <Icon type="camera" size="30"></Icon>
                      <p class="text">change avatar</p>
                    </div>
                  </a> -->
                <!-- </div>  -->
                
              </div>
            </div>

            <Menu-item name="/setting/profile">{{$t('m.Profile')}}</Menu-item>
            <Menu-item name="/setting/account">{{$t('m.Account')}}</Menu-item>
            <Menu-item name="/setting/security">{{$t('m.Security')}}</Menu-item>
          </Menu>
        </div>
        <div class="panel">
          <transition name="fadeInUp">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'profile',
    methods: {
      goRoute (routePath) {
        this.$router.push(routePath)
      }
    },
    computed: {
      ...mapGetters(['profile']),
      activeName () {
        return this.$route.path
      }
    }
  }
</script>

<style lang="less" scoped>
  @avatar-radius: 50%;

  .container {
    width: 90%;
    min-width: 800px;
    margin: auto;
  }

  .flex-container {
    .menu {
      flex: 1 0 150px;
      max-width: 250px;
      .avatar-editor {
        padding: 10% 22%;
        margin-bottom: 10px;
        .avatar-container {
          &:hover {
            .avatar-mask {
              opacity: .8;
              width: 150px;
              height: 150px;
              -moz-border-radius: 240px;
              -webkit-border-radius: 240px;
              border-radius: 240px;
              -moz-box-shadow: 0 4px 0 #00abf2 inset;
              -webkit-box-shadow: 0 4px 0 #00abf2 inset;
              box-shadow: 0 4px 0 #00abf2 inset;
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
            width: 100%;
            height: auto;
            max-width: 100%;
            display: block;
            border-radius: @avatar-radius;
            box-shadow: 0px 0px 1px 0px;
          }
          .avatar-mask {
              position: absolute;
              top: 50%;
              left: 50%;
              margin: -75px 0px 0px -75px;
              width: 120px;
              height: 120px;
          }
        }
      }

    }

    .panel {
      flex: auto;
      &::before {
        content: '';
        display: block;
        width: 1px;
        height: 100%;
        background: #dddee1;
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 1;
      }
    }

  }

  .ivu-menu-vertical.ivu-menu-light:after {
    /*取消默认的伪元素*/
    width: 0;
  }
</style>

<style lang="less">
  .setting-main {
    position: relative;
    margin: 10px 40px;
    padding-bottom: 20px;
    .setting-content {
      margin-left: 20px;
    }
    .mini-container {
      width: 500px;
    }
  }
</style>
