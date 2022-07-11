import {computed} from 'vue';
import { matchWord } from '@/matcher';

export function calculateMatchResultMatrix(props: Readonly<{
    queries: string[],
    answer: string
}>) {
    return computed(() => {
        return props.queries.map(q => matchWord(q, props.answer))
    })
}

