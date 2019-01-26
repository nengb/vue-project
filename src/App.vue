<template>
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div> -->

   <div id="app">
    <router-view />
  </div>
</template>

<style>
body,html{
  background: #f2f2f2;
        font-size: 14px;

}
.page{
  height: 100%;
}
.page-content{
  padding:46px 0 0 0;

}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f2f2f2;
}
.add-address-btn{
  color: #fff;
}
.van-nav-bar{
   background-color: #b6271d !important;
}

.van-nav-bar__title{
   color: #fff !important;
}
 .van-button--danger{
    background-color:#b6271d !important;
    border:#b6271d !important;
  }


@keyframes show{
  from{transform: scale(0) }
  to{transform: scale(1)}
}
</style>
