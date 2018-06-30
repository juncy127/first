<template>
  <div class="iridium-demo-dropdown">
    <h3 class="sub-title">系统下拉菜单</h3>
    <select class="iridium-select">
      <option class="iridium-select-option" value="1">选项</option>
      <option class="iridium-select-option" value="2">选项</option>
      <option class="iridium-select-option" value="3">选项</option>
    </select>
    <pre>&lt;select class="iridium-select"&gt;
&lt;option class="iridium-select-option" value="1"&gt;选项&lt;/option&gt;
&lt;option class="iridium-select-option" value="2"&gt;选项&lt;/option&gt;
&lt;option class="iridium-select-option" value="3"&gt;选项&lt;/option&gt;
&lt;/select&gt;</pre>
    <h3 class="sub-title">模拟下拉菜单</h3>
    <div class="iridium-select">选项</div>
    <ul class="iridium-dropdown">
      <li class="iridium-dropdown-option">选项</li>
      <li class="iridium-dropdown-option">选项</li>
      <li class="iridium-dropdown-option">选项</li>
    </ul>
    <pre>&lt;div class="iridium-select"&gt;选项&lt;/div&gt;
&lt;option class="iridium-select-option" value="1"&gt;选项&lt;/option&gt;
&lt;option class="iridium-select-option" value="2"&gt;选项&lt;/option&gt;
&lt;option class="iridium-select-option" value="3"&gt;选项&lt;/option&gt;
&lt;/select&gt;</pre>
    <h3 class="sub-title">禁用下拉菜单</h3>
    <div class="iridium-select disabled"></div>
    <pre>&lt;div class="iridium-select disabled"&gt;&lt;/div&gt;</pre>
  </div>
</template>

<script>
export default {
  name: 'DemoDropdown'
}
</script>
