import BGSound from '../assets/sounds/bg.mp3'
import TypeWritterSound from '../assets/sounds/typewritter.mp3'
import ButtonSound from '../assets/sounds/button.mp3'

export default {
  bg: new Audio(BGSound),
  typeWritter: new Audio(TypeWritterSound),
  button: new Audio(ButtonSound),

  isMute: false,

  play(type){
    if(this.isMute){
      return true;
    }
    this[type].play();
  },

  stop(type){
    this[type].currentTime = 0;
    this[type].pause();    
  },

  setMute(boolean){
    this.isMute = boolean;
  }
}