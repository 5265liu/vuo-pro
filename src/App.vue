<template>
  <div class="mainPage">
    <headerTitle></headerTitle>
  </div>
</template>

<script>
import headerTitle from './router/header.vue'

export default {
  components:{
    headerTitle:headerTitle
  },
  data:function(){
    return{
      fullHeight: document.documentElement.clientHeight,
      options: [{
          value: '11',
          label: 22
        }, {
          value: '22',
          label: 33
        }
      ],
      value:'',
      str:"11"
    }
  },
  created(){
    this.initData();
  },
  mounted(){
  },
  methods:{
    initData:function(){
      this.value = 11+'';
    }
  }
}
</script>

<style>
@import './assets/css/main.css';

.mainPage{
  width:100%;
  height:100%;
  background:rgb(4, 34, 70);
}
</style>
