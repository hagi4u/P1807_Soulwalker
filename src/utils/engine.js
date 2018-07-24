/*
NodeHandler()
getCurrentNode => (nodes, id) => nodes.filter(node => node.id === id)

isParent = node => !node.hasOwnProperty('parent') || node.parent === '';
isQuestion = node => node.promptCnt === node.prompt.length && node.prompt[last].isFinish

isFinishTraversal = node => !node.hasOwnProperty('question') || node.question.length === 0
*/

import scenario from '@/assets/scenario.json';
const initialHistory = [];

export default {

  scenario,
  isLockPromptId: false,
  history: initialHistory,
  currentPromptId: 0,
  currentNodeId: initialHistory[initialHistory.length - 1] || 0,

  getNodes(){
    return this.scenario;
  },
  getNode(cid = this.currentNodeId){
    const index = this.scenario.findIndex(item => parseInt(item.cid) === parseInt(cid));
    
    return {
      ...this.scenario[index],
      prompt: this.scenario[index].prompt.map(item => {
        return {
          ...item,
          prompt: item.prompt.replace(/\|+/gi, '<br/>'),
        }
      }),
      question: this.scenario[index].question.map(item => {
        return {
          ...item,
          question: item.question.replace(/\|+/gi, '<br/>'),
        }
      }),
    };
  },
  setPromptId(id = 0){
    this.currentPromptId = id;

    return this;
  },
  // question에서 실행 되어야 하는 코드
  goToNode(cid){
    this.history.push(parseInt(this.currentNodeId));

    this.currentNodeId = cid;
    this.setPromptId(this.isLockPromptId ? this.currentNodeId : null);

    return this;
  },
  goToParentNode(cid = this.history[this.history.length - 1]){
    this.currentPromptId = this.getNode(cid).prompt.length - 1;
    this.currentNodeId = cid; 

    this.history.pop();    
    return this;
  },
  // prompt에서 실행 되어야 하는 코드 (다음 프롬프트로 이동)
  nextPrompt(){
    if(this.currentPromptId === this.getNode().prompt.length - 1){
      return this.currentPromptId
    }
    return ++this.currentPromptId;
  },
  // prompt에서 실행 되어야 하는 코드 (이전 프롬프트로 이동)
  prevPrompt(){
    if(this.currentPromptId === 0){
      this.goToParentNode();
      return true;
    }
    return --this.currentPromptId;
  },
  // prompt에서 실행 되어야 하는 코드 (마지막 프롬프트 인 경우)
  isLastPrompt(){
    return this.currentPromptId === this.getNode().prompt.length-1 ? true : false;
  }
}