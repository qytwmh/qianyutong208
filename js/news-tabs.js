/**
 * 新闻 Tab 选项卡组件
 * 在页面中外部引入后，调用 wy_initTabs(选择器) 即可复用
 */

// 初始化新闻 Tab 选项卡：找到按钮与面板，绑定点击与键盘事件
// rootSelector: 选项卡容器的 CSS 选择器，同一页面可传入不同容器实现复用
function wy_initTabs(rootSelector) {
  var wy_root = document.querySelector(rootSelector);
  if (!wy_root) return;

  var wy_buttons = wy_root.querySelectorAll('[role="tab"]');
  var wy_panels = wy_root.querySelectorAll('[role="tabpanel"]');

  // 切换选项卡：先清除所有选项卡的选中状态，再设置当前按钮与面板的选中状态
  // activeButton: 需要激活的选项卡按钮
  function wy_activate(activeButton) {
    var wy_targetId = activeButton.getAttribute("aria-controls");

    // 第一步：清除所有按钮与面板的选中状态
    wy_buttons.forEach(function (wy_button) {
      wy_button.classList.remove("wy_isActive");
      wy_button.setAttribute("aria-selected", "false");
      wy_button.setAttribute("tabindex", "-1");
    });
    wy_panels.forEach(function (wy_panel) {
      wy_panel.classList.remove("wy_isActive");
      wy_panel.hidden = true;
    });

    // 第二步：设置当前按钮与对应面板为选中状态
    activeButton.classList.add("wy_isActive");
    activeButton.setAttribute("aria-selected", "true");
    activeButton.setAttribute("tabindex", "0");

    var wy_panel = wy_root.querySelector("#" + wy_targetId);
    if (wy_panel) {
      wy_panel.classList.add("wy_isActive");
      wy_panel.hidden = false;
    }
  }

  // 监听每个选项卡的点击事件，点击后切换到对应面板
  wy_buttons.forEach(function (wy_button) {
    wy_button.addEventListener("click", function () {
      wy_activate(wy_button);
    });

    // 监听选项卡的键盘事件，支持左右方向键与 Home / End 切换
    wy_button.addEventListener("keydown", function (wy_event) {
      var wy_index = Array.prototype.indexOf.call(wy_buttons, wy_button);
      var wy_next = null;

      if (wy_event.key === "ArrowRight") {
        wy_next = wy_buttons[(wy_index + 1) % wy_buttons.length];
      } else if (wy_event.key === "ArrowLeft") {
        wy_next = wy_buttons[(wy_index - 1 + wy_buttons.length) % wy_buttons.length];
      } else if (wy_event.key === "Home") {
        wy_next = wy_buttons[0];
      } else if (wy_event.key === "End") {
        wy_next = wy_buttons[wy_buttons.length - 1];
      }

      if (wy_next) {
        wy_event.preventDefault();
        wy_next.focus();
        wy_activate(wy_next);
      }
    });
  });
}
