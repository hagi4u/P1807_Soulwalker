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

  getWholeNode(){
    console.log(this.scenario);
  }
  getCurrentNode(){}
}