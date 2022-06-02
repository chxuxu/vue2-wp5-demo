import VueRouter from 'vue-router';
import App from './App.vue';
import Home from "./Home/Home.vue";
import SystemIndex from "./System/SystemIndex.vue";
import SystemUser from "./System/User/UserList.vue";
import SystemFields from "./System/Fields/FieldList.vue";
import SystemLog from "./System/Log/LogList.vue";

import FlowIndex from "./Flow/FlowIndex.vue";
import OrgIndex from "./Org/OrgIndex.vue";


const routers = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: App,
      children:[{
        path: '',
        component: Home
      },{
        path: 'system',
        component: SystemIndex,
        children:[{
          path: 'user',
          component: SystemUser,
        },{
          path: 'fields',
          component: SystemFields,
        },{
          path: 'log',
          component: SystemLog,
        }]
      },{
        path: 'flow',
        component: FlowIndex
      },{
        path: 'org',
        component: OrgIndex
      }]
      // children: [
      //   {
      //     // 当 /user/:id/profile 匹配成功，
      //     // UserProfile 会被渲染在 User 的 <router-view> 中
      //     path: 'profile',
      //     component: UserProfile
      //   },
      //   {
      //     // 当 /user/:id/posts 匹配成功
      //     // UserPosts 会被渲染在 User 的 <router-view> 中
      //     path: 'posts',
      //     component: UserPosts
      //   }
      // ]
    }
  ]
});

export default routers;