/**
 * 作者：钱昱同
 * 功能：文学社科图书网站 Tab 选项卡切换逻辑（可复用）
 * 规则：所有变量/函数名以 qyt_ 开头（钱昱同姓名首字母）
 */

/**
 * 作者：钱昱同 — 初始化指定容器内的 Tab 选项卡
 * qyt_containerSelector: 容器选择器字符串，例如 '.qyt_center'
 */
function qyt_initTabs(qyt_containerSelector) {
  var qyt_container = document.querySelector(qyt_containerSelector);
  if (!qyt_container) return;

  // 作者：钱昱同 — 获取容器内所有 Tab 按钮和面板
  var qyt_btns = qyt_container.querySelectorAll('.qyt_tab_btn');
  var qyt_panels = qyt_container.querySelectorAll('.qyt_panel');

  if (qyt_btns.length === 0) return;

  /**
   * 作者：钱昱同 — 切换到指定选项卡
   * 流程：先清除所有选中 → 再设置当前选中
   * qyt_targetId: 目标面板的 id
   */
  function qyt_switchTo(qyt_targetId) {
    // 1. 先清除所有选项卡按钮和面板的 active 选中状态
    var qyt_i;
    for (qyt_i = 0; qyt_i < qyt_btns.length; qyt_i++) {
      qyt_btns[qyt_i].classList.remove('qyt_active');
    }
    for (qyt_i = 0; qyt_i < qyt_panels.length; qyt_i++) {
      qyt_panels[qyt_i].classList.remove('qyt_active');
    }

    // 2. 再根据 data-target 找到当前按钮并设置 active
    var qyt_currentBtn = qyt_container.querySelector(
      '.qyt_tab_btn[data-target="' + qyt_targetId + '"]'
    );
    if (qyt_currentBtn) {
      qyt_currentBtn.classList.add('qyt_active');
    }

    // 3. 根据 id 找到当前面板并设置 active
    var qyt_currentPanel = document.getElementById(qyt_targetId);
    if (qyt_currentPanel) {
      qyt_currentPanel.classList.add('qyt_active');
    }
  }

  // 作者：钱昱同 — 为每个按钮绑定点击监听事件
  var qyt_j;
  for (qyt_j = 0; qyt_j < qyt_btns.length; qyt_j++) {
    qyt_btns[qyt_j].addEventListener('click', function () {
      var qyt_targetId = this.getAttribute('data-target');
      qyt_switchTo(qyt_targetId);
    });
  }

  // 作者：钱昱同 — 页面加载后检查：如果没有任何按钮带 active，默认激活第一个
  var qyt_hasActive = qyt_container.querySelector('.qyt_tab_btn.qyt_active');
  if (!qyt_hasActive && qyt_btns[0]) {
    qyt_switchTo(qyt_btns[0].getAttribute('data-target'));
  }
}
