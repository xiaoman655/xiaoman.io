<template>
  <div class="blog-detail" v-if="blog">
    <!-- 返回按钮 -->
    <div class="back-button">
      <el-button @click="goBack" icon="el-icon-arrow-left">返回博客列表</el-button>
    </div>

    <!-- 博客头部 -->
    <div class="blog-header">
      <div class="blog-cover">
        <img :src="blog.cover" :alt="blog.title">
        <div class="blog-overlay">
          <div class="blog-title-section">
            <h1>{{ blog.title }}</h1>
            <div class="blog-meta">
              <el-tag :type="getCategoryType(blog.category)" size="medium">
                {{ getCategoryLabel(blog.category) }}
              </el-tag>
              <span class="meta-item">
                <i class="el-icon-time"></i>
                发布于 {{ blog.date }}
              </span>
              <span class="meta-item">
                <i class="el-icon-view"></i>
                {{ blog.views }} 次阅读
              </span>
              <span class="meta-item">
                <i class="el-icon-chat-line-square"></i>
                {{ blog.comments }} 条评论
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 博客内容 -->
    <div class="blog-content-wrapper">
      <el-row :gutter="30">
        <el-col :lg="18" :md="24">
          <div class="blog-content">
            <div class="content-body" v-html="blog.content"></div>
            
            <!-- 标签 -->
            <div class="blog-tags" v-if="blog.tags && blog.tags.length">
              <h4>相关标签</h4>
              <el-tag 
                v-for="tag in blog.tags" 
                :key="tag" 
                size="small" 
                class="tag-item"
              >
                {{ tag }}
              </el-tag>
            </div>

            <!-- 分享按钮 -->
            <div class="share-section">
              <h4>分享文章</h4>
              <div class="share-buttons">
                <el-button size="small" @click="shareToWeibo">
                  <i class="el-icon-share"></i>
                  微博
                </el-button>
                <el-button size="small" @click="shareToQQ">
                  <i class="el-icon-share"></i>
                  QQ空间
                </el-button>
                <el-button size="small" @click="copyLink">
                  <i class="el-icon-document-copy"></i>
                  复制链接
                </el-button>
              </div>
            </div>
          </div>
        </el-col>

        <!-- 侧边栏 -->
        <el-col :lg="6" :md="24">
          <div class="sidebar-content">
            <!-- 作者信息 -->
            <el-card class="author-card" shadow="hover">
              <div class="author-info">
                <el-avatar :size="60" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                <div class="author-details">
                  <h4>博主</h4>
                  <p>专注前端开发，分享技术心得</p>
                  <el-button size="small" type="primary" @click="$router.push('/about')">
                    了解更多
                  </el-button>
                </div>
              </div>
            </el-card>

            <!-- 相关文章 -->
            <el-card class="related-posts" shadow="hover">
              <div slot="header">
                <span>相关文章</span>
              </div>
              <div class="related-item" v-for="item in relatedPosts" :key="item.id" @click="viewRelatedPost(item.id)">
                <div class="related-cover">
                  <img :src="item.cover" :alt="item.title">
                </div>
                <div class="related-info">
                  <h5>{{ item.title }}</h5>
                  <span class="related-date">{{ item.date }}</span>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 评论区 -->
    <div class="comments-section">
      <el-card shadow="hover">
        <div slot="header">
          <span>评论 ({{ blog.comments }})</span>
        </div>
        <div class="comment-form">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="写下你的评论..."
            v-model="newComment"
          ></el-input>
          <div class="comment-actions">
            <el-button type="primary" @click="submitComment">发表评论</el-button>
          </div>
        </div>
        <div class="comments-list">
          <div class="comment-item" v-for="comment in comments" :key="comment.id">
            <el-avatar :size="40" :src="comment.avatar"></el-avatar>
            <div class="comment-content">
              <div class="comment-header">
                <span class="comment-author">{{ comment.author }}</span>
                <span class="comment-date">{{ comment.date }}</span>
              </div>
              <p class="comment-text">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>

  <!-- 加载状态 -->
  <div v-else class="loading-state">
    <el-skeleton :rows="10" animated></el-skeleton>
  </div>
</template>

<script>
export default {
  name: 'BlogDetail',
  data() {
    return {
      blog: null,
      newComment: '',
      relatedPosts: [
        {
          id: 2,
          title: 'JavaScript 异步编程最佳实践',
          cover: 'https://picsum.photos/100/80?random=2',
          date: '2024-01-12'
        },
        {
          id: 3,
          title: 'CSS Grid 布局完全指南',
          cover: 'https://picsum.photos/100/80?random=3',
          date: '2024-01-10'
        },
        {
          id: 7,
          title: 'Vue Router 4 新特性解析',
          cover: 'https://picsum.photos/100/80?random=7',
          date: '2024-01-01'
        }
      ],
      comments: [
        {
          id: 1,
          author: '张三',
          avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          content: '这篇文章写得很好，对我很有帮助！',
          date: '2024-01-16 10:30'
        },
        {
          id: 2,
          author: '李四',
          avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          content: '作者的技术分享很实用，期待更多文章。',
          date: '2024-01-16 14:20'
        }
      ]
    }
  },
  created() {
    this.loadBlogDetail()
  },
  methods: {
    loadBlogDetail() {
      const blogId = parseInt(this.$route.params.id)
      // 模拟从API获取博客详情
      setTimeout(() => {
        this.blog = {
          id: blogId,
          title: 'Vue3 Composition API 实战指南',
          cover: 'https://picsum.photos/1200/400?random=1',
          category: 'vue',
          date: '2024-01-15',
          views: 1250,
          comments: 23,
          tags: ['Vue3', 'Composition API', '前端开发', 'JavaScript'],
          content: `
            <h2>什么是 Composition API</h2>
            <p>Vue 3 的 Composition API 是一套基于函数的 API，它提供了更灵活的代码组织方式。与 Options API 相比，Composition API 让我们能够更好地复用逻辑，组织代码结构。</p>
            
            <h3>基本用法</h3>
            <p>在 Vue 3 中，我们可以使用 <code>setup()</code> 函数来使用 Composition API：</p>
            <pre><code>import { ref, reactive, computed, onMounted } from 'vue'

export default {
  setup() {
    // 响应式数据
    const count = ref(0)
    const state = reactive({
      name: 'Vue 3',
      version: '3.0'
    })

    // 计算属性
    const doubleCount = computed(() => count.value * 2)

    // 方法
    const increment = () => {
      count.value++
    }

    // 生命周期
    onMounted(() => {
      console.log('组件已挂载')
    })

    return {
      count,
      state,
      doubleCount,
      increment
    }
  }
}</code></pre>

            <h3>优势</h3>
            <ul>
              <li><strong>更好的逻辑复用</strong>：通过自定义 hooks，我们可以轻松地在组件间共享逻辑</li>
              <li><strong>更好的类型推导</strong>：TypeScript 支持更加完善</li>
              <li><strong>更灵活的代码组织</strong>：相关逻辑可以组织在一起，而不是分散在不同的选项中</li>
              <li><strong>更小的打包体积</strong>：tree-shaking 友好</li>
            </ul>

            <h3>实战示例</h3>
            <p>让我们通过一个实际的例子来看看 Composition API 的强大之处：</p>
            <pre><code>// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const doubleCount = computed(() => count.value * 2)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}</code></pre>

            <p>在组件中使用：</p>
            <pre><code>import { useCounter } from './composables/useCounter'

export default {
  setup() {
    const { count, doubleCount, increment, decrement, reset } = useCounter(10)
    
    return {
      count,
      doubleCount,
      increment,
      decrement,
      reset
    }
  }
}</code></pre>

            <h3>总结</h3>
            <p>Composition API 为 Vue 3 带来了更强大的功能和更好的开发体验。虽然学习曲线可能稍微陡峭一些，但它提供的灵活性和可维护性是值得的。建议在新项目中积极使用 Composition API，逐步熟悉其使用方式。</p>
          `
        }
      }, 500)
    },
    goBack() {
      this.$router.go(-1)
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
    },
    getCategoryLabel(category) {
      const labelMap = {
        vue: 'Vue.js',
        javascript: 'JavaScript',
        css: 'CSS',
        nodejs: 'Node.js',
        tools: '前端工具',
        life: '生活随笔'
      }
      return labelMap[category] || category
    },
    viewRelatedPost(id) {
      this.$router.push(`/blog/${id}`)
    },
    shareToWeibo() {
      const url = window.location.href
      const title = this.blog.title
      window.open(`https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`)
    },
    shareToQQ() {
      const url = window.location.href
      const title = this.blog.title
      window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`)
    },
    copyLink() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.$message.success('链接已复制到剪贴板')
      })
    },
    submitComment() {
      if (!this.newComment.trim()) {
        this.$message.warning('请输入评论内容')
        return
      }
      
      const comment = {
        id: Date.now(),
        author: '游客',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        content: this.newComment,
        date: new Date().toLocaleString()
      }
      
      this.comments.unshift(comment)
      this.newComment = ''
      this.$message.success('评论发表成功')
    }
  },
  watch: {
    '$route'() {
      this.loadBlogDetail()
    }
  }
}
</script>

<style scoped>
.blog-detail {
  max-width: 1200px;
  margin: 0 auto;
}

.back-button {
  margin-bottom: 20px;
}

.blog-header {
  margin-bottom: 30px;
}

.blog-cover {
  position: relative;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
}

.blog-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  padding: 40px 30px 30px;
}

.blog-title-section h1 {
  color: #fff;
  font-size: 32px;
  margin-bottom: 15px;
  line-height: 1.2;
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.meta-item {
  color: #fff;
  font-size: 14px;
  opacity: 0.9;
}

.meta-item i {
  margin-right: 5px;
}

.blog-content-wrapper {
  margin-bottom: 40px;
}

.blog-content {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

.content-body {
  line-height: 1.8;
  color: #333;
}

.content-body h2 {
  font-size: 24px;
  margin: 30px 0 15px;
  color: #333;
}

.content-body h3 {
  font-size: 20px;
  margin: 25px 0 12px;
  color: #333;
}

.content-body p {
  margin-bottom: 15px;
}

.content-body ul, .content-body ol {
  margin-bottom: 15px;
  padding-left: 20px;
}

.content-body li {
  margin-bottom: 8px;
}

.content-body pre {
  background: #f6f8fa;
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
  margin: 15px 0;
}

.content-body code {
  background: #f6f8fa;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 14px;
}

.content-body pre code {
  background: none;
  padding: 0;
}

.blog-tags {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.blog-tags h4 {
  margin-bottom: 15px;
  color: #333;
}

.tag-item {
  margin-right: 10px;
  margin-bottom: 8px;
}

.share-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.share-section h4 {
  margin-bottom: 15px;
  color: #333;
}

.share-buttons {
  display: flex;
  gap: 10px;
}

.sidebar-content {
  position: sticky;
  top: 20px;
}

.author-card {
  margin-bottom: 20px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.author-details h4 {
  margin: 0 0 8px 0;
  color: #333;
}

.author-details p {
  margin: 0 0 15px 0;
  color: #666;
  font-size: 14px;
}

.related-posts .related-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.related-item:hover {
  background-color: #f8f9fa;
}

.related-item:last-child {
  border-bottom: none;
}

.related-cover {
  width: 60px;
  height: 45px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
}

.related-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-info h5 {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #333;
  line-height: 1.4;
}

.related-date {
  font-size: 12px;
  color: #999;
}

.comments-section {
  margin-top: 40px;
}

.comment-form {
  margin-bottom: 30px;
}

.comment-actions {
  margin-top: 15px;
  text-align: right;
}

.comment-item {
  display: flex;
  gap: 15px;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 8px;
}

.comment-author {
  font-weight: bold;
  color: #333;
}

.comment-date {
  font-size: 12px;
  color: #999;
}

.comment-text {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.loading-state {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

@media (max-width: 768px) {
  .blog-cover {
    height: 250px;
  }
  
  .blog-title-section h1 {
    font-size: 24px;
  }
  
  .blog-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .blog-content {
    padding: 20px;
  }
  
  .author-info {
    flex-direction: column;
    text-align: center;
  }
}
</style>