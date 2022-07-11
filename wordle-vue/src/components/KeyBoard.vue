<script setup lang="ts">
import { MatchResult } from '@/matcher';
import { computed } from '@vue/runtime-core';
import { calculateMatchResultMatrix } from './utils/calculateMatchResultMatrix';
import { ref } from 'vue'

const props = defineProps<{
    queries: string[], //내가 입력하는 단어들
    answer: string
}>()

const matchResultMatrix = calculateMatchResultMatrix(props)

const alphabetMatchResultMap = computed(() => {
    const ret: { [ch: string]: MatchResult } = {}

    for(let row = 0; row < props.queries.length; row++) {
        const query = props.queries[row] //내가 입력한 단어들의 단어 각각
        const matchResultList = matchResultMatrix.value[row]

        for(let chPos = 0; chPos < query.length; chPos++) {
            const ch = query[chPos] // 내가 입력한 단어의 알파벳 각각
            const matchResult = matchResultList[chPos]
            ret[ch] = matchResult

            switch(ret[ch]) {
                case 'green':
                    break;

                case 'yellow':
                    if(matchResult == 'green') {
                        ret[ch] = matchResult
                    }
                    break;

                case 'gray':
                    case undefined:
                    ret[ch] = matchResult
                    break;
            }
        }
    }
    console.log(matchResultMatrix)
    return ret
})

    const keyboardKeys = ref([
        'qwertyuiop',
        'asdfghjkl',
        'zxcvbnm'
    ])

    const emit = defineEmits<{
        (eventName: 'keyClick', key:string): void
    }>()
</script>

<template>
    <div class = "keyboard">
        <!--qwerty 키보드-->
        <div class="keyboard-row" v-for="row, i in keyboardKeys" :key="i">
            <div class="keyboard-key" :class='[`wordle-match-${alphabetMatchResultMap[ch]}`]' v-for="ch in row" :key="ch" @click="emit('keyClick',ch)">
                {{ch.toUpperCase()}}
            </div>
        </div>

        <!--backspace, enter 키보드-->
        <div class = "keyboard-row">
            <div class = "keyboard-key" @click="emit('keyClick','backspace')">Backspace</div>
            <div class = "keyboard-key" @click="emit('keyClick','enter')">Enter</div>
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

                user-select: none;

                &:hover {
                    background: #aaa;
                    cursor:pointer;
                }
            }
        }
    }
</style>