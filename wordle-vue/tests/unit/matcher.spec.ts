import { expect } from 'chai'
import { matchWord } from '@/matcher'

describe('@matcher', () => {
    //단어를 맞췄을 경우 전부 다 초록색으로 나오는지 테스트
    it('properly processes exact match', () => {
        expect(matchWord('crane', 'crane')).to.eql([
            'green', 'green', 'green', 'green', 'green'
        ])
    })

    // 단어가 완전히 틀릴 경우 전부 다 회색(길이가 같을 때)
    it('properly processes exact match', () => {
        expect(matchWord('crane', 'zzzzz')).to.eql([
            'gray', 'gray', 'gray', 'gray', 'gray'
        ])
    })

    // 단어가 완전히 틀릴 경우 전부 다 회색(길이가 같을 때)
    it('properly processes exact match', () => {
        expect(matchWord('cacao', 'broad')).to.eql([
            'gray', 'gray', 'yellow', 'yellow', 'gray'
        ])
    })
})