/*
NodeHandler()
getCurrentNode => (nodes, id) => nodes.filter(node => node.id === id)

isParent = node => !node.hasOwnProperty('parent') || node.parent === '';
isQuestion = node => node.promptCnt === node.prompt.length && node.prompt[last].isFinish

isFinishTraversal = node => !node.hasOwnProperty('question') || node.question.length === 0
*/

import scenario from '@/assets/scenario.json';

export default {
  scenario,
  currentNodeId: 0,
  currentPromptId: 0,

  getNodes(){
    return this.scenario;
  },
  getNode(cid = this.currentNodeId){
    const index = this.scenario.findIndex(item => parseInt(item.cid) === cid);
    return {
      ...this.scenario[index],
      prompt: this.scenario[index].prompt.map(item => {
        return {
          ...item,
          prompt: item.prompt.replace(/\|+/gi, '<br/>')
        }
      })
    };
  },
  // question에서 실행 되어야 하는 코드
  goToNode(cid){
    this.currentNodeId = cid;
    this.currentPromptId = 0;
  },
  // prompt에서 실행 되어야 하는 코드 (다음 프롬프트로 이동)
  nextPrompt(){
    return ++this.currentPromptId;
  },
  // prompt에서 실행 되어야 하는 코드 (이전 프롬프트로 이동)
  prevPrompt(){
    return --this.currentPromptId;
  },
  // prompt에서 실행 되어야 하는 코드 (마지막 프롬프트 인 경우)
  isLastPrompt(){
    return this.currentPromptId === this.getNode().prompt.length-1 ? true : false;
  }
}