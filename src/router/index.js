import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import BlogList from '@/views/BlogList.vue'
import BlogDetail from '@/views/BlogDetail.vue'
import Contact from '@/views/Contact.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/blog',
    name: 'BlogList',
    component: BlogList,
    meta: { title: '博客列表' }
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: BlogDetail,
    meta: { title: '博客详情' }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: '关于我' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { title: '联系我' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - 个人博客`
  }
  next()
})

export default router