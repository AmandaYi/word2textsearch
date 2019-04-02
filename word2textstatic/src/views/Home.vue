<template>
  <div class="home">
    <Row class="btns">
      <Col span="18">
      <Button
        class="form-btn"
        type="primary"
        @click="PushList"
      >搜索全部已上传的文件</Button>

      <Button
        class="form-btn"
        type="success"
        @click="Test"
      >测试服务器是否正常</Button>
      </Col>
    </Row>
    <Row>
      <Col
        span="14"
        offset="2"
      >
      <up-word></up-word>
      </Col>

    </Row>

  </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import UpWord from "./../components/upWord.vue";
import ApiService from "./../api.js";
@Component({
  components: {
    UpWord
  }
})
export default class HomePage extends Vue {
  PushList() {
    this.$router.push({
      name: "list"
    });
  }
  Test() {
    let that = this;
    this.$Notice.destroy();
    this.$Notice.info({
      title: "服务器通知",
      desc: "测试通信中!"
    });
    ApiService.Test().then(res => {
      console.log(res);
      if (res.data.errno == 0) {
        that.$Notice.destroy();
        that.$Notice.success({
          title: "服务器通知",
          desc: "通信正常使用!"
        });
      }
    });
  }
}
</script>
<style lang="scss">
#app {
  font-family: "Microsoft YaHei", sans-serif;
  text-align: center;
  color: #2c3e50;
}
.home {
  .btns {
    margin-top: 30px;
    margin-bottom: 30px;
    .form-btn {
      margin-left: 20px;
    }
  }
}
</style>
