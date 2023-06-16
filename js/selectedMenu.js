export function selectedNav(){
    const tabs = document.getElementsByClassName('tab');
  const tabsArray = [...tabs];
  
  tabsArray.forEach(tab => {
    tab.addEventListener('click', function() {
      const selectedTab = this;
  
      tabsArray.forEach(tab => {
        tab.classList.remove('selected');
      });
  
      selectedTab.classList.add('selected');
    });
  });
  }
  