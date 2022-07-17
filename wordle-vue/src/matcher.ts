export type MatchResult = 'green' | 'yellow' | 'gray'

/*
green : 자리, 알파벳 전부 맞춤
yellow : 알파벳은 맞췄으나 자리는 틀림
gray : 정답에 들어간 알파벳이 아님
*/

export function matchWord (
    query: string,
    answer: string
): MatchResult[] {
    if(query.length !== answer.length) {
        throw new Error('Invalid query: 길이가 다릅니다.')
    }
    
    const length = query.length
    const ret = Array(length).fill('gray') as MatchResult[]

    // 기본적으로 gray로 되어있음, 같은 알파벳을 만날 때 green으로 변경
    for(let i = 0; i < length; i++) {
        if(query[i] === answer[i]) {
            ret[i] = 'green'
        }
    }

    //count non-matched answer characters 틀린 알파벳 카운트
    const chCountMap = {} as {[key: string]:number}
    for(let i = 0; i < length; i++) {
        if(ret[i] === 'gray') {
            const ch = answer[i]
            chCountMap[ch] = (chCountMap[ch] || 0) + 1
        }
    }

    //Label misplace-matched character on query sides
    for(let i = 0; i< length; i++) {
        if(ret[i] === 'gray') {
            const queryCh = query[i]
            if(chCountMap[queryCh] >0) {
                chCountMap[queryCh]--
                ret[i] = 'yellow'
            }
        }
    }

    return ret
}