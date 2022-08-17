<template>
  <div>
    <div class="upload-title">
    <!-- <el-card> -->
      <!--<div slot="header" class="clearfix">
            <span>选择文件夹</span>
        </div>-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>ABC项目</el-breadcrumb-item>
        <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
      </el-breadcrumb>
    <!-- </el-card> -->
    </div>
      <el-card>
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          size="mini"
          label-width="100px"
          label-position="right"
        >
            <div slot="header" class="clearfix">
              <span>上传文档</span>
            </div>
            <div class="upload-header">
              <div  class="upload-demo"> 
                <el-upload
                  accept=".txt, .pdf, .doc, .docx, .xls, .xlsx"
                  action="https://jsonplaceholder.typicode.com/posts/"
                   :before-upload="onbeforeUpload" 
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="onUploadChange"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  >
                  <el-button
                        style="margin-left: 10px"
                        size="small"
                        type="success"
                        
                >上传</el-button>
                  <div slot="tip" class="el-upload__tip">可上传文件格式：*.txt, *.pdf, *.doc, *.docx, *.xls, *.xlsx</div>

                <div slot="file" slot-scope="{file}">
        
                </div>
                </el-upload>
              </div>
              <div class="upload-newWork">
                <el-button type="primary" size="small" @click="addFolder"  >新建文件夹</el-button>
              </div>
            </div>
          </el-card>
        </el-form>
    <el-card>
      <el-table
        :data="currentFolderData"
        ref="currentFolderData"
        stripe
        border
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
        @cell-mouse-enter="handleMouseEnter"
        @cell-mouse-leave="handleMouseLeave"
        size="mini"
        style="width: 100%"
        height="350"
        :default-sort="{ prop: 'createDate', order: 'descending' }"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="selection" width="45"> </el-table-column>
        <el-table-column
          prop="secertLevel"
          label="密级"
          width="50"
        ></el-table-column>
        <el-table-column label="名称" sortable="custom">
          <template slot-scope="scope" >
            <img
              class="icon-file"
              v-if="scope.row.type == 'folder'"
              src="../img/Icon/folder.png"
            />
            <template v-else-if="(scope.row.type = 'doc')">
              <img
                class="icon-file"
                v-if="scope.row.extName == 'docx' || scope.row.extName == 'doc'"
                src="../img/Icon/word.png"
              />
              <img
                class="icon-file"
                v-else-if="
                  scope.row.extName == 'xlsx' || scope.row.extName == 'xls'
                "
                src="../img/Icon/excel.png"
              />
              <img
                class="icon-file"
                v-else-if="scope.row.extName == 'pdf'"
                src="../img/Icon/pdf.png"
              />
              <img
                class="icon-file"
                v-else-if="scope.row.extName == 'txt'"
                src="../img/Icon/txt.png"
              />
              <img class="icon-file" v-else src="../img/Icon/unknown.png" />
            </template>
            <img class="icon-file" v-else src="../img/Icon/unknown.png" />
                <a v-show="!scope.row.isModifiedRow" style="color: black; margin-left: 10px" @click="ViewForFile">{{scope.row.name}}</a>
            <a v-show="scope.row.isModifiedRow">
                <el-input placeholder="请输入名称" v-model="scope.row.name" size="small" style="width:60%" ></el-input>
                <i class="el-icon-check" title="确定" @click="submitModify(scope.row)"></i>
                <i class="el-icon-close" title="取消" @click="cancleModify(scope.row)" ></i>
            </a>
          </template>
        </el-table-column>
        <el-table-column label="修改时间" width="180" sortable="custom">
          <template slot-scope="scope">

            <div class="hoverButton" v-show="scope.row.showFucArea">
              <i class="el-icon-edit" title="编辑" @click="rowModify(scope.row)"></i>
              <i class="el-icon-share" title="分享" @click="rowShare(scope.row)"></i>
              <i class="el-icon-delete" title="删除" @click="rowDelete(scope.row)"></i>
              <i class="el-icon-setting" title="设置" @click="rowSetting(scope.row)"></i>
            </div>
            <span style="margin-left: 10px" v-show="!scope.row.showFucArea">{{
              scope.row.createDate
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="120" sortable="custom">
          <template slot-scope="scope">
            <div v-show="!scope.row.showFucArea">
              <span v-if="scope.row.type == 'folder'">文件夹</span>
              <span v-else>{{ scope.row.extName }}文件</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="大小" width="100" sortable="custom">
          <template slot-scope="scope">
            <div v-show="!scope.row.showFucArea">
              <span v-if="scope.row.type == 'folder'">-</span>
              <span v-else>{{ scope.row.size }}</span>
            </div>
          </template>
        </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
module.exports = {
  data: function () {
    return {
      span: 8,
      currentFolder: { ID: "folder_user_001", name: "个人资料库" },
      //当前目录下的文件夹和文件列表
      currentFolderData: [
        {
          ID: 1,
          type: "folder",
          name: "ABC项目",
          parent: "folder_user_001",
          createDate: "2022-7-20 20:00",
          secertLevel: 1,
          showFucArea: false,
        },
        {
          ID: 2,
          type: "folder",
          name: "DFG项目",
          parent: "folder_user_001",
          createDate: "2022-7-20 20:00",
          secertLevel: 0,
          showFucArea: false,
        },
        {
          ID: 3,
          type: "doc",
          name: "工作心得.docx",
          extName: "docx",
          size: "5.8M",
          parent: "folder_user_001",
          createDate: "2022-7-22 22:00",
          secertLevel: 2,
          showFucArea: false,
        },
        {
          ID: 7,
          type: "doc",
          name: "ElementUI使用手册.pdf",
          extName: "pdf",
          size: "20.8M",
          parent: "folder_user_001",
          createDate: "2022-7-22 10:00",
          secertLevel: 0,
          showFucArea: false,
        },
        {
          ID: 8,
          type: "doc",
          name: "系统配置文件.ini",
          extName: "ini",
          size: "2K",
          parent: "folder_user_001",
          createDate: "2022-7-22 10:00",
          secertLevel: 1,
          showFucArea: false,
        },
        {
          ID: 4,
          type: "doc",
          name: "工作记录.xls",
          extName: "xls",
          size: "1.8M",
          parent: "folder_user_001",
          createDate: "2022-7-22 10:00",
          secertLevel: 2,
          showFucArea: false,
        },
        {
          ID: 5,
          type: "doc",
          name: "其他.txt",
          extName: "txt",
          size: "7K",
          parent: "folder_user_001",
          createDate: "2022-6-20 20:00",
          secertLevel: 1,
          showFucArea: false,
        },
      ],
      fileList: [], //上传控件的文件列表
      folderList: [], //用户的所有目录数据列表
      docList: [], //用户的所有文件数据列表
      formData: {
        DocName: "",
        ExtName: "",
        Size: "",
        Path: "1",
        UploaderID: "",
        UploaderName: "",
        DocState: "",
        SecLevel: "",
        file: null,
      },
    //   isNewRow:false,
    //   newFolderName:"",
      stateOptions: [
        {
          value: "0",
          label: "禁用",
        },
        {
          value: "1",
          label: "启用",
        },
      ],
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        account: [
          {
            required: true,
            message: "请输入登录名",
            trigger: "blur",
          },
        ],
        state: [
          {
            required: true,
            message: "请选择状态",
            trigger: "blur",
          },
        ],
        pwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
      roleDataTable: [],
    };
  },
  created: function () {
    if (this.isMobile() === true) {
      this.span = 23;
    }
    //用于数据初始化
    document.title = "新增文档";
    //this.getRoleData();
    this.keyupAnno();
  },
  methods: {
    onbeforeUpload: function (file) {
      const FIVE_M = 5 * 1024 * 1024;
      const accept = ".txt, .pdf, .doc, .docx, .xls, .xlsx";
      if (accept.indexOf(this.formData.ExtName) < 0) {
        this.$message.error("不支持的文件类型");
        return false;
      }
      if (file.size > FIVE_M) {
        this.$message.error("文件大小不能超过5M'");
        return false;
      }

      return true;
    },
    handleExceed: function (files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );

      return;
    },
    handlePreview(file) {
      console.log("file",file)
    },
    handleRemove(file) {
      console.log("file",file)
      //删除文件
      if (file && file.status == "success") {
        const fu = file.uid;
        const num = this.fileList.findIndex((value) => value.uid === fu);
        this.fileList.splice(num, 1);
        this.upImgToString();
      }
    },

    onUploadChange: function (file, fileList) {
      console.log("onUploadChange",file,fileList);
      let obj = {};
      fileList.forEach((v) =>{
         obj = {
          name: v.name
         }
      })
      this.currentFolderData.push(obj)

      this.formData.file = file;
      this.formData.DocName = file.name;
      this.formData.ExtName = file.name.replace(/.+\./, "");
      this.formData.Size = file.size;
      console.log(this.formData);
    },
    onUpload: function (file) {
      //let formData = new FormData()
      //formData.append('file', file.file)
      debugger;
      let upFile = file.file;
      this.formData.file = upFile;
      this.formData.DocName = upFile.name;
      this.formData.ExtName = upFile.name.replace(/.+\./, "");
      this.formData.Size = upFile.size;
      console.log(this.formData.DocName);
      console.log(this.formData.ExtName);
      //this.postUpload(formData).then((res) => {
      //    console.log(res)
      //    this.$message.success(this.$t('UPLOAD_SUCCESS'))
      //}).catch((e) => {
      //    this.$message.error(e.message)
      //})
    },
    // submitUpload: function () {
    // },
    addFolder: function () {
      //this.$message("执行文件夹创建");
      this.currentFolderData.unshift({
        ID: 0,
        type: "folder",
        name: "",
        parent: "folder_user_001",
        createDate: this.getCurrentTime(),
        secertLevel: 1,
        showFucArea: false,
        isModifiedRow: true
      });
    },
    submitModify:function(row){
      this.$message("提交编辑结果");
      row.ID=new Date().getMinutes();
      row.isModifiedRow=false;
    },
    cancleModify:function(row){
      this.$message("取消编辑");
      if(row.ID>0)
        row.isModifiedRow=false;
        else 
        this.currentFolderData.shift();
    },
    rowModify:function(row){
        this.$message("行编辑");
        if(!row.isModifiedRow)
            row["isModifiedRow"]=true;
    },
    rowShare:function(row){
        this.$message("行分享");
    },
    rowDelete:function(row){
        this.$message("行删除");
        this.currentFolderData.forEach((item,index)=>{
            if(item.ID == row.ID){
                this.currentFolderData.splice(index,1);
            }
        });
    },
    rowSetting:function(row){
        this.$message("行设置");
        
    },
    getCurrentTime:function(){
        let year = new Date().getFullYear();
        let month = new Date().getMonth()+1;
        let day = new Date().getDate();
        let hour = new Date().getHours();
        let minute = new Date().getMinutes();

        return year+'-'+month+'-'+day+' '+hour+':'+minute;
    },
    postUpload: function (file) {
      return axios({
        url: "upload",
        method: "post",
        data: file,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    getFolderData: function () {
      var that = this;
      var input = anno.getInput();
      input.uid = -1;
      anno.process(
        input,
        "Anno.Plugs.Logic/KNDocument/GetUserFolders",
        function (data) {
          if (data.status === true) {
            that.currentFolderData = data.outputData.lr;
          } else {
            that.$message.error("获取角色：" + data.msg);
          }
        }
      );
    },
    submitForm: function () {
      var that = this;
      this.$refs["elForm"].validate(function (valid) {
        if (!valid) return;
        //if(that.roleDataTable.length<=0){
        //   that.$message.error("至少选择一个角色");
        //  return;
        //}
        that.addDocument();
      });
    },
    resetForm: function () {
      this.$refs["elForm"].resetFields();
    },
    keyupAnno: function () {
      var that = this;
      document.onkeydown = function (e) {
        var _key = window.event.keyCode;
        if (_key === 13) {
          that.submitForm();
        }
      };
    },
    addDocument: function () {
      var that = this;
      var input = anno.getInput();
      //获取文档的表单对象
      input.udoc = JSON.stringify(that.formData);
      //获取目录的表单对象
      input.ufolder = JSON.stringify(that.roleDataTable);
      anno.process(
        input,
        "Anno.Plugs.Logic/KNDocument/AddDocument",
        function (data) {
          if (data.status === true) {
            that.$message({
              showClose: true,
              message: "保存成功",
              type: "success",
            });
            window.location.href = "./knowledge/index.html";
          } else {
            that.$message.error(data.msg);
          }
        }
      );
    },
    handleSelectionChange: function (val) {
      this.roleDataTable = val;
    },
    handleSortChange: function (val) {
      this.$message("排序操作");
    },
    handleMouseEnter: function (row, column, cell, event) {
        if(!row.isModifiedRow)
            row.showFucArea = true;
    },
    handleMouseLeave: function (row, column, cell, event) {
      row.showFucArea = false;
    },
    ViewForFile: function () {
      this.$message("文件预览操作");
    },
    tableRowClassName: function (row, index) {
      //console.log("rowclass-->",row)
      if (row.secertLevel == 0) {
        return "warning-row";
      } else if (row.secertLevel == 1) {
        return "success-row";
      } else {
        return "";
      }
    },
    isMobile: function () {
      if (
        window.navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      ) {
        return true; // 移动端
      } else {
        return false; // PC端
      }
    },
    // ,
    // rowClick:function(index){
    //     this.classID=index;
    //     $("ul li:first-child").removeClass('li_selected'); //切换的时候第一个不要选中
    //     $(this).addClass("li_selected");
    // },
    // rowDoubleClick:function(index){
    //     this.$message("双击打开文件夹或预览文件")
    // },
    // rowMouseOver:function(index){
    //     // this.className="selected";
    //     $(this).addClass("li_hover");
    // },
    // rowMouseOut:function(index){

    //     // this.className="selected";
    //     $(this).removeClass("li_hover");
    // }
  },
};
</script>
<style scoped>
.el-card {
  margin-bottom: 10px;
}
.el-card__header {
  padding: 5px 20px;
  font-size: 14px;
}
.el-card__body {
  padding-bottom: 0px;
}
.list-wrap {
  position: relative;
  overflow-y: scroll;
  width: 200px;
  margin: 100px auto;
  box-sizing: border-box;
  border: solid 1px red;
}
.upload-header {
    display: block;
    width: 100%;
    min-height: 66px;
}
.icon-file {
  width: 24px;
  vertical-align: middle;
  /*line-height: 24px;*/
}
.upload-demo {
  display: inline-block;
  float: left;
}
.upload-newWork {
  float: right;
}
.upload-title {
   padding:8px
}

.list {
  list-style: none;
  padding: 0;
}

.list li {
  border: solid 0px blue;
  line-height: 30px;
  /* list-style-type:none;
        list-style-image: url(images/icon.gif); */
}
.li_hover {
  background-color: lightskyblue;
  display: inline;
}
.li_selected {
  background-color: lightseagreen;
  border: solid 1px seagreen;
  display: inline;
}
.hoverButton {
  z-index: 99;
  display: block;
  position: absolute;
  top: 5px;
  left: -50px;
  width: 300px;
}
i {
  cursor: pointer;
  width: 24px;
}
.list li img {
  width: 24px;
  vertical-align: middle;
  /*line-height: 24px;*/
}
.list li span {
  vertical-align: middle;
  color: gray;
}
</style>