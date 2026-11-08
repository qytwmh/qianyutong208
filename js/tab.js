/**
 * Tab 选项卡组件 · 可复用版
 *
 * 使用方式：
 *   HTML 结构要求：
 *     <div class="tab-container">
 *       <div class="tab-buttons">
 *         <button class="tab-btn active" data-target="panel-1">选项卡1</button>
 *         <button class="tab-btn"        data-target="panel-2">选项卡2</button>
 *       </div>
 *       <div class="tab-panels">
 *         <div class="tab-panel active" id="panel-1">内容1</div>
 *         <div class="tab-panel"        id="panel-2">内容2</div>
 *       </div>
 *     </div>
 *
 *   初始化：
 *     initTabs('.tab-container');
 *
 * 激活机制：
 *   - 默认激活首个带 .active 类的按钮和面板
 *   - 点击按钮后：先清除所有 .tab-btn / .tab-panel 的 active，再为当前按钮和对应面板加 active
 */

/**
 * 初始化指定容器内的所有 Tab 选项卡
 * containerSelector: 容器选择器，例如 '.news-tabs'
 * options: 可选配置
 *   - btnClass:   按钮类名，默认 'tab-btn'
 *   - panelClass: 面板类名，默认 'tab-panel'
 *   - activeClass: 激活类名，默认 'active'
 */
function initTabs(containerSelector, options) {
  // 合并默认配置
  const opts = Object.assign(
    { btnClass: 'tab-btn', panelClass: 'tab-panel', activeClass: 'active' },
    options || {}
  );

  // 支持单个 DOM 元素或选择器
  const container =
    typeof containerSelector === 'string'
      ? document.querySelector(containerSelector)
      : containerSelector;

  if (!container) return;

  const btns = container.querySelectorAll('.' + opts.btnClass);
  const panels = container.querySelectorAll('.' + opts.panelClass);

  if (btns.length === 0) return;

  /**
   * 切换到指定选项卡
   * 流程：先清除所有选中 → 再设置当前选中
   * targetId: 目标面板的 id
   */
  function switchTo(targetId) {
    // 1. 先清除所有选项卡按钮和面板的选中状态
    btns.forEach((btn) => btn.classList.remove(opts.activeClass));
    panels.forEach((panel) => panel.classList.remove(opts.activeClass));

    // 2. 根据 data-target 找到当前按钮并加 active
    const currentBtn = container.querySelector(
      '.' + opts.btnClass + '[data-target="' + targetId + '"]'
    );
    if (currentBtn) currentBtn.classList.add(opts.activeClass);

    // 3. 根据 id 找到当前面板并加 active
    const currentPanel = container.querySelector('#' + targetId);
    if (currentPanel) currentPanel.classList.add(opts.activeClass);
  }

  // 为每个按钮绑定点击监听事件
  btns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      switchTo(targetId);
    });
  });

  // 初始化：如果没有任何按钮带 active，默认激活第一个
  const hasActive = container.querySelector(
    '.' + opts.btnClass + '.' + opts.activeClass
  );
  if (!hasActive && btns[0]) {
    switchTo(btns[0].getAttribute('data-target'));
  }
}
