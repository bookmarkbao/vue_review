<script>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { updateUserInfo } from "@/assets/data/UserInfoController.js";
export default {
  props: {
    readMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    userinfoClickCancel: (trigger) => {
      if (trigger) {
        return true;
      }
      return false;
    },
    userinfoClickConfirm: ({ trigger }) => {
      if (trigger) {
        return true;
      }
      return false;
    },
  },
  setup(props, { emit }) {
    /** vuex */
    const store = useStore();
    /** 唯讀模式 */
    const { readMode } = props;
    /** 標題寬度 */
    const labelWidth = ref(120);
    /** 使用者資訊 */
    const objUser = reactive({ data: {} });

    /** 加載圖示控制 */
    const hasLoading = ref(false);

    // const objUser = computed(() => {
    //   let xx = JSON.parse(JSON.stringify(store.getters.getObjUser));
    //   return { data: { ...xx } };
    // });

    watch(
      () => store.getters.getObjUser,
      (val, oldVal) => {
        objUser.data = JSON.parse(JSON.stringify(store.getters.getObjUser));
      }
    );

    /** 按下取消:發送取消事件 */
    const handCancelClick = () => {
      objUser.data = JSON.parse(JSON.stringify(store.getters.getObjUser));
      emit("userinfoClickCancel", "onCancel");
    };

    /** 按下確認:修改使用者資訊 */
    const handConfirmClick = async () => {
      try {
        hasLoading.value = true;
        const result = await updateUserInfo(objUser.data, store);
        // objUser.data = { ...result.data };
        hasLoading.value = false;

        handCancelClick();
        // emit("userinfoClickConfirm", "onConfirm");
      } catch (error) {}
    };

    onMounted(() => {
      objUser.data = JSON.parse(JSON.stringify(store.getters.getObjUser));
    });

    return {
      readMode,
      labelWidth,
      objUser,
      hasLoading,
      handCancelClick,
      handConfirmClick,
    };
  },
};
</script>
<template>
  <el-form v-model="objUser.data" :label-width="labelWidth">
    <el-form-item :label="$t('label.account')">
      <el-input v-model="objUser.data.accountId" disabled></el-input>
    </el-form-item>
    <el-form-item :label="$t('label.userName')">
      <el-input v-model="objUser.data.userName" :disabled="readMode"></el-input>
    </el-form-item>
    <el-form-item :label="$t('label.phone')">
      <el-input v-model="objUser.data.phone" :disabled="readMode"></el-input>
    </el-form-item>
    <el-form-item :label="$t('label.age')">
      <el-input-number
        v-model="objUser.data.age"
        :min="0"
        :max="99"
        :disabled="readMode"
      />
    </el-form-item>
    <el-form-item :label="$t('label.gender')" :label-width="labelWidth">
      <el-radio
        v-model="objUser.data.gender"
        label="M"
        size="large"
        :disabled="readMode"
        >{{ $t("label.male") }}</el-radio
      >
      <el-radio
        v-model="objUser.data.gender"
        label="F"
        size="large"
        :disabled="readMode"
        >{{ $t("label.female") }}</el-radio
      >
    </el-form-item>
    <el-form-item class="center">
      <el-button
        v-loading.fullscreen.lock="hasLoading"
        @click="handCancelClick"
        >{{ $t("label.cancel") }}</el-button
      >
      <el-button @click="handConfirmClick">{{ $t("label.confirm") }}</el-button>
    </el-form-item>
  </el-form>
  <!-- <div id="btnBar">
    
  </div> -->
</template>

<style>
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  left: -60px;
}
</style>
