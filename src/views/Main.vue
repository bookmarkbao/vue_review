<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  Setting,
  Menu,
  HomeFilled,
  Calendar,
  TurnOff,
  Briefcase,
} from "@element-plus/icons-vue";
import {
  Route_AXIOS,
  Route_VUE,
  Route_VUEX,
  Route_VUE_ROUTER,
  Route_GITHUB,
  Route_SOURCE_TREE,
  Route_MY_SCHEDULE,
  Route_MY_STOCK,
} from "@/router";
import {
  getFehIdByType,
  fehId_00007,
  fehId_00008,
} from "@/assets/data/InstructionController.js";
import LoginLabel from "../components/LoginLabel.vue";
import LanguageChooser from "../components/LanguageChooser.vue";

export default {
  components: {
    IconHome: HomeFilled,
    IconCalendar: Calendar,
    IconBriefcase: Briefcase,
    LoginLabel,
    LanguageChooser,
  },
  setup() {
    /** menu icon */
    const iconMenu = Menu;
    /** setting icon */
    const IconSetting = Setting;
    /** turnOff icon */
    const iconTurnOff = TurnOff;

    /** route */
    const store = useStore();
    /** router */
    const router = useRouter();

    /** Menu開關綁定 */
    const isOpenMenu = computed({
      get: () => {
        return store.getters.getIsOpenMenu;
      },
      set: (val) => {
        store.dispatch("commitIsOpenMenu");
      },
    });

    const handMenuOpen = (key, keyPath) => {
      // console.log(key, keyPath);
      // console.log("handMenuOpen");
    };
    const handMenuClose = (key, keyPath) => {
      // console.log(key, keyPath);
      // console.log("handMenuClose");
    };

    /**
     * Menu選擇改變,執行前端路由
     * @param {number} index 選擇功能的索引值
     * @param {string} indexPath 選擇功能的路徑
     */
    const handMenuSelect = (index, indexPath) => {
      let ary = [
        "",
        { path: Route_VUE },
        { path: Route_VUEX },
        { path: Route_VUE_ROUTER },
        { path: Route_GITHUB },
        { path: Route_SOURCE_TREE },
        { path: Route_AXIOS },
        { path: Route_MY_SCHEDULE },
        { path: Route_MY_STOCK },
      ];
      let routerType = ary[index]["path"];
      let fehId = getFehIdByType(routerType) || "";
      if (fehId === "") {
        router.push({
          path: `/main`,
        });
      } else if (fehId === fehId_00007 || fehId === fehId_00008) {
        router.push({
          path: `/main/${routerType}`,
        });
      } else {
        router.push({
          path: `/main/${routerType}/${fehId}`,
        });
      }
    };

    /**
     * Menu 打開/關閉
     */
    const handBtnOpenMenu = () => {
      isOpenMenu.value = !isOpenMenu;
    };

    /**
     * 按下登出,前端路由到首頁
     */
    const handLogout = () => {
      router.push("/");
      store.dispatch("commitObjUser", {});
    };

    /**
     * 按下Github,開啟Github
     */
    const handGithub = () => {
      window.open("https://github.com/Jim-Lin886/vue_review");
    };

    const qqqq = () => {
      console.log("qqqq");
      router.push({ path: "/main/salelist" });
    };
    const xxxx = () => {
      console.log("xxxx");
      router.push({ path: `/main/${Route_MY_STOCK}` });
    };
    return {
      iconMenu,
      IconSetting,
      iconTurnOff,
      isOpenMenu,
      handMenuOpen,
      handMenuClose,
      handMenuSelect,
      handBtnOpenMenu,
      handLogout,
      handGithub,
      xxxx,
      qqqq,
    };
  },
};
</script>

<template>
  <el-container
    class="layout-container-demo"
    style="height: 100vh; border: 1px solid #eee"
  >
    <el-container>
      <el-header style="height: 70px; text-align: left; font-size: 12px">
        <div class="toolbar">
          <el-row
            style="height: 70px"
            gutter="10"
            justify="space-between"
            align="middle"
          >
            <el-col :span="4">
              <el-tooltip :content="$t('label.menu')" placement="bottom">
                <el-button
                  type="primary"
                  style="width: 50px; height: 50px"
                  :icon="iconMenu"
                  circle
                  @click="handBtnOpenMenu"
                ></el-button>
              </el-tooltip>
            </el-col>
            <el-col :span="20">
              <div class="toolbar-left">
                <login-label :hasTimer="true" />

                <el-popover placement="bottom" :width="400" trigger="click">
                  <template #reference>
                    <el-button
                      type="primary"
                      style="width: 50px; height: 50px"
                      :icon="IconSetting"
                      circle
                    ></el-button>
                  </template>

                  <div style="height: 200px; width: 100%">
                    <h3>{{ $t("label.selectLang") }}</h3>
                    <language-chooser />
                  </div>
                </el-popover>

                <el-tooltip :content="$t('label.logout')" placement="bottom">
                  <el-button
                    type="primary"
                    style="width: 50px; height: 50px"
                    :icon="iconTurnOff"
                    circle
                    @click="handLogout"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="Github" placement="bottom">
                  <el-button
                    color="#f0f0f0"
                    style="width: 50px; height: 50px"
                    circle
                    @click="handGithub"
                  >
                    <el-icon>
                      <img
                        style="width: 30px; height: 30px"
                        alt=""
                        src="../assets/images/gitHub.png"
                      />
                    </el-icon>
                  </el-button>
                </el-tooltip>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-header>

      <el-main>
        <div id="main">
          <el-menu
            default-active="0"
            active-text-color="#ffd04b"
            background-color="#2980b9"
            class="el-menu-vertical-demo"
            text-color="#fff"
            :collapse="isOpenMenu"
            @open="handMenuOpen"
            @close="handMenuClose"
            @select="handMenuSelect"
          >
            <el-menu-item index="0">
              <el-icon :size="80"><icon-home /></el-icon>
              <span>{{ $t("label.home") }}</span>
            </el-menu-item>
            <el-menu-item index="7">
              <el-icon :size="80"><icon-calendar /></el-icon>
              <span>{{ $t("label.schedule") }}</span>
            </el-menu-item>
            <el-menu-item index="8">
              <el-icon :size="80"><icon-briefcase /></el-icon>
              <span>{{ $t("label.stock") }}</span>
            </el-menu-item>
            <el-menu-item index="1">
              <!-- <el-icon><icon-apple /></el-icon> -->
              <el-icon>
                <img
                  style="width: 30px; height: 30px"
                  alt=""
                  src="../assets/logo.png"
                />
              </el-icon>
              <template #title>Vue3.js</template>
            </el-menu-item>
            <el-menu-item index="2">
              <!-- <el-icon><icon-document /></el-icon> -->
              <el-icon>
                <img
                  style="width: 30px; height: 30px"
                  alt=""
                  src="../assets/images/vuex.png"
                />
              </el-icon>
              <template #title>Vuex4</template>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon>
                <img
                  style="width: 30px; height: 30px"
                  alt=""
                  src="../assets/images/vueRouter.png"
                />
              </el-icon>
              <template #title>Vue Router4</template>
            </el-menu-item>
            <el-menu-item index="6">
              <el-icon>
                <img
                  style="width: 30px; height: 30px"
                  alt=""
                  src="../assets/images/axios.png"
                />
              </el-icon>
              <template #title>Axios</template>
            </el-menu-item>
            <el-sub-menu index="">
              <template #title>
                <el-icon>
                  <img
                    style="width: 30px; height: 30px"
                    alt=""
                    src="../assets/images/git.png"
                  />
                </el-icon>
                <span>Git</span>
              </template>
              <el-menu-item index="4">
                <el-icon>
                  <img
                    style="width: 30px; height: 30px"
                    alt=""
                    src="../assets/images/gitHub.png"
                  />
                </el-icon>
                <template #title>GitHub</template>
              </el-menu-item>
              <el-menu-item index="5">
                <el-icon>
                  <img
                    style="width: 30px; height: 30px"
                    alt=""
                    src="../assets/images/sourceTree.png"
                  />
                </el-icon>
                <template #title>SourceTree</template>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>

          <div id="main-right">
            <router-view @mystocksalelist-exit="xxxx" @mystock-confirm="qqqq" />
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.test-bg {
  background: #e65775;
}

#main {
  height: 100%;
  display: flex;
  flex-flow: row nowrap;

  #main-right {
    // height: 100%;
    width: 100%;
    overflow: auto;
    // flex-basis: 100%;
  }
}

.layout-container-demo {
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0px;
  top: 0px;

  .el-header {
    position: relative;
    background-color: #3498db;
    color: var(--el-text-color-primary);
    padding: 0px;

    .toolbar {
      width: 100%;
      height: 100%;
      padding: 10;

      .toolbar-left {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }

  .el-menu {
    border-right: none;
  }
  .el-main {
    padding: 0;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
