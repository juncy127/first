<template>
  <div class="iridium-demo">
    <header class="iridium-demo-header">
      <h1>保洁定位系统基础组件示例</h1>
    </header>
    <article class="iridium-demo-content">
      <nav class="iridium-demo-nav">
        <ul>
          <li><a href="#title">标题</a></li>
          <li><a href="#button">按钮</a></li>
          <li><a href="#table">表格</a></li>
          <li><a href="#form">表单</a></li>
          <li><a href="#dropdown">下拉菜单</a></li>
          <li><a href="#badge">徽章</a></li>
        </ul>
      </nav>
      <a id="title" class="anchor"></a>
      <div class="iridium-demo-block">
        <h2 class="iridium-demo-title">标题</h2>
        <demo-headings/>
      </div>
      <a id="button" class="anchor"></a>
      <div class="iridium-demo-block">
        <h2 class="iridium-demo-title">按钮</h2>
        <demo-buttons/>
      </div>
      <a id="table" class="anchor"></a>
      <div class="iridium-demo-block">
        <h2 class="iridium-demo-title">表格</h2>
        <demo-tables/>
      </div>
      <a id="form" class="anchor"></a>
      <div class="iridium-demo-block">
        <h2 class="iridium-demo-title">表单</h2>
        <demo-forms/>
      </div>
      <a id="dropdown" class="anchor"></a>
      <div class="iridium-demo-block">
        <h2 class="iridium-demo-title">拉下菜单</h2>
        <demo-dropdown/>
      </div>
      <a id="badge" class="anchor"></a>
      <div class="iridium-demo-block">
        <h2 class="iridium-demo-title">徽章</h2>
        <demo-badges/>
      </div>
    </article>
  </div>
</template>

<script>
import DemoHeadings from './DemoHeadings'
import DemoButtons from './DemoButtons'
import DemoBadges from './DemoBadges'
import DemoForms from './DemoForms'
import DemoDropdown from './DemoDropdown'
import DemoTables from './DemoTables'
export default {
  name: 'DemoList',
  components: {
    DemoHeadings,
    DemoButtons,
    DemoBadges,
    DemoForms,
    DemoDropdown,
    DemoTables
  }
}
</script>
<style>
body {
  color: #273A4A;
}
.iridium-header,
.iridium-navigator {
  display: none;
}
.iridium-main {
  height: auto;
  overflow-y: scroll;
}
.iridium-demo {
}
.iridium-demo-header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background: #fff;
  /* color: #18a689; */
  padding-left: 20px;
  border-bottom: 1px solid #eee;
  & h1 {
    text-align: center;
    line-height: 60px;
  }
}
.iridium-demo-content {
  margin-top: 60px;
}
.iridium-demo-title {
  margin: 0 -15px 10px;
  padding: 3px 10px;
  border-left: 5px solid #273A4A;
  border-bottom: 1px solid #ddd;
}
.iridium-demo-nav {
  position: fixed;
  top: 80px;
  left: 180px;
  text-align: left;
  & a {
    color: #4f9fcf;
    line-height: 1.75;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  & ul,
  & li {
    list-style: square;
  }
}
.iridium-demo-block {
  width: 800px;
  margin: 0 auto 20px;
  font-size: 14px;
  text-align: left;
  background: #fff;
  box-shadow: 0 0 5px #ddd;
  padding: 0 15px 15px;
}
.sub-title {
  margin-bottom: 10px;
}
.anchor {
  display: inline-block;
}
p {
  text-align: left;
}
pre {
  font: 14px/2 Arial;
  color: #4f9fcf;
  background: #F7F7F9;
  border-radius: 5px;
  padding: 8px 10px;
  text-align: left;
}
</style>
