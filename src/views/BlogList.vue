<template>
  <div class="blog-list">
    <!-- 搜索和筛选 -->
    <div class="filter-section">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索博客标题或内容..."
            prefix-icon="el-icon-search"
            clearable
            @input="handleSearch"
          ></el-input>
        </el-col>
        <el-col :span="8">
          <el-select v-model="selectedCategory" placeholder="选择分类" clearable @change="handleCategoryChange">
            <el-option
              v-for="category in categories"
              :key="category.value"
              :label="category.label"
              :value="category.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>

    <!-- 博客列表 -->
    <div class="blogs-container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="8" v-for="blog in filteredBlogs" :key="blog.id">
          <el-card class="blog-card" shadow="hover" @click.native="viewBlog(blog.id)">
            <div class="blog-cover">
              <img :src="blog.cover" :alt="blog.title">
              <div class="category-tag">
                <el-tag :type="getCategoryType(blog.category)" size="small">
                  {{ blog.category }}
                </el-tag>
              </div>
            </div>
            <div class="blog-content">
              <h3 class="blog-title">{{ blog.title }}</h3>
              <p class="blog-excerpt">{{ blog.excerpt }}</p>
              <div class="blog-meta">
                <div class="meta-left">
                  <span><i class="el-icon-time"></i>{{ blog.date }}</span>
                  <span><i class="el-icon-view"></i>{{ blog.views }}</span>
                </div>
                <div class="meta-right">
                  <span><i class="el-icon-chat-line-square"></i>{{ blog.comments }}</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[6, 12, 18, 24]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalBlogs"
      ></el-pagination>
    </div>

    <!-- 空状态 -->
    <div v-if="filteredBlogs.length === 0" class="empty-state">
      <el-empty description="暂无博客文章">
        <el-button type="primary" @click="clearFilters">清除筛选</el-button>
      </el-empty>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogList',
  data() {
    return {
      searchKeyword: '',
      selectedCategory: '',
      currentPage: 1,
      pageSize: 6,
      categories: [
        { label: 'Vue.js', value: 'vue' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'CSS', value: 'css' },
        { label: 'Node.js', value: 'nodejs' },
        { label: '前端工具', value: 'tools' },
        { label: '生活随笔', value: 'life' }
      ],
      blogs: [
        {
          id: 1,
          title: 'Vue3 Composition API 实战指南',
          excerpt: '深入了解Vue3的Composition API，学习如何在实际项目中应用这些新特性，提升开发效率和代码质量。',
          cover: 'https://picsum.photos/300/200?random=1',
          category: 'vue',
          date: '2024-01-15',
          views: 1250,
          comments: 23
        },
        {
          id: 2,
          title: 'JavaScript 异步编程最佳实践',
          excerpt: '掌握Promise、async/await等异步编程技巧，提升代码质量和性能，避免回调地狱。',
          cover: 'https://picsum.photos/300/200?random=2',
          category: 'javascript',
          date: '2024-01-12',
          views: 980,
          comments: 15
        },
        {
          id: 3,
          title: 'CSS Grid 布局完全指南',
          excerpt: '从基础到进阶，全面掌握CSS Grid布局系统，构建现代化的网页布局，响应式设计不再是难题。',
          cover: 'https://picsum.photos/300/200?random=3',
          category: 'css',
          date: '2024-01-10',
          views: 756,
          comments: 8
        },
        {
          id: 4,
          title: 'Node.js 性能优化实战',
          excerpt: '分享Node.js应用性能优化的实用技巧，包括内存管理、异步处理、数据库优化等方面。',
          cover: 'https://picsum.photos/300/200?random=4',
          category: 'nodejs',
          date: '2024-01-08',
          views: 654,
          comments: 12
        },
        {
          id: 5,
          title: 'Webpack 5 配置详解',
          excerpt: '详细介绍Webpack 5的新特性和配置方法，帮助开发者更好地构建现代化的前端项目。',
          cover: 'https://picsum.photos/300/200?random=5',
          category: 'tools',
          date: '2024-01-05',
          views: 432,
          comments: 6
        },
        {
          id: 6,
          title: '程序员的自我修养',
          excerpt: '分享作为程序员的成长心得，如何在技术快速发展的时代保持学习热情和职业竞争力。',
          cover: 'https://picsum.photos/300/200?random=6',
          category: 'life',
          date: '2024-01-03',
          views: 890,
          comments: 34
        },
        {
          id: 7,
          title: 'Vue Router 4 新特性解析',
          excerpt: '深入了解Vue Router 4的新特性和改进，学习如何在Vue3项目中使用新版路由。',
          cover: 'https://picsum.photos/300/200?random=7',
          category: 'vue',
          date: '2024-01-01',
          views: 567,
          comments: 9
        },
        {
          id: 8,
          title: 'TypeScript 进阶技巧',
          excerpt: '分享TypeScript的进阶用法和最佳实践，帮助开发者写出更安全、更优雅的代码。',
          cover: 'https://picsum.photos/300/200?random=8',
          category: 'javascript',
          date: '2023-12-28',
          views: 723,
          comments: 18
        }
      ]
    }
  },
  computed: {
    filteredBlogs() {
      let filtered = this.blogs

      // 关键词搜索
      if (this.searchKeyword) {
        filtered = filtered.filter(blog => 
          blog.title.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(this.searchKeyword.toLowerCase())
        )
      }

      // 分类筛选
      if (this.selectedCategory) {
        filtered = filtered.filter(blog => blog.category === this.selectedCategory)
      }

      return filtered
    },
    totalBlogs() {
      return this.filteredBlogs.length
    }
  },
  methods: {
    viewBlog(id) {
      this.$router.push(`/blog/${id}`)
    },
    handleSearch() {
      this.currentPage = 1
    },
    handleCategoryChange() {
      this.currentPage = 1
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    clearFilters() {
      this.searchKeyword = ''
      this.selectedCategory = ''
    },
    getCategoryType(category) {
      const typeMap = {
        vue: 'success',
        javascript: 'primary',
        css: 'warning',
        nodejs: 'success',
        tools: 'info',
        life: 'danger'
      }
      return typeMap[category] || 'info'
    }
  }
}
</script>

<style scoped>
.blog-list {
  max-width: 1200px;
  margin: 0 auto;
}

.filter-section {
  margin-bottom: 30px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

.blogs-container {
  margin-bottom: 30px;
}

.blog-card {
  cursor: pointer;
  transition: all 0.3s;
  height: 100%;
  margin-bottom: 20px;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px 0 rgba(0,0,0,.15);
}

.blog-cover {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 15px;
}

.blog-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.blog-card:hover .blog-cover img {
  transform: scale(1.05);
}

.category-tag {
  position: absolute;
  top: 10px;
  left: 10px;
}

.blog-content {
  padding: 0 10px 10px;
}

.blog-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-excerpt {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #999;
}

.meta-left span {
  margin-right: 15px;
}

.blog-meta i {
  margin-right: 4px;
}

.pagination-container {
  text-align: center;
  padding: 20px 0;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

@media (max-width: 768px) {
  .filter-section .el-row {
    flex-direction: column;
  }
  
  .filter-section .el-col {
    margin-bottom: 15px;
  }
  
  .filter-section .el-col:last-child {
    margin-bottom: 0;
  }
}
</style>