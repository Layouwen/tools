<script lang="ts" setup>
import { mergeToLeft, formatJSONStr } from "@tools/utils";
import { NInput, NButton, useMessage } from "naive-ui";
import { reactive } from "vue";

const message = useMessage();

const sourceData = reactive({
  target: "",
  merge: "",
  result: ""
});

const valueData = reactive<Record<string, any>>({
  target: null,
  merge: null,
  result: null
});


const formatStr = (key: keyof typeof sourceData) => {
  if (!sourceData[key]) return;

  let hasError = false;
  try {
    const {
      string,
      data
    } = formatJSONStr(sourceData[key]);

    sourceData[key] = string;

    if (typeof data !== "object") {
      valueData[key] = null;
      hasError = true;
    } else {
      valueData[key] = data;
    }
  } catch (e) {
    valueData[key] = null;
    hasError = true;
    console.error(e, "layouwen error");
  }
  if (hasError) {
    message.warning("请检查 target 和 merge 是否正确");
  }
};

const mergeData = () => {
  if (!valueData.target || !valueData.merge) {
    message.warning("请检查 target 和 merge 是否正确");
    return;
  }

  const result = mergeToLeft(valueData.target, valueData.merge);
  sourceData.result = formatJSONStr(JSON.stringify(result)).string;
  valueData.result = result;
};

</script>

<template>
  <div class="flex h-screen gap-x-4">
    <n-input
      @blur="formatStr('target')"
      v-model:value="sourceData.target"
      type="textarea"
      placeholder="target value"
    />
    <n-input
      @blur="formatStr('merge')"
      v-model:value="sourceData.merge"
      type="textarea"
      placeholder="merge value"
    />
    <div class="flex items-center">
      <n-button @click="mergeData">
        merge
      </n-button>
    </div>
    <n-input
      v-model:value="sourceData.result"
      type="textarea"
      placeholder="result value"
    />
  </div>
</template>

<style scoped></style>
