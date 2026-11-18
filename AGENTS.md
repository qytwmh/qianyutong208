# 项目规则 · AGENTS.md

适用于本项目下所有新建和修改的 HTML / JavaScript 文件。

## 一、新建 HTML 文件头部注释

每个新建的 `.html` 文件，在 `<html>` 标签上方必须包含如下格式的注释块：

```html
<!--
  作者：王垚
  建立时间：YYYY-MM-DD HH:mm
  使用大模型：模型名称
  功能名称：一句话描述该页面实现的功能
-->
<!DOCTYPE html>
<html lang="zh-CN">
  ...
</html>
```

**字段说明**

| 字段 | 填写要求 |
|------|----------|
| 作者 | 固定填 `王垚` |
| 建立时间 | 文件首次创建的时间，格式 `YYYY-MM-DD HH:mm` |
| 使用大模型 | 填写本次使用的模型名称，例如 `DeepSeek-V4.1-Flash` |
| 功能名称 | 简要描述页面用途，例如"学生成绩查询页面"、"CSS Flex 布局练习" |

**示例**

```html
<!--
  作者：王垚
  建立时间：2026-11-18 15:51
  使用大模型：DeepSeek-V4.1-Flash
  功能名称：新闻分类 Tab 选项卡页面，包含国内、省内、国际、最热四个分类
-->
<!DOCTYPE html>
<html lang="zh-CN">
```

## 二、JavaScript 函数注释

每个自定义的 JS 函数（包括 HTML 文件内 `<script>` 标签中的函数和独立 `.js` 文件中的函数），在函数定义上方必须添加注释，说明该函数主要实现的功能。

### 2.1 纯功能描述（必选）

```javascript
// 计算两个数的平均值，返回结果保留两位小数
function average(a, b) {
  return Math.round((a + b) / 2 * 100) / 100;
}
```

### 2.2 含参数说明（推荐，函数有参数时）

```javascript
// 根据用户 ID 查询用户信息
// id: 用户唯一标识
// callback: 查询完成后的回调函数
function getUserById(id, callback) {
  fetch(`/api/users/${id}`)
    .then(res => res.json())
    .then(data => callback(data));
}
```

### 2.3 箭头函数/匿名函数（同样适用）

```javascript
// 监听表单提交事件，阻止默认行为并校验输入
form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateForm();
});
```

### 2.4 类方法

```javascript
class ShoppingCart {
  // 向购物车添加商品，数量自动累加
  addItem(product, quantity = 1) { ... }

  // 根据商品 ID 从购物车移除商品
  removeItem(productId) { ... }

  // 计算购物车所有商品的总价
  getTotalPrice() { ... }
}
```

## 三、注释原则

1. **只写一次**：同一函数/文件的注释不要在别处重复粘贴。
2. **改代码时更新注释**：函数逻辑发生变化，注释也要同步修改，保持描述与实现一致。
3. **不解释显而易见的代码**：例如 `const x = 1;` 这种无需注释。
4. **注释用中文**：所有注释统一使用中文。
5. **不写 TODO/FIXME**：注释描述最终意图，不要在提交的代码里留待办标记。

## 四、新增强制规则（2026-11-18 起）

1. **命名前缀**：所有新建或修改的 CSS 类名、`id` 名、JavaScript 变量名统一以 `wy_` 开头，例如 `.wy_card`、`id="wy_stage"`、`const wy_icons = [];`。
2. **提示词记录**：每次执行任务前，先把提示词追加写入项目根目录的 `wy_prompt.md`，不覆盖已有内容；每条记录包含时间（`YYYY-MM-DD HH:mm`）、使用的模型、提示词原文。
3. **首页入口**：新建的每个 HTML 文件都要在首页 `index.html` 的课堂目录中添加入口链接，并在页面内提供返回 `index.html` 的超链接。
4. **前端设计**：视觉设计参考 `skills/frontend-design/SKILL.md`，避免模板化的默认样式。

## 五、本项目 Git 信息

- 远程仓库：`https://github.com/qytwmh/qianyutong208.git`
- 主分支：`main`
- 推送方式：HTTPS + Git Credential Manager（凭据已保存）
- 仓库级 SSL 跳过已配置（`git config http.sslVerify false`）
