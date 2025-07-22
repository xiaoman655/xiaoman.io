<template>
  <div id="app">
    <!-- 侧边栏 -->
    <div class="sidebar" :class="{ 'mobile-open': mobileMenuOpen }">
      <div style="padding: 20px; text-align: center; border-bottom: 1px solid #434a50;">
        <h2 style="color: #fff; font-size: 18px; margin: 0;">个人博客</h2>
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        @select="handleMenuSelect"
      >
        <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/blog">
          <i class="el-icon-document"></i>
          <span slot="title">博客列表</span>
        </el-menu-item>
        <el-menu-item index="/about">
          <i class="el-icon-user"></i>
          <span slot="title">关于我</span>
        </el-menu-item>
        <el-menu-item index="/contact">
          <i class="el-icon-message"></i>
          <span slot="title">联系我</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 头部 -->
      <div class="header">
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <i class="el-icon-s-unfold"></i>
        </button>
        <h1 style="margin: 0; color: #333; font-size: 20px;">{{ pageTitle }}</h1>
        <div style="margin-left: auto;">
          <el-button type="text" @click="scrollToTop">
            <i class="el-icon-top"></i>
            返回顶部
          </el-button>
        </div>
      </div>

      <!-- 路由视图 -->
      <div class="content">
        <router-view />
      </div>
    </div>

    <!-- 移动端遮罩层 -->
    <div 
      v-if="mobileMenuOpen" 
      class="mobile-overlay" 
      @click="closeMobileMenu"
      style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 999;"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  computed: {
    pageTitle() {
      return this.$route.meta.title || '个人博客'
    }
  },
  methods: {
    handleMenuSelect() {
      // 移动端选择菜单后关闭侧边栏
      if (window.innerWidth <= 768) {
        this.mobileMenuOpen = false
      }
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted() {
    // 监听窗口大小变化
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.mobileMenuOpen = false
      }
    })
  }
}
</script>

<style>
.el-menu-vertical {
  border-right: none;
}

.el-menu-item {
  height: 50px;
  line-height: 50px;
}

.el-menu-item i {
  margin-right: 8px;
}
</style>