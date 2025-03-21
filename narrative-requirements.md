# Hunters Point 交互式地图：叙事体验需求文档

## 项目概述

创建一个以地图为中心的沉浸式叙事体验，引导用户探索Hunters Point社区。通过序列化的标记点和连接路线，用户可以按照设计路径或自由探索，了解社区的历史、故事和研究发现。

## 核心功能需求

1. 全屏地图界面
2. 叙事路线可视化
3. 序列化标记点系统
4. 弹出式内容面板
5. 结构化内容展示
6. 故事线导航系统
7. 介绍和结论框架
8. 统一的视觉设计
9. 交互反馈系统
10. 可选的引导模式

## 详细技术需求

### 1. 全屏地图界面

- 使用自定义样式的Mapbox地图
- 地图占据整个屏幕，成为主要交互界面
- 地图控件最小化，仅保留必要的导航功能
- 地图样式应突出显示Hunters Point的关键特征
- 地图细节应适中，避免过于复杂分散注意力

### 2. 叙事路线可视化

- 在地图上显示连接所有故事点的路线
- 使用虚线或带有方向指示的线条表示
- 路线颜色应与整体设计协调但足够醒目
- 路线设计应暗示推荐的探索顺序
- 不强制用户按特定顺序访问

### 3. 序列化标记点

- 创建带有序号的自定义标记点
- 每个标记点包含序号(1, 2, 3...)
- 使用与点位类别相关的颜色或图标
- 确保标记点有足够大的点击区域
- 未访问和已访问的标记点有不同的视觉状态
- 包含微妙的视觉提示表明可交互性

### 4. 弹出式内容面板

- 点击标记点时从屏幕一侧滑入或从中心弹出
- 占据足够空间展示内容，但不完全遮挡地图
- 包含清晰的关闭按钮
- 半透明背景，保持地图上下文感知
- 包含导航控件(前进/后退)
- 使用平滑的动画过渡效果

### 5. 内容结构化展示

- 每个点位内容面板有一致的结构
- 包含标题和副标题
- 地点的历史背景
- 研究发现和观察
- 社区成员的引述和故事
- 相关图片、音频或视频内容
- 与其他点位的关联
- 内容分段展示，使用视觉层次结构
- 多媒体内容无缝集成

### 6. 故事线导航系统

- 在内容面板底部或侧边提供导航系统
- 显示整个故事线上的所有点位
- 标明当前位置
- 可以是简化的时间线、一系列小点或迷你地图
- 允许用户直接跳转到任何点位

### 7. 介绍和结论框架

- 创建开场介绍和结束总结
- 开场介绍：解释项目背景、研究方法和使用指南
- 结束总结：提供对社区的整体见解和反思
- 作为特殊"点位"添加到地图或作为特殊内容

### 8. 视觉设计统一

- 一致的视觉语言
- 颜色方案反映Hunters Point特色
- 字体选择平衡可读性和个性
- 简洁且有意义的图标和视觉元素
- 流畅且有目的的过渡和动画

### 9. 交互反馈系统

- 悬停效果：显示点位名称或简短描述
- 点击反馈：有视觉确认
- 加载状态：显示优雅的加载指示器
- 完成标记：已访问点位有明确视觉区分

### 10. 可选的引导模式

- "引导模式"选项，自动按顺序浏览所有点位
- 系统自动平移到每个点位，打开内容面板
- 用户可控制节奏，手动前进到下一个点
- 随时可退出引导模式，回到自由探索

## 实施优先级

1. **MVP阶段**：
   - 全屏地图界面
   - 基本标记点系统
   - 简单内容面板
   - 基础内容展示

2. **第二阶段**：
   - 序列化标记点
   - 叙事路线可视化
   - 改进的内容面板
   - 结构化内容展示

3. **第三阶段**：
   - 故事线导航系统
   - 介绍和结论框架
   - 统一视觉设计
   - 交互反馈系统

4. **最终阶段**：
   - 可选的引导模式
   - 性能优化
   - 用户测试和改进

## 技术考虑

- 使用Mapbox GL JS作为地图库
- 使用现代JavaScript框架(如React)构建UI组件
- 内容存储为结构化JSON数据
- 响应式设计确保在不同设备上的良好体验
- 优化图像和多媒体内容以确保性能
- 考虑离线访问能力

## 内容建议

- 内容应该丰富、引人入胜且有深度
- 从简单概念开始，逐渐引入更复杂的社区动态
- 通过个人故事和引述创造情感连接
- 在内容密集点位和轻松点位之间创造节奏变化
- 鼓励完成引导路线后继续自由探索 