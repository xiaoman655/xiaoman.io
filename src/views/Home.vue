<template>
  <div class="home">
    <!-- 欢迎区域 -->
    <el-card class="welcome-card" shadow="hover">
      <div class="welcome-content">
        <div class="avatar-section">
          <el-avatar :size="120" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
        </div>
        <div class="intro-section">
          <h1>欢迎来到我的个人博客</h1>
          <p class="subtitle">分享技术，记录生活</p>
          <div class="stats">
            <div class="stat-item">
              <span class="stat-number">{{ totalBlogs }}</span>
              <span class="stat-label">博客文章</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalViews }}</span>
              <span class="stat-label">总浏览量</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalComments }}</span>
              <span class="stat-label">评论数</span>
            </div>
          </div>
          <div class="action-buttons">
            <el-button type="primary" @click="$router.push('/blog')">
              <i class="el-icon-document"></i>
              查看博客
            </el-button>
            <el-button @click="$router.push('/about')">
              <i class="el-icon-user"></i>
              了解更多
            </el-button>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 最新博客 -->
    <div class="section">
      <div class="section-header">
        <h2>最新博客</h2>
        <el-button type="text" @click="$router.push('/blog')">
          查看全部 <i class="el-icon-arrow-right"></i>
        </el-button>
      </div>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" v-for="blog in recentBlogs" :key="blog.id">
          <el-card class="blog-card" shadow="hover" @click.native="viewBlog(blog.id)">
            <div class="blog-cover">
              <img :src="blog.cover" :alt="blog.title">
            </div>
            <div class="blog-info">
              <h3>{{ blog.title }}</h3>
              <p class="blog-excerpt">{{ blog.excerpt }}</p>
              <div class="blog-meta">
                <span><i class="el-icon-time"></i>{{ blog.date }}</span>
                <span><i class="el-icon-view"></i>{{ blog.views }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 技能标签 -->
    <div class="section">
      <div class="section-header">
        <h2>技术栈</h2>
      </div>
      <div class="skills">
        <el-tag 
          v-for="skill in skills" 
          :key="skill.name" 
          :type="skill.type" 
          size="medium"
          class="skill-tag"
        >
          {{ skill.name }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      totalBlogs: 25,
      totalViews: '10.2k',
      totalComments: 156,
      recentBlogs: [
        {
          id: 1,
          title: 'Vue3 Composition API 实战指南',
          excerpt: '深入了解Vue3的Composition API，学习如何在实际项目中应用这些新特性...',
          cover: 'https://picsum.photos/300/200?random=1',
          date: '2024-01-15',
          views: 1250
        },
        {
          id: 2,
          title: 'JavaScript 异步编程最佳实践',
          excerpt: '掌握Promise、async/await等异步编程技巧，提升代码质量和性能...',
          cover: 'https://picsum.photos/300/200?random=2',
          date: '2024-01-12',
          views: 980
        },
        {
          id: 3,
          title: 'CSS Grid 布局完全指南',
          excerpt: '从基础到进阶，全面掌握CSS Grid布局系统，构建现代化的网页布局...',
          cover: 'https://picsum.photos/300/200?random=3',
          date: '2024-01-10',
          views: 756
        }
      ],
      skills: [
        { name: 'Vue.js', type: 'success' },
        { name: 'JavaScript', type: 'primary' },
        { name: 'TypeScript', type: 'info' },
        { name: 'Node.js', type: 'success' },
        { name: 'CSS3', type: 'warning' },
        { name: 'HTML5', type: 'danger' },
        { name: 'Element UI', type: 'primary' },
        { name: 'Webpack', type: 'info' },
        { name: 'Git', type: 'success' }
      ]
    }
  },
  methods: {
    viewBlog(id) {
      this.$router.push(`/blog/${id}`)
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-card {
  margin-bottom: 30px;
}

.welcome-content {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 20px;
}

.avatar-section {
  text-align: center;
}

.intro-section h1 {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}

.stats {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 24px;
  color: #333;
  margin: 0;
}

.blog-card {
  cursor: pointer;
  transition: all 0.3s;
  height: 100%;
}

.blog-card:hover {
  transform: translateY(-5px);
}

.blog-cover {
  height: 180px;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 15px;
}

.blog-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-info h3 {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.4;
}

.blog-excerpt {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

.blog-meta i {
  margin-right: 4px;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-tag {
  margin: 0;
}

@media (max-width: 768px) {
  .welcome-content {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .stats {
    justify-content: center;
  }
  
  .action-buttons {
    justify-content: center;
  }
}
</style>