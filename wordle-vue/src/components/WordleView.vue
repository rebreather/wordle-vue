<!-- Wordle 단어 채점결과 표시하는 컴포넌트 -->

<template>
    <div class = "wordle-table">
        <div class = "wordle-row" v-for="_, i in tryCount" :key="i">

            <template v-if="queries[i] !== undefined">
                <div class = "wordle-char" :class="[`wordle-match-${matchResultMatrix[i][j]}`]" v-for="_, j in wordLength" :key="j">
                    {{queries[i][j].toUpperCase()}}
                </div>
            </template>

            <template v-else-if="queries.length === i">
                <div class = "wordle-char" v-for="_, j in wordLength" :key="j">
                    {{(lastQuery[j] || '&nbsp;').toUpperCase()}}
                </div>
            </template>
            
            <template v-else>
                <div class = "wordle-char" v-for="_, j in wordLength" :key="j">&nbsp;</div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import { calculateMatchResultMatrix } from './utils/calculateMatchResultMatrix';

const props = defineProps<{
    queries: string[],
    lastQuery: string[],
    tryCount: number,
    answer: string
}>()

const wordLength = computed(() => props.answer.length)

// 입력한 단어에 대해 색깔 칠하는 함수
const matchResultMatrix = calculateMatchResultMatrix(props)
</script>

<style lang = "scss">
.wordle-table{
    .wordle-row {
        margin-top: .3em;
        &.first-of-kind {
            margin-top: 0px;
        }

        .wordle-char {
            display: inline-block;
            background: #eee;
            font-size: 2em;
            width: 2em;
            height: 2em;
            line-height: 2em;
            margin: 0 .1em;

            &.wordle-match-green {
                background: #6eec45;
            }

            &.wordle-match-yellow {
                background: #ffee9b;
            }

            &.wordle-match-gray {
                background: #444;
                color: #fff;
            }
        }
    }
}


</style>