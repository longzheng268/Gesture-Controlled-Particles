# Cloudflare Workers Deployment Guide | Cloudflare Workers 部署指南

[English](#english-deployment-guide) | [中文](#中文部署指南)

---

## English Deployment Guide

### Prerequisites

1. A Cloudflare account (free tier works perfectly!)
   - Sign up at: https://dash.cloudflare.com/sign-up

2. Node.js installed (v16 or later)
   - Download from: https://nodejs.org/

### Step-by-Step Deployment

#### 1. Install Wrangler

Wrangler is Cloudflare's CLI tool for Workers:

```bash
npm install -g wrangler
```

#### 2. Login to Cloudflare

```bash
wrangler login
```

This will open your browser for authentication.

#### 3. Configure Your Project

Edit `wrangler.toml` if you want to customize:

```toml
name = "gesture-particles"  # Change this to your preferred name
main = "src/worker.js"
compatibility_date = "2024-01-01"
```

#### 4. Deploy!

From the project root directory:

```bash
npm run deploy
```

Or directly:

```bash
wrangler deploy
```

#### 5. Access Your App

After deployment, Wrangler will show you the URL:

```
Published gesture-particles
  https://gesture-particles.your-subdomain.workers.dev
```

Visit that URL and enjoy! 🎉

### Local Development

To test locally before deploying:

```bash
npm run dev
```

Visit `http://localhost:8787` in your browser.

### Custom Domain (Optional)

You can add a custom domain in the Cloudflare dashboard:

1. Go to Workers & Pages
2. Select your worker
3. Click "Triggers" tab
4. Add a custom domain

### Updating Your Deployment

To update after making changes:

```bash
npm run deploy
```

That's it! Your changes are live globally in seconds.

---

## 中文部署指南

### 前置要求

1. Cloudflare 账号（免费套餐完全够用！）
   - 注册地址: https://dash.cloudflare.com/sign-up

2. 已安装 Node.js（v16 或更高版本）
   - 下载地址: https://nodejs.org/

### 分步部署流程

#### 1. 安装 Wrangler

Wrangler 是 Cloudflare 的 Workers 命令行工具：

```bash
npm install -g wrangler
```

#### 2. 登录 Cloudflare

```bash
wrangler login
```

这将打开浏览器进行身份验证。

#### 3. 配置项目

如需自定义，可编辑 `wrangler.toml`：

```toml
name = "gesture-particles"  # 改成您喜欢的名称
main = "src/worker.js"
compatibility_date = "2024-01-01"
```

#### 4. 部署！

在项目根目录执行：

```bash
npm run deploy
```

或直接执行：

```bash
wrangler deploy
```

#### 5. 访问您的应用

部署完成后，Wrangler 会显示访问地址：

```
Published gesture-particles
  https://gesture-particles.your-subdomain.workers.dev
```

访问该地址即可使用！🎉

### 本地开发

部署前可先在本地测试：

```bash
npm run dev
```

在浏览器中访问 `http://localhost:8787`。

### 自定义域名（可选）

您可以在 Cloudflare 控制台添加自定义域名：

1. 进入 Workers & Pages
2. 选择您的 worker
3. 点击 "Triggers" 标签
4. 添加自定义域名

### 更新部署

修改代码后更新部署：

```bash
npm run deploy
```

就是这么简单！您的更改会在几秒内全球生效。

---

## Troubleshooting | 故障排除

### Issue: Command not found: wrangler
**Solution**: Make sure you installed wrangler globally:
```bash
npm install -g wrangler
```

### Issue: Authentication failed
**Solution**: Try logging out and in again:
```bash
wrangler logout
wrangler login
```

### 问题: 命令未找到: wrangler
**解决方案**: 确保全局安装了 wrangler：
```bash
npm install -g wrangler
```

### 问题: 认证失败
**解决方案**: 尝试登出后重新登录：
```bash
wrangler logout
wrangler login
```

---

## Support | 支持

For issues or questions, please open an issue on GitHub.

如有问题或疑问，请在 GitHub 上提交 issue。
