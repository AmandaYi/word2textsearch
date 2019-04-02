<template>
  <div>
    <Modal
      v-model="modalVis"
      fullscreen
      :title="modalSearch.filename"
    >
      <div>
        <a :href="modalSearch.filepath">{{modalSearch.filename}}</a>
      </div>
      <br />
      <div>{{modalSearch.filetext}}</div>
    </Modal>
    <Form
      class="form-search"
      ref="formSearch"
      :model="formSearch"
      :label-width="120"
      :rules="ruleSearch"
    >
      <FormItem
        label="搜索考试内容或者标题"
        prop="fileTitle"
      >
        <Row>
          <Col span="14">
          <Input
            v-model="formSearch.fileTitle"
            class="ipt-title"
            @on-enter="SearchTitle('formSearch')"
          />
          </Col>
          <Col span="8">
          <Button
            class="form-btn"
            type="primary"
            @click="Back"
          >返回上传页面</Button>
          </Col>
        </Row>

      </FormItem>
      <FormItem>
        <Row>
          <Col span="14">
          <Button
            class="form-btn"
            type="primary"
            @click="SearchTitle('formSearch')"
          >搜索</Button>
          <Button
            class="form-btn reset-btn"
            @click="ResetTitle('formSearch')"
          >重置</Button>
          </Col>
        </Row>

      </FormItem>
    </Form>
    <Table
      :columns="tableHeader"
      :data="wordList"
      border
    ></Table>
  </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import Axios from "axios";
import ApiService from "./../api.js";
import { server } from "./../api.js";
@Component
export default class ListPage extends Vue {
  data() {
    return {
      modalVis: false,
      modalSearch: {
        filename: "",
        filetext: "",
        filepath: ""
      },
      formSearch: {
        fileTitle: ""
      },
      ruleSearch: {
        fileTitle: [
          { required: true, message: "请输入搜索的文件名", trigger: "blur" }
        ]
      },
      tableHeader: [
        {
          align: "center",
          title: "ID",
          key: "id",
          width: 100,
          sortable: true
        },
        {
          align: "center",
          title: "所属课程",
          key: "id",
          sortable: true
        },
        {
          align: "center",
          title: "word文件名",

          key: "filename",
          sortable: true
        },

        {
          align: "center",
          title: "文件预览",
          key: "filepath",
          sortable: true,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  attrs: { href: `${server}${params.row.filepath}` }
                },
                params.row.filename
              )
            ]);
          }
        },
        {
          align: "center",
          title: "详细",
          key: "id",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.row);
                    }
                  }
                },
                "查看图片转文字内容"
              )
            ]);
          }
        }
      ],
      wordList: [],
      page: 1,
      size: 50,
      fileName: ""
    };
  }
  created() {
    this.GetFileList();
  }
  SearchTitle(name) {
    this.$refs[name].validate(valid => {
      if (valid) {
        // 如果开始搜索了,那么就开始设置搜索的词语
        this.$data.fileName = this.$data.formSearch.fileTitle;
        this.GetFileList();
        // this.$Notice.destroy();
        // this.$Notice.success({
        //   title: "搜索功能通知",
        //   desc: "成功,请注意查看文件列表"
        // });
      } else {
        this.$Notice.destroy();
        this.$Notice.error({
          title: "搜索功能通知",
          desc: "请输入搜索的文件名"
        });
      }
    });
  }
  ResetTitle(name) {
    this.$refs[name].resetFields();
  }
  Back() {
    this.$router.back();
  }
  //   请求
  GetFileList() {
    let that = this;
    ApiService.GetFileList({
      page: this.$data.page,
      size: this.$data.size,
      // 搜索服务
      fileName: this.$data.fileName
    }).then(res => {
      console.log(res);
      that.$data.wordList = res.data.data;
    });
  }
  show(item) {
    this.$data.modalVis = !this.$data.modalVis;
    this.$data.modalSearch = {
      ...item,
      filepath:server+item.filepath
    };
    // console.log(item);
  }

}
</script>
<style lang="scss" scoped>
.form-search {
  .ipt-title {
    width: 80%;
  }
  .form-btn {
    width: 220px;
  }
  .reset-btn {
    margin-left: 30px;
  }
}
</style>
