<template>
  <div class="navbar-menu">
    <div class="router-name">{{routerName}}</div>
    <div class="user-info">
      <div class="user-info-item">
        <div class="message">
          <img src="~assets/img/message.png"/>
        </div>
        <div class="notice">
          <img src="~assets/img/notice.png"/>
        </div>
      </div>
      <div class="user-info-item">
        <el-image class="headPortrait" :src="this.$store.getters.headPortrait"></el-image>

        <el-menu mode="horizontal" class="menu">
            <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
              <span class="user-name">{{this.$store.getters.nickName}}</span>
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
              <router-link class="inlineBlock" to="/">
                <el-dropdown-item>
                  首页
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
                <span @click="handleUpdateInfo" style="display:block;">修改信息</span>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <span @click="handleUpdatePass" style="display:block;">修改密码</span>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <span @click="logout" style="display:block;">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu>
      </div>
    </div>
    <el-dialog
            title="修改信息"
            :visible.sync="dialogInfoVisible"
            :append-to-body='true'
            width="40%"
    >
      <el-form
              :model="userAdminData"
              label-width="190px"
              :rules="rules"
              ref="userInfoFrom"
      >
        <el-form-item label="头像：" prop="icon">
          <single-upload v-model="userAdminData.icon"
                         style="width: 300px;display: inline-block;margin-left: 10px"
          ></single-upload>
        </el-form-item>
        <el-form-item label="昵称：" prop="nickName">
          <el-input v-model="userAdminData.nickName" style="width: 250px" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="userAdminData.email" style="width: 250px" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm('userInfoFrom')" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
            title="修改密码"
            :visible.sync="dialogPassVisible"
            :append-to-body='true'
            width="40%"
    >
      <el-form
              :model="userPassData"
              label-width="190px"
              :rules="rules"
              ref="userPassFrom"
      >
        <el-form-item label="原密码：" prop="oldPassword">
          <el-input placeholder="请输入原密码" type="password" v-model="userPassData.oldPassword" style="width: 250px" clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input placeholder="请输入新密码" type="password" v-model="userPassData.newPassword" style="width: 250px" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：" prop="confirmNewPassword">
          <el-input placeholder="请输入确认新密码" type="password" v-model="userPassData.confirmNewPassword" style="width: 250px" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handlePassDialogConfirm('userPassFrom')" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import Hamburger from 'components/common/Hamburger'
  import {mapGetters} from 'vuex'
  import {fetchGetItem,fetchUpdate,fetchUpdatePass} from 'network/plateformAccount'
  import SingleUpload from 'components/Upload/singleUpload'
  const defaultUserAdminData = {
    nickName:null,
    id:null,
    createTime:null,
    icon:null,
    email:null,
    loginTime:null,
    note:null,
    password:null,
    roleId:null
  }
  const defaultUserPassData = {
    oldPassword:null,
    newPassword:null,
    confirmNewPassword:null,
    id:null
  }
  export default {
    name: "",
    components:{
      Hamburger,
      SingleUpload
    },
    data(){
      return {
        dialogInfoVisible:false,
        dialogPassVisible:false,
        userAdminData:JSON.parse(JSON.stringify(defaultUserAdminData)),
        userPassData:JSON.parse(JSON.stringify(defaultUserPassData)),
        rules: {
          oldPassword: [
            {required: true,message: '请输入原密码',trigger: 'blur'},
            {min: 6,max: 20,message: '密码长度在6到20个字符之间',trigger: 'blur'}
          ],
          newPassword: [
            {required: true,message: '请输入新密码',trigger: 'blur'},
            {min: 6,max: 20,message: '密码长度在6到20个字符之间',trigger: 'blur'}
          ],
          confirmNewPassword: [
            {required: true,message: '请输入确认新密码',trigger: 'blur'},
            {min: 6,max: 20,message: '密码长度在6到20个字符之间',trigger: 'blur'}
          ],
          nickName: [{required: true, message: '请输入昵称', trigger: 'blur'}],
          icon: [{required: true, message: '请上传头像', trigger: 'blur'}],
        },
        routerName:null
      }
    },
    methods:{
      toggleSideBar(){
        this.$store.dispatch('toggleSideBar')
      },
      logout(){
        this.$store.dispatch('LogOut').then(res => {
          location.reload()
        })
      },
      handleUpdateInfo(){
        this.dialogInfoVisible = true
        fetchGetItem(this.$store.getters.id).then(res => {
          console.log(res);
          this.userAdminData = JSON.parse(JSON.stringify(res.data));
        })
      },
      handleDialogConfirm(ref){
        this.$refs[ref].validate((valid) => {
          if (valid) {
            this.$confirm('是否要确认?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.userAdminData.roleId = this.userAdminData.role.id
              fetchUpdate(this.userAdminData).then(res => {
                this.handleDialogConfirmResult(res)
              })
            })
          }else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
          }
        })
      },
      handleDialogConfirmResult(res){
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: 'success',
          });
          this.dialogInfoVisible = false;
          console.log(this.$route.path)
          this.$router.go(0)
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          });
        }
      },
      handleUpdatePass(){
        this.dialogPassVisible = true;
        this.userPassData = JSON.parse(JSON.stringify(defaultUserPassData));
      },
      handlePassDialogConfirm(ref) {
        this.$refs[ref].validate((valid) => {
          if (valid) {
            if(this.userPassData.newPassword != this.userPassData.confirmNewPassword){
              this.$message({
                message: '密码和确认密码不一致',
                type: 'error',
                duration:1000
              });
            }else {
              this.userPassData.id = this.id;
              console.log(this.userPassData)
              fetchUpdatePass(this.userPassData).then( res => {
                if(res.code == 200) {
                  this.$store.dispatch('LogOut').then(res => {
                    location.reload()
                  })
                }else {
                  this.$message({
                    message: res.message,
                    type: 'error',
                    duration:1000
                  });
                }
              })
            }
          }else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        })
      },
      handleGetRouteInfo(){
        console.log(this.$route)
        this.routerName = this.$route.meta.title;
      }
    },
    created(){
      this.handleGetRouteInfo();
    },
    computed:{
      ...mapGetters(['sidebar','id'])
    },
    watch: {
      $route() {
        this.handleGetRouteInfo()
      }
    },
  }
</script>

<style scoped>
  .navbar-menu{
    border-radius: 0px !important;
    display: flex;
    background-color: #f3f3f3 ;
    padding: 15px 30px 10px;
    justify-content: space-between;
  }
  .navbar-menu .hamburger-container{
    line-height: 55px;
    height: 45px;
    float: left;
    padding: 0 10px;
  }
  /*.avatar-container{*/
    /*height: 45px;*/
    /*line-height: 45px;*/
    /*display: inline-block;*/
    /*position: absolute;*/
    /*right: 35px;*/
  /*}*/
  .avatar-container .avatar-wrapper{
    cursor: pointer;
    position: relative;
  }
  .avatar-container .avatar-wrapper .user-avatar{
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  .avatar-container .avatar-wrapper .el-icon-caret-bottom {
    position: absolute;
    right: -20px;
    top: 16px;
    font-size: 12px;
  }
  .router-name {
    /*background-color: #fff;*/
    border-radius: 25px;
    font-size: 14px;
    padding: 0 65px 0 20px;
    height: 32px;
    line-height: 32px;
    border:1px solid #cceff5;
    background:#fafcfd
  }
  .user-info {
    width: 220px;
    height: 32px;
    /*background-color: #fff;*/
    border-radius: 25px;
    font-size: 14px;
    display: flex;
    padding: 0 20px;
    align-items: center;
    justify-content: space-between;
    border:1px solid #cceff5;
    background:#fafcfd
  }
  .message {
    width: 40px;
    height: 20px;
    background-color: #4d83ff;
    border-radius: 25px;
  }
  .notice {
    width: 40px;
    height: 20px;
    background-color: #4d83ff;
    border-radius: 25px;
    margin-left: 10px
  }
  .user-info .menu {
    height: 32px;
    line-height: 32px;
    border-radius: 25px;
  }
  .headPortrait {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 5px;
  }
  .user-info-item {
    display: flex;
    align-items: center;
  }
  .user-info-item img {
    width: 40px;
    height: 20px;
  }
</style>
