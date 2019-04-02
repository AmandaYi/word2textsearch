<template>
  <div class="box">
    <Form ref="wordForm">
      <FormItem
        class="fromItem"
        v-for="(item,index) in wordList"
        :label="'word文档'"
        :key="index"
        :rules="item.rules?item.rules:{}"
      >
        <Row>
          <Col span="15">
          <Upload
            multiple
            action="###"
            :before-upload="(file)=>{
                BreakUpload(item,index,file)
            }"
          >
            <div v-show="item.wordFile == null">
              <Button icon="ios-cloud-upload-outline">添加文件</Button>
            </div>

            <div v-show="item.wordFile&&item.wordFile !== null">已选择: {{item.wordFile&& item.wordFile.name }}
              <Button icon="ios-cloud-upload-outline">重选文件</Button>
            </div>
          </Upload>
          </Col>
          <Col span="4">
          <Button @click="RemoveWord(item,index)">删除</Button>
          </Col>
        </Row>
        <Row v-show="item.wordFile&&item.wordFile !== null">
          <Col span="12">
          <Progress
            :percent="item.progress?item.progress:0"
            :status="item.status?item.status:'active'"
          />
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="3">
          <Button
            type="dashed"
            @click="createItem"
            icon="md-add"
          >增加</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="3">
          <Button
            @click="PostList"
            icon="md-add"
          >上传</Button>
          </Col>
        </Row>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Axios from "axios";
@Component
export default class UpWord extends Vue {
  data() {
    return {
      wordList: [{}]
    };
  }
  createItem() {
    this.$data.wordList.push({});
  }
  RemoveWord(item: any, index: number) {
    this.$data.wordList.splice(index, 1);
  }
  BreakUpload(item: any, index: number, file: any) {
    this.UpWord(item, index, file);
    return false;
  }
  //   增加word
  UpWord(item: any, index: number, file: any) {
    this.$data.wordList[index] = {
      wordFile: file
    };
    this.$forceUpdate();
  }
  PostList() {
    this.$data.wordList.forEach((item: any) => {
      item.progress = 0;
      this.UploadWordFile(item);
      //   item.timer = setInterval(() => {
      //     item.progress += 10;
      //     if (item.progress >= 100) {
      //       item.progress = 100;
      //       clearInterval(item.timer);
      //     }
      //     this.$forceUpdate();
      //   }, 1000);
    });
  }
    formData(item:any){
        let FD = new FormData();
        FD.append("word",item.wordFile)
        return FD
    }
  //   上传
  UploadWordFile(item: any) {
      let that = this
    Axios({
      url: "http://localhost:5000/uploadfile",
      method: "post",
      onUploadProgress: function(progressEvent: any) {
        that.UIProgress(item,progressEvent);
        // if (progressEvent.lengthComputable) {
        //   //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
        //   //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
        //   that.UIProgress(item,progressEvent);
        // }
      },
      headers:{
        
      },
      data:that.formData(item)

    }).then(res=>{
        // console.log(res)
    }).catch(err=>{
        // console.log(err)
    })
    ;
  }
//   进度条处理
UIProgress(item:any,progressEvent:any){
    let loaded:number = progressEvent.loaded;
    let total:number = progressEvent.total;
    let percent =(loaded / total ) * 100
    item.progress = percent
    this.$forceUpdate();
}
}
</script>
<style lang="scss" scoped>
.box {
  border: 1px solid #f60;
  width: 900px;
  margin: 0 auto;
  .fromItem {
    border-bottom: 1px solid #f60;
    padding: 20px 40px;
    &:hover {
      background-color: #eee;
      cursor: pointer;
    }
  }
}
</style>
