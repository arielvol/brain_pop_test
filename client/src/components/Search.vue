<template>
    <div>
        <v-combobox clearable :label="labelText" v-model="internalSearch" :items="suggestions" variant="outlined">
            <template #append-inner>
                <v-icon color="teal">mdi-magnify</v-icon>
            </template>
        </v-combobox>
    </div>
</template>


<script setup>
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    suggestions: {
        type: Array,
        required: true
    },
    labelText: {
        type: String,
        required: false,
        default: 'Please enter a search term'
    }
});

let internalSearch = ref(props.modelValue || '');

watch(internalSearch, (newValue) => {
    emit('update:modelValue', newValue || '');
});

watch(props, (newProps) => {
    internalSearch.value = newProps.modelValue;
});
</script>

<style scoped>
.teal-background {
    background-color: teal;
    height: 60px;
    width: 30px;
}
</style>