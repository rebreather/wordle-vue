<template>
<h2>Welcome to WORDLE GAME:)</h2>
  <WordleView :answer = "answer" :queries = "queries" :try-count="tryCount" :last-query="lastQuery"/>
  <KeyBoard :answer = "answer" :queries = "queries" @keyClick='onkeyClick'/>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import WordleView from './components/WordleView.vue';
import KeyBoard from './components/KeyBoard.vue';
import {words, randomAnswer} from './dict/words.js';

const queries = ref([] as string[])
const lastQuery = ref([] as string[]) //string 에서 문자 배열로 만듦
const answer = ref(words[randomAnswer()])
const tryCount = 6

function onkeyClick (ch:string) {
  if(ch === 'backspace') {
    // 입력한 알파벳이 있을 때
    if(lastQuery.value.length > 0) {
      lastQuery.value.pop() // 맨 뒤에 알파벳 제거
    }
  }
  else if(ch === 'enter') {
    if(lastQuery.value.length === answer.value.length) {
      const lastQueryString = lastQuery.value.join('')
      console.log(lastQueryString, lastQueryString.length)

      queries.value.push(lastQueryString)

      if(lastQueryString === answer.value) {
        alert('정답입니다!')
      }
      else { //6번의 기회가 다 찼을 때
        if(queries.value.length === tryCount) {
          alert('실패ㅜㅜ.. 정답은 ' + answer.value + '입니다.')
        }
      }
      lastQuery.value.length = 0
    }
  }
  // 입력한 알파벳이 없을 때
  else {
    //철자가 다섯개까지만 입력 되도록
    if(lastQuery.value.length < answer.value.length) {
      lastQuery.value.push(ch)
    }
  }
}

function keypressToClick(ev: KeyboardEvent) {
  const {key} = ev;

  if(/^[a-z]$/.test(key)) {
    onkeyClick(key)
  }
  else if(key === 'Backspace') { //BackSpace와 Backspace 와 구분이 됨. 주의할 것
    onkeyClick('backspace')
  }
  else if(key === 'Enter') {
    onkeyClick('enter')
  }
}
onMounted(() => {
  window.addEventListener('keydown', keypressToClick)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown',keypressToClick)
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
