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

    // 단어가 일부 틀릴 경우 색깔 매치(길이가 같을 때)
    it('properly processes exact match', () => {
        expect(matchWord('cacao', 'broad')).to.eql([
            'gray', 'gray', 'yellow', 'yellow', 'gray'
        ])
    })

    // 길이부터 맞지 않을 때
    it('throws on invalid (non-same-length) query', () => {
        expect(() => matchWord('crane', 'zzzzzz')).to.throw()
    })
})