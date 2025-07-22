# 个人博客系统

基于 Vue2 + ElementUI 开发的现代化个人博客系统，具有响应式设计和完整的博客功能。

## 🚀 特性

- 🎨 **现代化设计**: 基于 ElementUI 的美观界面
- 📱 **响应式布局**: 完美适配桌面端和移动端
- 🎯 **左侧菜单栏**: 清晰的导航结构
- 📝 **博客管理**: 文章列表、详情、分类、搜索
- 💬 **评论系统**: 支持文章评论和互动
- 🏷️ **标签分类**: 文章标签和分类管理
- 📊 **个人展示**: 完整的个人信息和技能展示
- 📧 **联系表单**: 访客联系和反馈功能

## 🛠️ 技术栈

- **前端框架**: Vue 2.6.14
- **UI 组件库**: Element UI 2.15.13
- **路由管理**: Vue Router 3.5.4
- **HTTP 客户端**: Axios 1.6.2
- **构建工具**: Webpack 5.89.0
- **开发服务器**: Webpack Dev Server 4.15.1
- **代码转换**: Babel 7.23.3

## 📦 安装和使用

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

开发服务器将在 `http://localhost:8080` 启动

### 生产环境构建

```bash
npm run build
```

构建文件将生成在 `dist` 目录

## 📁 项目结构

```
├── public/                 # 静态资源目录
│   └── index.html         # HTML 模板
├── src/                   # 源代码目录
│   ├── components/        # 公共组件
│   ├── views/            # 页面组件
│   │   ├── Home.vue      # 首页
│   │   ├── BlogList.vue  # 博客列表
│   │   ├── BlogDetail.vue # 博客详情
│   │   ├── About.vue     # 关于我
│   │   └── Contact.vue   # 联系我
│   ├── router/           # 路由配置
│   │   └── index.js      # 路由定义
│   ├── styles/           # 样式文件
│   │   └── global.css    # 全局样式
│   ├── assets/           # 静态资源
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── webpack.config.js      # Webpack 配置
├── babel.config.js        # Babel 配置
├── package.json          # 项目配置
└── README.md             # 项目说明
```

## 🎯 页面功能

### 首页 (Home)
- 个人介绍和统计数据
- 最新博客文章展示
- 技术栈标签云
- 快速导航按钮

### 博客列表 (BlogList)
- 文章列表展示
- 搜索和分类筛选
- 分页功能
- 文章预览卡片

### 博客详情 (BlogDetail)
- 完整文章内容
- 文章标签和分享
- 相关文章推荐
- 评论系统
- 作者信息侧边栏

### 关于我 (About)
- 个人信息展示
- 技能水平图表
- 工作经历时间线
- 项目作品展示
- 个人理念介绍

### 联系我 (Contact)
- 联系表单
- 联系方式信息
- 社交媒体链接
- 常见问题解答

## 🎨 设计特色

- **左侧固定菜单**: 清晰的导航结构，支持移动端响应式
- **现代化卡片设计**: 使用 ElementUI 卡片组件，美观大方
- **悬停动效**: 丰富的交互动画效果
- **响应式布局**: 完美适配各种屏幕尺寸
- **一致的色彩方案**: 统一的视觉风格

## 🔧 自定义配置

### 修改个人信息

在对应的 Vue 组件中修改 `data` 中的个人信息：

- `src/views/Home.vue` - 首页统计和介绍
- `src/views/About.vue` - 详细个人信息
- `src/views/Contact.vue` - 联系方式

### 添加博客文章

在 `src/views/BlogList.vue` 的 `blogs` 数组中添加新文章数据。

### 自定义样式

修改 `src/styles/global.css` 中的全局样式，或在各个组件的 `<style>` 标签中添加自定义样式。

## 📱 响应式设计

项目采用响应式设计，支持以下断点：

- 桌面端: >= 1024px
- 平板端: 768px - 1023px  
- 移动端: < 768px

## 🌟 未来计划

- [ ] 后端 API 集成
- [ ] 用户认证系统
- [ ] 文章编辑器
- [ ] 图片上传功能
- [ ] SEO 优化
- [ ] 国际化支持

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 📞 联系作者

如有问题或建议，请通过以下方式联系：

- 邮箱: developer@example.com
- GitHub: [项目地址](https://github.com/xiaoman655/xiaoman.io)

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！
