<template>
  <div class="about">
    <!-- 个人介绍卡片 -->
    <el-card class="intro-card" shadow="hover">
      <div class="intro-content">
        <div class="avatar-section">
          <el-avatar :size="150" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
          <h2>前端开发工程师</h2>
          <p class="subtitle">专注于现代前端技术，热爱开源和分享</p>
        </div>
        <div class="info-section">
          <div class="info-item">
            <i class="el-icon-location-outline"></i>
            <span>北京市</span>
          </div>
          <div class="info-item">
            <i class="el-icon-message"></i>
            <span>developer@example.com</span>
          </div>
          <div class="info-item">
            <i class="el-icon-phone-outline"></i>
            <span>+86 138-0000-0000</span>
          </div>
          <div class="info-item">
            <i class="el-icon-date"></i>
            <span>从事前端开发 {{ experience }} 年</span>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 技能展示 -->
    <el-card class="skills-card" shadow="hover">
      <div slot="header">
        <h3><i class="el-icon-star-on"></i> 技能专长</h3>
      </div>
      <el-row :gutter="30">
        <el-col :md="12" :sm="24" v-for="skillCategory in skillCategories" :key="skillCategory.name">
          <div class="skill-category">
            <h4>{{ skillCategory.name }}</h4>
            <div class="skill-list">
              <div class="skill-item" v-for="skill in skillCategory.skills" :key="skill.name">
                <div class="skill-info">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-level">{{ skill.level }}%</span>
                </div>
                <el-progress 
                  :percentage="skill.level" 
                  :color="skill.color"
                  :stroke-width="8"
                  :show-text="false"
                ></el-progress>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 工作经历 -->
    <el-card class="experience-card" shadow="hover">
      <div slot="header">
        <h3><i class="el-icon-suitcase"></i> 工作经历</h3>
      </div>
      <el-timeline>
        <el-timeline-item
          v-for="job in workExperience"
          :key="job.id"
          :timestamp="job.period"
          placement="top"
        >
          <el-card class="job-card">
            <div class="job-header">
              <h4>{{ job.position }}</h4>
              <span class="company">{{ job.company }}</span>
            </div>
            <p class="job-description">{{ job.description }}</p>
            <div class="job-achievements">
              <h5>主要成就：</h5>
              <ul>
                <li v-for="achievement in job.achievements" :key="achievement">
                  {{ achievement }}
                </li>
              </ul>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>

    <!-- 项目展示 -->
    <el-card class="projects-card" shadow="hover">
      <div slot="header">
        <h3><i class="el-icon-folder-opened"></i> 项目作品</h3>
      </div>
      <el-row :gutter="20">
        <el-col :lg="8" :md="12" :sm="24" v-for="project in projects" :key="project.id">
          <el-card class="project-card" shadow="hover">
            <div class="project-image">
              <img :src="project.image" :alt="project.name">
            </div>
            <div class="project-content">
              <h4>{{ project.name }}</h4>
              <p>{{ project.description }}</p>
              <div class="project-tech">
                <el-tag 
                  v-for="tech in project.technologies" 
                  :key="tech" 
                  size="small"
                  class="tech-tag"
                >
                  {{ tech }}
                </el-tag>
              </div>
              <div class="project-actions">
                <el-button size="small" type="primary" @click="viewProject(project.demo)">
                  <i class="el-icon-view"></i>
                  预览
                </el-button>
                <el-button size="small" @click="viewCode(project.github)">
                  <i class="el-icon-link"></i>
                  源码
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <!-- 个人理念 -->
    <el-card class="philosophy-card" shadow="hover">
      <div slot="header">
        <h3><i class="el-icon-chat-dot-round"></i> 个人理念</h3>
      </div>
      <div class="philosophy-content">
        <el-row :gutter="30">
          <el-col :md="8" :sm="24" v-for="philosophy in philosophies" :key="philosophy.title">
            <div class="philosophy-item">
              <div class="philosophy-icon">
                <i :class="philosophy.icon"></i>
              </div>
              <h4>{{ philosophy.title }}</h4>
              <p>{{ philosophy.content }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 联系方式 -->
    <el-card class="contact-card" shadow="hover">
      <div slot="header">
        <h3><i class="el-icon-phone"></i> 联系我</h3>
      </div>
      <div class="contact-content">
        <p>如果您对我的工作感兴趣，或者有任何问题想要交流，欢迎通过以下方式联系我：</p>
        <div class="contact-methods">
          <div class="contact-method">
            <i class="el-icon-message"></i>
            <span>邮箱：developer@example.com</span>
          </div>
          <div class="contact-method">
            <i class="el-icon-phone"></i>
            <span>电话：+86 138-0000-0000</span>
          </div>
          <div class="contact-method">
            <i class="el-icon-link"></i>
            <span>GitHub：github.com/developer</span>
          </div>
        </div>
        <div class="contact-actions">
          <el-button type="primary" @click="$router.push('/contact')">
            <i class="el-icon-edit"></i>
            发送消息
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      experience: new Date().getFullYear() - 2019,
      skillCategories: [
        {
          name: '前端技术',
          skills: [
            { name: 'Vue.js', level: 90, color: '#4fc08d' },
            { name: 'React', level: 85, color: '#61dafb' },
            { name: 'JavaScript', level: 88, color: '#f7df1e' },
            { name: 'TypeScript', level: 82, color: '#3178c6' },
            { name: 'CSS3/Sass', level: 85, color: '#1572b6' },
            { name: 'HTML5', level: 90, color: '#e34f26' }
          ]
        },
        {
          name: '工具框架',
          skills: [
            { name: 'Webpack', level: 78, color: '#8dd6f9' },
            { name: 'Vite', level: 80, color: '#646cff' },
            { name: 'Element UI', level: 85, color: '#409eff' },
            { name: 'Node.js', level: 75, color: '#339933' },
            { name: 'Git', level: 88, color: '#f05032' },
            { name: 'Docker', level: 70, color: '#2496ed' }
          ]
        }
      ],
      workExperience: [
        {
          id: 1,
          position: '高级前端开发工程师',
          company: 'ABC科技有限公司',
          period: '2022年3月 - 至今',
          description: '负责公司核心产品的前端架构设计和开发，带领团队完成多个重要项目。',
          achievements: [
            '主导重构公司主要产品，性能提升40%',
            '建立前端开发规范和代码审查流程',
            '指导新人培训，提升团队整体技术水平',
            '参与产品架构设计，优化用户体验'
          ]
        },
        {
          id: 2,
          position: '前端开发工程师',
          company: 'XYZ互联网公司',
          period: '2020年6月 - 2022年2月',
          description: '参与多个Web应用的开发，积累了丰富的前端开发经验。',
          achievements: [
            '独立完成电商平台前端开发',
            '优化页面加载速度，提升50%性能',
            '实现响应式设计，支持多端适配',
            '参与技术选型和架构讨论'
          ]
        },
        {
          id: 3,
          position: '初级前端开发工程师',
          company: '123创业公司',
          period: '2019年7月 - 2020年5月',
          description: '从事前端开发工作，快速学习和成长，掌握现代前端技术栈。',
          achievements: [
            '快速掌握Vue.js和React框架',
            '参与公司官网和管理系统开发',
            '学习并应用前端工程化工具',
            '积极参与代码Review和技术分享'
          ]
        }
      ],
      projects: [
        {
          id: 1,
          name: '个人博客系统',
          description: '基于Vue2+ElementUI开发的个人博客系统，支持文章发布、分类管理、评论互动等功能。',
          image: 'https://picsum.photos/300/200?random=project1',
          technologies: ['Vue2', 'Element UI', 'Node.js', 'MongoDB'],
          demo: 'https://blog.example.com',
          github: 'https://github.com/developer/blog'
        },
        {
          id: 2,
          name: '电商管理平台',
          description: '企业级电商后台管理系统，包含商品管理、订单处理、用户管理等核心功能。',
          image: 'https://picsum.photos/300/200?random=project2',
          technologies: ['React', 'Ant Design', 'TypeScript', 'Redux'],
          demo: 'https://admin.example.com',
          github: 'https://github.com/developer/admin'
        },
        {
          id: 3,
          name: '数据可视化大屏',
          description: '基于D3.js和ECharts开发的数据可视化大屏，实时展示业务数据和统计图表。',
          image: 'https://picsum.photos/300/200?random=project3',
          technologies: ['Vue3', 'D3.js', 'ECharts', 'WebSocket'],
          demo: 'https://dashboard.example.com',
          github: 'https://github.com/developer/dashboard'
        }
      ],
      philosophies: [
        {
          title: '持续学习',
          icon: 'el-icon-reading',
          content: '技术日新月异，保持学习热情，跟上技术发展的步伐，不断提升自己的技术能力。'
        },
        {
          title: '用户至上',
          icon: 'el-icon-user',
          content: '以用户体验为中心，关注产品的可用性和易用性，为用户创造价值。'
        },
        {
          title: '团队协作',
          icon: 'el-icon-s-cooperation',
          content: '相信团队的力量，积极沟通，乐于分享，与团队成员共同成长。'
        }
      ]
    }
  },
  methods: {
    viewProject(url) {
      window.open(url, '_blank')
    },
    viewCode(url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style scoped>
.about {
  max-width: 1200px;
  margin: 0 auto;
}

.intro-card {
  margin-bottom: 30px;
}

.intro-content {
  display: flex;
  gap: 40px;
  align-items: center;
}

.avatar-section {
  text-align: center;
  min-width: 200px;
}

.avatar-section h2 {
  margin: 20px 0 10px;
  color: #333;
}

.subtitle {
  color: #666;
  font-size: 16px;
  margin: 0;
}

.info-section {
  flex: 1;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 16px;
  color: #666;
}

.info-item i {
  margin-right: 10px;
  color: #409EFF;
  width: 20px;
}

.skills-card,
.experience-card,
.projects-card,
.philosophy-card,
.contact-card {
  margin-bottom: 30px;
}

.skills-card h3,
.experience-card h3,
.projects-card h3,
.philosophy-card h3,
.contact-card h3 {
  margin: 0;
  color: #333;
}

.skills-card h3 i,
.experience-card h3 i,
.projects-card h3 i,
.philosophy-card h3 i,
.contact-card h3 i {
  margin-right: 8px;
  color: #409EFF;
}

.skill-category {
  margin-bottom: 30px;
}

.skill-category h4 {
  margin-bottom: 20px;
  color: #333;
  font-size: 18px;
}

.skill-item {
  margin-bottom: 15px;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.skill-name {
  font-weight: 500;
  color: #333;
}

.skill-level {
  color: #666;
  font-size: 14px;
}

.job-card {
  margin-bottom: 0;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.job-header h4 {
  margin: 0;
  color: #333;
}

.company {
  color: #409EFF;
  font-weight: 500;
}

.job-description {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.6;
}

.job-achievements h5 {
  margin: 0 0 10px 0;
  color: #333;
}

.job-achievements ul {
  margin: 0;
  padding-left: 20px;
}

.job-achievements li {
  color: #666;
  margin-bottom: 5px;
  line-height: 1.5;
}

.project-card {
  height: 100%;
  margin-bottom: 20px;
}

.project-image {
  height: 180px;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 15px;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-content h4 {
  margin: 0 0 10px 0;
  color: #333;
}

.project-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.project-tech {
  margin-bottom: 15px;
}

.tech-tag {
  margin-right: 8px;
  margin-bottom: 5px;
}

.project-actions {
  display: flex;
  gap: 10px;
}

.philosophy-item {
  text-align: center;
  padding: 20px;
}

.philosophy-icon {
  font-size: 48px;
  color: #409EFF;
  margin-bottom: 15px;
}

.philosophy-item h4 {
  margin: 0 0 15px 0;
  color: #333;
}

.philosophy-item p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.contact-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.contact-methods {
  margin-bottom: 30px;
}

.contact-method {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 16px;
  color: #666;
}

.contact-method i {
  margin-right: 10px;
  color: #409EFF;
  width: 20px;
}

.contact-actions {
  text-align: center;
}

@media (max-width: 768px) {
  .intro-content {
    flex-direction: column;
    text-align: center;
  }
  
  .skill-category {
    margin-bottom: 20px;
  }
  
  .job-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .project-actions {
    flex-direction: column;
  }
  
  .philosophy-item {
    margin-bottom: 30px;
  }
}
</style>