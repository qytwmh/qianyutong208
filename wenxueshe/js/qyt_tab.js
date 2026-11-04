/*
  文学社社 - 图书频道 标签页切换脚本
  作者：钱昱同（24002120208）
  功能：点击"流行小说 / 社科历史 / 文学艺术"标签，切换对应的图书面板
  规范：所有 JS 变量与函数名均以姓名首字母 qyt_ 开头
*/

// 等页面结构加载完成后再执行
window.onload = function () {

    // 获取标签导航
    var qyt_tab_nav = document.getElementById("qyt_tab_nav");

    // 获取全部标签项（伪数组）
    var qyt_tab_items = qyt_tab_nav.getElementsByClassName("qyt_tab_item");

    // 获取全部图书面板
    var qyt_panes = document.getElementsByClassName("qyt_pane");

    // 标签切换函数：qyt_index 为当前点击标签的下标
    function qyt_switch_tab(qyt_index) {
        // 先把所有标签和面板恢复默认状态
        for (var qyt_i = 0; qyt_i < qyt_tab_items.length; qyt_i++) {
            qyt_tab_items[qyt_i].className = "qyt_tab_item";
            qyt_panes[qyt_i].className = "qyt_pane";
        }
        // 再给当前点击的标签和对应面板加上选中样式
        qyt_tab_items[qyt_index].className = "qyt_tab_item qyt_tab_on";
        qyt_panes[qyt_index].className = "qyt_pane qyt_pane_on";
    }

    // 给每个标签绑定点击事件
    for (var qyt_j = 0; qyt_j < qyt_tab_items.length; qyt_j++) {
        // 用立即执行函数把当前下标固定下来（闭包）
        (function (qyt_k) {
            qyt_tab_items[qyt_k].onclick = function () {
                qyt_switch_tab(qyt_k);
            };
        })(qyt_j);
    }
};
