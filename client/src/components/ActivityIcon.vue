<template>
    <div class="icon-container">
        <div class="activity-icon-wrapper" :class="iconBackgroundClass">
            <img :src="iconPath" alt="Icon" class="activity-icon" />
        </div>
        <div v-if="productType === CONSTANTS.JR_PRODUCT_TYPE" class="jr-icon">
            Jr.
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { CONSTANTS } from '../common/constants';

const CAMOUFLAGE = 'camouflage.png'

const props = defineProps({
    iconPath: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
});

const iconBackgroundClass = computed(() => {
    if (props.iconPath.includes(CAMOUFLAGE)) {
        return 'icon-orange-bg';
    } else {
        return 'icon-blue-bg';
    }
});
</script>

<style scoped>
.icon-container {
    position: relative;
    width: 50px;
    height: 50px;
    display: inline-block;
}

.activity-icon-wrapper {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
}

.activity-icon {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.icon-blue-bg {
    background-color: #16bedc;
}

.icon-orange-bg {
    background-color: #f48c30;
}

.jr-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 15px;
    height: 15px;
    background-color: #f6a855;
    color: #000000;
    border-radius: 40%;
    font-size: 10px;
    text-align: center;
    line-height: 15px;
}
</style>