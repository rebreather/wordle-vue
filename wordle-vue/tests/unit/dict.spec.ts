import { expect } from 'chai'
import { getWordsByLength } from '@/dict'

describe('@dict', () => {
  //단어 길이가 제대로 맞는지
  
  it('properly fetches dictionary words', () => {
    const words5 = getWordsByLength(5)
    expect(words5.every(x => x.length === 5)).to.eq(true)
    expect(words5).to.contain('apple')

    const words6 = getWordsByLength(6)
    expect(words6.every(x => x.length === 6)).to.eq(true)
    expect(words6).to.contain('cactus')
  })
})
