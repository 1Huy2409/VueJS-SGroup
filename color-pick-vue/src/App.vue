<script setup>
import { ref } from 'vue';
let activeColor = ref('');
let activeHeight = ref('');
let activeWidth = ref('');
let activeDisplay = ref('none');
const validCheck = () => {
  if (activeColor.value == '' || activeHeight.value == '' || activeWidth.value == '') {
    activeDisplay.value = 'none';
    return false;
  }
  return true;
}
function handleInput() 
{
  if (activeColor.value == '' || activeHeight.value == '' || activeWidth.value == '') {
    activeDisplay.value = 'none';
  }
}
const handleSubmit = () =>
{
  if (validCheck()) {
    console.log("Da click");
    activeDisplay.value = 'block';
  }
  else
  {
    alert("Vui lòng nhập đầy đủ thông số!");
  }
}
function handleClickBox()
{
  activeColor.value = ''
  activeHeight.value = ''
  activeWidth.value = ''
  activeDisplay.value = 'none';
}
</script>

<template>
<div class="container">
    <div class="inner-container">
        <div class="input_attribute">
            <div><input type="text" placeholder="Vui lòng nhập mã màu" class="color-code" v-model="activeColor" @input="handleInput"></div>
            <div><input type="text" placeholder="Vui lòng nhập chiều ngang (w)" class="width-code" v-model="activeWidth" @input="handleInput"></div>
            <div><input type="text" placeholder="Vui lòng nhập chiều dọc (h)" class="height-code" v-model="activeHeight" @input="handleInput"></div>
        </div>
        <div class="submit-button" @click="handleSubmit">
            <span>Submit</span>
        </div>
    </div>
    <div class="outer-container">
        <div class="box" :style="{backgroundColor: activeColor, height: activeHeight, width: activeWidth, display: activeDisplay}" @click="handleClickBox">
            
        </div>
    </div>
</div>
</template>

<style>
body{
    margin: 0;
    padding: 0;
}
.container
{
    width: 1000px;
    margin-inline: auto;
    height: 100vh;
    margin-top: 200px;
}
.inner-container 
{
    display: flex;
    width: 500px;
    gap: 50px;
}
.inner-container input
{
    width: 300px;
    margin-bottom: 20px;
    height: 30px;
    border: 1px solid #000;
    border-radius: 10px;
}
.inner-container .submit-button
{
    padding: 20px 30px;
    border: 1px solid #000;
    border-radius: 10px;
    cursor: pointer;
}
</style>
