<template>
  <div id="guide" @click.prevent.stop="handleGuide">
    <el-icon :size="40" color="#5b5c64">
      <promotion />
    </el-icon>
  </div>
</template>

<script setup>
import { Promotion } from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { steps } from './steps'
import i18n from '../../i18n/index'

const t = i18n.global.t

let driver
onMounted(() => {
  driver = new Driver({
    animate: true, // Whether to animate or not
    opacity: 0.75, // Background opacity (0 means only popovers and without overlay)
    padding: 10, // Distance of element from around the edges
    allowClose: true, // Whether the click on overlay should close or not
    overlayClickNext: false, // Whether the click on overlay should move next
    doneBtnText: t('driver.doneBtnText'), // Text on the final button
    closeBtnText: t('driver.closeBtnText'), // Text on the close button for this step
    stageBackground: '#ffffff', // Background color for the staged behind highlighted element
    nextBtnText: t('driver.nextBtnText'), // Next button text for this step
    prevBtnText: t('driver.prevBtnText') // Previous button text for this step
  })
})

const handleGuide = () => {
  driver.defineSteps(steps)
  driver.start()
}
</script>

<style>
#guide {
  margin-right: 20px;
  cursor: pointer;
}
</style>
