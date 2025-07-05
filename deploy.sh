#!/bin/bash

echo "🚀 开始部署到 Vercel..."

# 确保在正确的目录
cd "$(dirname "$0")"

# 构建项目
echo "📦 构建项目..."
npm run build

# 检查构建是否成功
if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
else
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

# 部署到 Vercel
echo "🌐 部署到 Vercel..."
npx vercel --prod

echo "🎉 部署完成！"
echo "💡 提示："
echo "   - 如果是第一次部署，需要登录 Vercel 账号"
echo "   - 部署完成后会得到一个公开的 URL"
echo "   - 后续更新只需要运行: npx vercel --prod" 