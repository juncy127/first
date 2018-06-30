<template>
  <div class="iridium-demo-forms">
    <h3>默认表单</h3>
    <form class="iridium-form">
      <div class="iridium-form-item">
        <input class="iridium-form-input" />
      </div>
      <div class="iridium-form-item">
        <input class="iridium-form-input" disabled="disabled" />
      </div>
      <div class="iridium-form-item">
        <label for="input" class="iridium-form-label">label：</label>
        <input id="input" class="iridium-form-input" />
      </div>
      <div class="iridium-form-item">
        <textarea class="iridium-form-textarea">多行文本框</textarea>
      </div>
    </form>
    <pre>&lt;form class="iridium-form"&gt;
  &lt;div class="iridium-form-item"&gt;
    &lt;input class="iridium-form-input" /&gt;
  &lt;/div&gt;
  &lt;div class="iridium-form-item"&gt;
    &lt;input class="iridium-form-input" disabled="disabled" /&gt;
  &lt;/div&gt;
  &lt;div class="iridium-form-item"&gt;
    &lt;label for="input" class="iridium-form-label"&gt;label：&lt;/label&gt;
    &lt;input id="input" class="iridium-form-input" /&gt;
  &lt;/div&gt;
  &lt;div class="iridium-form-item"&gt;
    &lt;textarea class="iridium-form-textarea"&gt;多行文本框&lt;/textarea&gt;
  &lt;/div&gt;
&lt;/form&gt;</pre>
    <h3>垂直表单</h3>
    <form class="iridium-form iridium-form--vertical">
      <div class="iridium-form-item">
        <label class="iridium-form-label">label：</label>
        <input class="iridium-form-input" />
      </div>
      <div class="iridium-form-item">
        <label class="iridium-form-label">label：</label>
        <textarea class="iridium-form-textarea" />
      </div>
    </form>
    <pre>&lt;form class="iridium-form iridium-form--vertical"&gt;
  &lt;div class="iridium-form-item"&gt;
    &lt;label class="iridium-form-label"&gt;label：&lt;/label&gt;
    &lt;input class="iridium-form-input" /&gt;
  &lt;/div&gt;
  &lt;div class="iridium-form-item"&gt;
    &lt;label class="iridium-form-label"&gt;label：&lt;/label&gt;
    &lt;textarea class="iridium-form-textarea"&gt;&lt;/textarea&gt;
  &lt;/div&gt;
&lt;/form&gt;</pre>
    <h3>水平表单</h3>
    <form class="iridium-form iridium-form--horizontal">
      <div class="iridium-form-item">
        <label class="iridium-form-label">label：</label>
        <input class="iridium-form-input" disabled="disabled" />
      </div>
      <div class="iridium-form-item">
        <label class="iridium-form-label">
          label：
        </label>
        <textarea class="iridium-form-textarea" />
      </div>
    </form>
    <pre>&lt;form class="iridium-form iridium-form--horizontal"&gt;
  &lt;div class="iridium-form-item"&gt;
    &lt;label class="iridium-form-label"&gt;label：&lt;/label&gt;
    &lt;input class="iridium-form-input" disabled="disabled" /&gt;
  &lt;/div&gt;
  &lt;div class="iridium-form-item"&gt;
    &lt;label class="iridium-form-label"&gt;label：&lt;/label&gt;
    &lt;textarea class="iridium-form-textarea"&gt;&lt;/textarea&gt;
  &lt;/div&gt;
&lt;/form&gt;</pre>
  </div>
</template>

<script>
export default {
  name: 'DemoForms'
}
</script>

<style scoped>
.iridium-form-textarea {
  height: 60px;
}
</style>
