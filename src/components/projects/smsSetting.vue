<style scoped>
.setTask {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px 15px;
  margin-left: 116px;
}
.setTask li {
  list-style: none;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
</style>
<template>
    <div>
        <Form ref="sms" :model="sms" :label-width="120" enctype="multipart/form-data" class="smsSetting">
            <FormItem label="任务起止时间" prop="aimcheck">
                <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                <span>至</span>
                <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="多轮任务发送" prop="switch1">
                <i-switch size="large" v-model="sms.switch1" @on-change="switch1change">
                    <span slot="open">On
                    </span>
                    <span slot="close">Off</span>
                </i-switch>
                <div v-if="sms.switch1 == true">
                    <ul class="setTask">
                        <li>
                            <p>任务1 </p>
                            <p>任务开始时间：由任务起止时间定</p>
                            <p>
                                <span>编辑短信：</span>
                                <send style="display:inline-block"></send>
                            </p>

                        </li>
                        <li v-for="(item, index) in addTask.items" v-if="item.status" :key="index">
                            <p style="text-align:right">
                                <Button @click="handleRemove(index)"><Icon type="close"></Icon></Button>
                            </p>
                            <p>任务{{index +2}}</p>
                            <p>任务开始时间：间隔上轮开始时间
                                <InputNumber v-model="item.value"></InputNumber>天内</p>
                            <p>
                                <span>编辑短信：</span>
                                <send style="display:inline-block"></send>
                            </p>
                        </li>
                        <li style="margin:10px 0">
                            <Button type="dashed" long @click="handleAdd">
                                <Icon type="ios-plus-outline"></Icon>添加任务</Button>
                        </li>
                    </ul>
                </div>
            </FormItem>
            <FormItem label="自动转电话维系任务" prop="switch2">
                <i-switch size="large" v-model="sms.switch2">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                </i-switch>
                <div v-if="sms.switch2 == true">
                    <ul class="setTask">
                        <li>
                            <p>自动转人工开始时间：自动任务短信发送后第<InputNumber></InputNumber>天。示例：1月1日发送自动任务短信，1月8日转人工任务。</p>
                            <p>自动转人工结束时间</p>                         
                        </li>                       
                    </ul>
                </div>
            </FormItem>
        </Form>

    </div>
</template>
<script>
import send from "../sms/send.vue"; //编辑短信的弹出框
export default {
  components: { send },
  data() {
    return {
      sms: {
        label: "",
        switch1: false,
        switch2: false,
        aimcheck: [], //选择的目标(用id在配合)
        allaims: [], //所有目标（下拉框数据）
        drugProject: "",
        order: [],
        orders: ["重要会员", "次要会员"]
      },
      addTask: {
        items: [
          {
            value: 0,
            index: 1,
            status: 1
          }
        ]
      }
    };
  },
  methods: {
    switch1change(status) {
      this.$Message.info("开关状态：" + status);
    },
    //添加任务
    handleAdd() {
      this.index++;
      this.addTask.items.push({
        value: 0,
        index: this.index,
        status: 1
      });
    },
    //减去任务
    handleRemove(index) {
      this.addTask.items[index].status = 0;
    }
  }
};
</script>
