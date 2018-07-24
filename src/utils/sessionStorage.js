const keys = {
  HISTORY : 'history',
  PROMPT_IDX : 'promptIdx',
  GOAL_CID : 'goal_cid',
  CURRENT_NODE_ID : 'currentNodeId',
  IS_MODAL_OPEN : 'isModalOpen',
}


export default {
  store: window.sessionStorage,
  setHistory(value){
    this.store.setItem(keys.HISTORY, value)
    return this;
  },
  setPromptIdx(value){
    this.store.setItem(keys.PROMPT_IDX, value)
    return this;
  },
  setGoalCid(value){
    this.store.setItem(keys.GOAL_CID, value)
    return this;
  },
  setCurrentNodeId(value){
    this.store.setItem(keys.CURRENT_NODE_ID, value)
    return this;
  },
  setIsModalOpen(value){
    this.store.setItem(keys.IS_MODAL_OPEN, value)
    return this;
  },
  getStore(){
    return Object.keys(keys).reduce((acc, current, index, arr) => {
      acc[keys[current]] = this.store.getItem(keys[current]) ? JSON.parse(this.store.getItem(keys[current])) : undefined;
      
      if(!acc[keys['HISTORY']]){
        acc[keys['HISTORY']] = []
      }

      return acc;
    }, {});
  },
  resetStore(){
    return Object.keys(keys).map(key => {
      this.store.removeItem(keys[key]);
    })
  }
}