var tabs = document.getElementsByClassName('tab');

for (var i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function() {
    var selectedTab = this;
    
    // Remover la clase 'selected' de todos los tabs
    for (var j = 0; j < tabs.length; j++) {
      tabs[j].classList.remove('selected');
    }
    
    // Agregar la clase 'selected' al tab seleccionado
    selectedTab.classList.add('selected');
  });
}


// // tabs
  
//   // modal sign in }
//   function modal() {
//     const open = document.getElementById('open')
//     const modal = document.getElementById('modal_container')
//     const close = document.getElementById('close')
//     const scroll = document.querySelector('body')
  
//     open.addEventListener('click', () => {
//       btn.classList.toggle('header__button--active')
//       document
//         .querySelector('.header__links')
//         .classList.toggle('header__links--active')
  
//       modal.classList.add('show')
//       scroll.classList.add('scroll-body')
//     })
  
//     close.addEventListener('click', () => {
//       modal.classList.remove('show')
//       scroll.classList.remove('scroll-body')
//     })
//   }