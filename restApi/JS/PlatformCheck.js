function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
let agent = navigator.userAgent.toLowerCase();
  
function checkPlatform() {
    if(!isMobile()) {
      if (agent.indexOf("chrome") != -1) {
        return true;
      } else {return false;}
    } else {return true;}
}
  
if(!checkPlatform()) {
    location.href="/IllegalPlatform";
}