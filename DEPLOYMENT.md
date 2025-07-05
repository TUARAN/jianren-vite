# 🚀 Vercel 部署指南

## 快速部署

### 方法一：使用部署脚本（推荐）
```bash
./deploy.sh
```

### 方法二：手动部署
```bash
# 1. 构建项目
npm run build

# 2. 部署到 Vercel
npx vercel --prod
```

## 首次部署步骤

1. **登录 Vercel 账号**
   - 运行 `npx vercel` 时会自动打开浏览器
   - 如果没有账号，需要先注册：https://vercel.com

2. **项目设置**
   - 项目名称：可以自定义或使用默认名称
   - 框架：选择 Vite
   - 构建命令：`npm run build`
   - 输出目录：`dist`

3. **完成部署**
   - 部署完成后会得到一个公开的 URL
   - 例如：`https://your-project.vercel.app`

## 更新部署

每次修改代码后，只需要运行：
```bash
npx vercel --prod
```

## 自动部署

如果你将代码推送到 GitHub，Vercel 会自动检测并部署更新。

## 项目配置

- `vercel.json` - Vercel 配置文件
- `package.json` - 项目依赖和脚本
- `vite.config.ts` - Vite 构建配置

## 常见问题

**Q: 部署失败怎么办？**
A: 检查构建日志，确保所有依赖都正确安装

**Q: 如何自定义域名？**
A: 在 Vercel 控制台的项目设置中添加自定义域名

**Q: 如何回滚到之前的版本？**
A: 在 Vercel 控制台的 Deployments 页面可以查看和回滚历史版本 