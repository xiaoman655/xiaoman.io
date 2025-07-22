<template>
  <div class="contact">
    <el-row :gutter="40">
      <!-- 联系表单 -->
      <el-col :lg="14" :md="24">
        <el-card class="contact-form-card" shadow="hover">
          <div slot="header">
            <h3><i class="el-icon-edit"></i> 发送消息</h3>
            <p>有任何问题或合作意向，欢迎通过下面的表单联系我</p>
          </div>
          
          <el-form 
            ref="contactForm" 
            :model="form" 
            :rules="rules" 
            label-width="80px"
            @submit.native.prevent="submitForm"
          >
            <el-form-item label="姓名" prop="name">
              <el-input 
                v-model="form.name" 
                placeholder="请输入您的姓名"
                prefix-icon="el-icon-user"
              ></el-input>
            </el-form-item>
            
            <el-form-item label="邮箱" prop="email">
              <el-input 
                v-model="form.email" 
                placeholder="请输入您的邮箱地址"
                prefix-icon="el-icon-message"
              ></el-input>
            </el-form-item>
            
            <el-form-item label="电话" prop="phone">
              <el-input 
                v-model="form.phone" 
                placeholder="请输入您的联系电话（可选）"
                prefix-icon="el-icon-phone"
              ></el-input>
            </el-form-item>
            
            <el-form-item label="主题" prop="subject">
              <el-select v-model="form.subject" placeholder="请选择联系主题" style="width: 100%">
                <el-option label="技术咨询" value="tech"></el-option>
                <el-option label="项目合作" value="project"></el-option>
                <el-option label="工作机会" value="job"></el-option>
                <el-option label="博客反馈" value="feedback"></el-option>
                <el-option label="其他" value="other"></el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item label="消息" prop="message">
              <el-input 
                type="textarea" 
                v-model="form.message" 
                :rows="6"
                placeholder="请详细描述您的问题或需求..."
              ></el-input>
            </el-form-item>
            
            <el-form-item>
              <el-button 
                type="primary" 
                @click="submitForm" 
                :loading="submitting"
                size="medium"
              >
                <i class="el-icon-s-promotion"></i>
                {{ submitting ? '发送中...' : '发送消息' }}
              </el-button>
              <el-button @click="resetForm" size="medium">
                <i class="el-icon-refresh"></i>
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      
      <!-- 联系信息 -->
      <el-col :lg="10" :md="24">
        <div class="contact-info">
          <!-- 基本信息 -->
          <el-card class="info-card" shadow="hover">
            <div slot="header">
              <h3><i class="el-icon-location-information"></i> 联系信息</h3>
            </div>
            <div class="contact-methods">
              <div class="contact-method">
                <div class="method-icon">
                  <i class="el-icon-message"></i>
                </div>
                <div class="method-info">
                  <h4>邮箱</h4>
                  <p>developer@example.com</p>
                  <el-button type="text" size="small" @click="copyEmail">复制邮箱</el-button>
                </div>
              </div>
              
              <div class="contact-method">
                <div class="method-icon">
                  <i class="el-icon-phone"></i>
                </div>
                <div class="method-info">
                  <h4>电话</h4>
                  <p>+86 138-0000-0000</p>
                  <el-button type="text" size="small" @click="copyPhone">复制电话</el-button>
                </div>
              </div>
              
              <div class="contact-method">
                <div class="method-icon">
                  <i class="el-icon-location-outline"></i>
                </div>
                <div class="method-info">
                  <h4>地址</h4>
                  <p>北京市朝阳区</p>
                </div>
              </div>
              
              <div class="contact-method">
                <div class="method-icon">
                  <i class="el-icon-time"></i>
                </div>
                <div class="method-info">
                  <h4>工作时间</h4>
                  <p>周一至周五 9:00-18:00</p>
                </div>
              </div>
            </div>
          </el-card>
          
          <!-- 社交媒体 -->
          <el-card class="social-card" shadow="hover">
            <div slot="header">
              <h3><i class="el-icon-share"></i> 社交媒体</h3>
            </div>
            <div class="social-links">
              <div class="social-item" @click="openLink('https://github.com')">
                <div class="social-icon github">
                  <i class="el-icon-link"></i>
                </div>
                <div class="social-info">
                  <h4>GitHub</h4>
                  <p>查看我的开源项目</p>
                </div>
              </div>
              
              <div class="social-item" @click="openLink('https://weibo.com')">
                <div class="social-icon weibo">
                  <i class="el-icon-chat-dot-round"></i>
                </div>
                <div class="social-info">
                  <h4>微博</h4>
                  <p>关注技术动态</p>
                </div>
              </div>
              
              <div class="social-item" @click="openLink('https://zhihu.com')">
                <div class="social-icon zhihu">
                  <i class="el-icon-reading"></i>
                </div>
                <div class="social-info">
                  <h4>知乎</h4>
                  <p>技术问答和分享</p>
                </div>
              </div>
              
              <div class="social-item" @click="openLink('https://juejin.cn')">
                <div class="social-icon juejin">
                  <i class="el-icon-document"></i>
                </div>
                <div class="social-info">
                  <h4>掘金</h4>
                  <p>技术文章发布</p>
                </div>
              </div>
            </div>
          </el-card>
          
          <!-- FAQ -->
          <el-card class="faq-card" shadow="hover">
            <div slot="header">
              <h3><i class="el-icon-question"></i> 常见问题</h3>
            </div>
            <el-collapse v-model="activeNames">
              <el-collapse-item title="多久能收到回复？" name="1">
                <div>我通常会在24小时内回复邮件，紧急问题可以通过电话联系。</div>
              </el-collapse-item>
              <el-collapse-item title="接受远程工作吗？" name="2">
                <div>是的，我接受远程工作机会，也可以根据项目需要进行现场工作。</div>
              </el-collapse-item>
              <el-collapse-item title="技术咨询收费吗？" name="3">
                <div>简单的技术问题可以免费解答，复杂的技术咨询或项目开发会根据具体情况收费。</div>
              </el-collapse-item>
              <el-collapse-item title="可以提供技术培训吗？" name="4">
                <div>可以提供前端技术培训，包括Vue.js、React、JavaScript等技术栈的培训服务。</div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入您的姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        phone: [
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        subject: [
          { required: true, message: '请选择联系主题', trigger: 'change' }
        ],
        message: [
          { required: true, message: '请输入您的消息内容', trigger: 'blur' },
          { min: 10, max: 500, message: '长度在 10 到 500 个字符', trigger: 'blur' }
        ]
      },
      submitting: false,
      activeNames: ['1']
    }
  },
  methods: {
    submitForm() {
      this.$refs.contactForm.validate((valid) => {
        if (valid) {
          this.submitting = true
          
          // 模拟提交过程
          setTimeout(() => {
            this.submitting = false
            this.$message.success('消息发送成功！我会尽快回复您。')
            this.resetForm()
          }, 2000)
        } else {
          this.$message.error('请检查表单信息是否填写正确')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.contactForm.resetFields()
    },
    copyEmail() {
      const email = 'developer@example.com'
      navigator.clipboard.writeText(email).then(() => {
        this.$message.success('邮箱地址已复制到剪贴板')
      })
    },
    copyPhone() {
      const phone = '+86 138-0000-0000'
      navigator.clipboard.writeText(phone).then(() => {
        this.$message.success('电话号码已复制到剪贴板')
      })
    },
    openLink(url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style scoped>
.contact {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-form-card {
  margin-bottom: 30px;
}

.contact-form-card h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.contact-form-card h3 i {
  margin-right: 8px;
  color: #409EFF;
}

.contact-form-card p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.info-card,
.social-card,
.faq-card {
  margin-bottom: 30px;
}

.info-card h3,
.social-card h3,
.faq-card h3 {
  margin: 0;
  color: #333;
}

.info-card h3 i,
.social-card h3 i,
.faq-card h3 i {
  margin-right: 8px;
  color: #409EFF;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-method {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.method-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f0f9ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.method-icon i {
  font-size: 20px;
  color: #409EFF;
}

.method-info h4 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 16px;
}

.method-info p {
  margin: 0 0 8px 0;
  color: #666;
  font-size: 14px;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.social-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.social-item:hover {
  background: #f8f9fa;
  transform: translateX(5px);
}

.social-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.social-icon.github {
  background: #24292e;
  color: #fff;
}

.social-icon.weibo {
  background: #e6162d;
  color: #fff;
}

.social-icon.zhihu {
  background: #0084ff;
  color: #fff;
}

.social-icon.juejin {
  background: #1e80ff;
  color: #fff;
}

.social-icon i {
  font-size: 18px;
}

.social-info h4 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 16px;
}

.social-info p {
  margin: 0;
  color: #666;
  font-size: 13px;
}

.faq-card .el-collapse {
  border: none;
}

.faq-card .el-collapse-item {
  margin-bottom: 10px;
}

.faq-card .el-collapse-item__header {
  background: #f8f9fa;
  border: none;
  border-radius: 6px;
  padding: 0 15px;
  color: #333;
  font-weight: 500;
}

.faq-card .el-collapse-item__wrap {
  border: none;
  background: #fff;
}

.faq-card .el-collapse-item__content {
  padding: 15px;
  color: #666;
  line-height: 1.6;
  background: #f8f9fa;
  border-radius: 0 0 6px 6px;
  margin-top: 2px;
}

@media (max-width: 768px) {
  .contact-methods {
    gap: 15px;
  }
  
  .contact-method {
    gap: 12px;
  }
  
  .method-icon {
    width: 40px;
    height: 40px;
  }
  
  .method-icon i {
    font-size: 16px;
  }
  
  .social-item {
    padding: 12px;
  }
  
  .social-icon {
    width: 35px;
    height: 35px;
  }
  
  .social-icon i {
    font-size: 16px;
  }
}
</style>