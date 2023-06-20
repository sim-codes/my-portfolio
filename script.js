/*
!!!!!
This code is created to display element's behavior. I'm not a JS expert so don't use it
!!!!!
*/


(function(){
  'use strict';

  class Menu {
    constructor(settings) {
      this.menuRootNode = settings.menuRootNode;
      this.isOpened = false;
    }
    
    changeMenuState(menuState) {
      return this.isOpened = !menuState;
    }
  }
  
  class MenuBurger extends Menu {
    
    constructor(settings) {
      super(settings);
      this.openText = settings.openText;
      this.closeText = settings.closeText;
      this.menuClassesNames = settings.menuClassesNames;
    }
    
    init() {
      let currentMenuState = this.changeMenuState(this.isOpened);
      let toggleHint = this.getCurrentToggleHint(currentMenuState, this.openText, this.closeText);
      let toggleNode = this.menuRootNode.querySelector(`.${this.menuClassesNames.toggleClass}`);
      let menuItems = this.menuRootNode.querySelectorAll(`.${this.menuClassesNames.menuItemClass}`);
      
      this.changeToggleHint(
        toggleHint, 
        this.menuRootNode.querySelector(`.${this.menuClassesNames.toggleHintClass}`)
      );
      this.menuRootNode.classList.toggle(`${this.menuClassesNames.activeClass}`);
      this.setCurrentA11yAttribute(currentMenuState, toggleNode, "aria-expanded");  
      this.getFocusCurrentNode(currentMenuState, toggleNode, menuItems[0]);
    }
    
    changeToggleHint(toggleHint, toggleNode) {
      toggleNode.textContent = toggleHint;
      return toggleHint; 
    }
    
    getCurrentToggleHint(currentMenuState, openText, closeText) {
      return (currentMenuState !== true) ? openText : closeText;
    }
    
    setCurrentA11yAttribute(currentMenuState, toggleNode, attribute) {
      return toggleNode.setAttribute(attribute, currentMenuState);
    }
    
    getFocusCurrentNode(currentMenuState, nodeFirst, nodeSecond) {
      return (currentMenuState !== true) ? this.setFocus(nodeFirst) : this.setFocus(nodeSecond);
    }
    
    setFocus(node) {
      return node.focus();
    }
  }

  const menuClassesNames = {
    rootClass: 'menu',
    activeClass: 'menu_activated',
    toggleClass: 'menu__toggle',
    toggleHintClass: 'menu__toggle-hint',
    menuItemClass: 'menu__link'
  }
  
  const jsMenuNode = document.querySelector(`.${menuClassesNames.rootClass}`);
  const demoMenu = new MenuBurger ({
    menuRootNode: jsMenuNode,
    menuClassesNames: menuClassesNames,
    openText: 'Open menu',
    closeText: 'Close menu'
  });
    
  function toggleMenu(event) {   
      return demoMenu.init();  
  }
  
  jsMenuNode.querySelector(`.${menuClassesNames.toggleClass}`).addEventListener('click', toggleMenu);
})();