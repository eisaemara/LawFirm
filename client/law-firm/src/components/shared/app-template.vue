<template>
  <el-container >
    <el-header class="navbar" >
      <div></div>
      <div style="flex:1"></div>
      <div>
        <el-button >{{$t('Customers')}}</el-button>
        <el-button >{{$t('Cases')}}</el-button>
        <el-button >{{$t('Consultations')}}</el-button>
        <el-button >{{$t('Companies')}}</el-button>
        <el-button >{{$t('Users')}}</el-button>
        <el-button >{{$t('Tasks')}}</el-button>
        <el-button >{{$t('Calendar')}}</el-button>
      </div>
    </el-header>
  <el-main style="padding-top:0px;">
    <div class="container" >
<slot></slot>
    </div>
    
  </el-main>
</el-container>

</template>

<script>
export default {};
</script>


<style >
.el-header.navbar {
  background-color: #b3c0d1;
  color: #333;
  margin-left: -8px;
  margin-right: -8px;
  margin-top: -8px;
  padding: 0px 28px;
  height: 75px !important;
  display: flex;
  align-items: center;
}
.el-header.navbar .el-button{
  /* color: #312F2F;  */
  font-size: 16px;
  background-color: transparent;
  border:none;
  padding: 12px 15px;
}
.el-header.navbar .el-button+.el-button{
  margin-right: 5px;
}

</style>
