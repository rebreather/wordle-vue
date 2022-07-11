<script setup lang="ts">
    const keyboardKeys = [
        'qwertyuiop',
        'asdfghjkl',
        'zxcvbnm'
    ]

    const emit = defineEmits<{
        (eventName: 'keyClick', key:string): void
    }>()
</script>

<template>
    <div class = "keyboard">
        <div class="keyboard-row" v-for="row, i in keyboardKeys" :key="i">
            <div class="keyboard-key" v-for="ch in row" :key="ch" @click="emit('keyClick',ch)">
                {{ch.toUpperCase()}}
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .keyboard {
        margin-top: 3em;
        .keyboard-row {
            .keyboard-key {
                display: inline-block;
                background: #eee;
                font-size: 1.2em;
                font-weight: bold;
                padding: .3em;
                margin: .1em;

                &:hover {
                    background: #aaa;
                    cursor:pointer;
                }
            }
        }
    }
</style>