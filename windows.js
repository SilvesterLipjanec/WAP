function init(){
    indexDesktops();
    initWindows();
}

function indexDesktops(){
    var documents = document.getElementsByClassName("desktop");
    for( var i = 0 ; i < documents.length ; i++){
        documents[i].setAttribute("desktopnum",i);
    }
}
function createWindowHeader(){
    var divHeader = document.createElement("DIV");
    divHeader.classList.add("windowheader");
    
    var spanTitle = document.createElement("SPAN");
    spanTitle.textContent = "Toto je title";
    
    var spanButtons = document.createElement("SPAN");
    spanButtons.classList.add("buttons");
    
    var spanMinimize = document.createElement("SPAN");
    spanMinimize.classList.add("min");
    spanMinimize.textContent = "_";
    spanMinimize.onclick = minimizeWindow;

    var spanMaximize = document.createElement("SPAN");
    spanMaximize.classList.add("max");
    spanMaximize.textContent = "[ ]";
    spanMaximize.onclick = maximizeWindow;
    
    var spanClose  = document.createElement("SPAN");
    spanClose.classList.add("close");
    spanClose.textContent = "X";
    spanClose.onclick = closeWindow;
    spanButtons.appendChild(spanMinimize);
    spanButtons.appendChild(spanMaximize);
    spanButtons.appendChild(spanClose);
    divHeader.appendChild(spanTitle);
    divHeader.appendChild(spanButtons);
    return divHeader;
}
function closeWindow(e){
    e.target.closest(".window").remove();
}
var windowSize = [];
function saveWindowSize(window){
    var winnumber = getWindowNumber(window);
    windowSize[winnumber] = {
        w: window.clientWidth,
        h: window.clientHeight,
        t: window.offsetTop,
        l: window.offsetLeft
    }
}
function getWindowNumber(window){
    return window.getAttribute('windownum');
}
function restoreWindowSize(window){    
    var winnumber = getWindowNumber(window);
    window.style.height = windowSize[winnumber].h + "px";
    window.style.width = windowSize[winnumber].w + "px";
    window.style.top = windowSize[winnumber].t + "px";
    window.style.left = windowSize[winnumber].l + "px";
}
function maximizeWindow(e){
    var window = e.target.closest(".window");    
    var desktop = e.target.closest(".desktop");
    var winnumber = getWindowNumber(window);
    window.style.zIndex = getMaxZIndex(desktop) + 1;
    if(e.target.textContent == "[ ]"){
        e.target.textContent = "=";
        saveWindowSize(window);
        window.style.height = desktop.clientHeight + "px";
        window.style.width = desktop.clientWidth + "px";
        window.style.top = desktop.offsetTop + "px";
        window.style.left = desktop.offsetLeft + "px";
    }
    else{
        e.target.textContent = "[ ]";
        restoreWindowSize(window,winnumber);
    }    
}
function minimizeWindow(e){
    var window = e.target.closest(".window");
    if(!window.getAttribute("minimized") || window.getAttribute("minimized") == "false"){
        window.setAttribute("minimized",true);    
        saveWindowSize(window);
        window.style.height = "initial";
    }
    else{
        window.setAttribute("minimized",false);    
        restoreWindowSize(window);  
    }
    
}
function createResizeableCorners(){  
    var resizers = document.createElement("DIV");
    resizers.classList.add('resizers');

    var resizerTopLeft = document.createElement("DIV");
    resizerTopLeft.classList.add('resizer','top-left');
    
    var resizerTopRight = document.createElement("DIV");
    resizerTopRight.classList.add('resizer','top-right');
    
    var resizerBottomLeft = document.createElement("DIV");
    resizerBottomLeft.classList.add('resizer','bottom-left');
    
    var resizerBottomRight = document.createElement("DIV");
    resizerBottomRight.classList.add('resizer','bottom-right');

    var resizerBottom = document.createElement("DIV");
    resizerBottom.classList.add('resizer','bottom');

    var resizerTop = document.createElement("DIV");
    resizerTop.classList.add('resizer','top');

    var resizerLeft = document.createElement("DIV");
    resizerLeft.classList.add('resizer','left');

    var resizerRight = document.createElement("DIV");
    resizerRight.classList.add('resizer','right');

    resizers.appendChild(resizerTopLeft);
    resizers.appendChild(resizerTopRight);
    resizers.appendChild(resizerBottomLeft);
    resizers.appendChild(resizerBottomRight);
    resizers.appendChild(resizerBottom);
    resizers.appendChild(resizerTop);
    resizers.appendChild(resizerLeft);
    resizers.appendChild(resizerRight);

    return resizers;
}
function initWindows(){
    var windows = document.getElementsByClassName("window");
    for( var i = 0 ; i < windows.length ; i++){
        windows[i].classList.add("window-prop");
        windows[i].append(createWindowHeader());
        windows[i].append(createResizeableCorners());
        makeResizableDiv(windows[i]);
        windows[i].setAttribute("windownum",i);
        dragElement(windows[i].getElementsByClassName("windowheader")[0]);
        windows[i].addEventListener('mousedown',function(e){
            desktopNum = this.parentElement.getAttribute('desktopnum');
            desktop = getDesktopByNum(desktopNum);
            this.style.zIndex = getMaxZIndex(desktop) + 1;
        });
    }
}
function getMaxZIndex(desktop){
    var windows = desktop.getElementsByClassName("window");
    var maxZindex = 0;
    for( var i = 0 ; i < windows.length ; i++){
        var z = parseInt(windows[i].style.zIndex);
        if(z && z > maxZindex){
            maxZindex = z; 
        }
    }
    return maxZindex;
}
function getDesktopByNum(desktopNum){
    var desktops = document.getElementsByClassName("desktop");
    var desktop = desktops[0];
    for( var j = 0 ; j < desktops.length ; j++ ){
        if( desktopNum == desktops[j].getAttribute("desktopnum")){
            desktop = desktops[j];
        }
    }
    return desktop;
}
function dragElement(elmnt){
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.addEventListener('mousedown',dragMouseDown);
}
function dragMouseDown(e){
    e = e || window.event;
    e.preventDefault();
    var elmnt = e.target.parentElement;
    //findout in which desktop is window
    desktopNum = elmnt.parentElement.getAttribute('desktopnum');
    desktop = getDesktopByNum(desktopNum);
    elmnt.style.zIndex = getMaxZIndex(desktop) + 1;
    pos3 = e.clientX + window.scrollX;
    pos4 = e.clientY + window.scrollY;
    window.addEventListener('mousemove', elementDrag);
    window.addEventListener('mouseup', closeDragElement);

    function elementDrag(e) {   
        //if(elmnt.classList.contains("window"))   {
            
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX - window.scrollX;
        pos2 = pos4 - e.clientY - window.scrollY;
        pos3 = e.clientX;
        pos4 = e.clientY + window.scrollY;
        // set the element's new position:         
        
        var offsetTop = elmnt.offsetTop - pos2;
        var offsetLeft = elmnt.offsetLeft- pos1;
        if(offsetTop > desktop.offsetTop && (offsetTop + elmnt.clientHeight) < (desktop.offsetTop + desktop.clientHeight)){
            elmnt.style.top = offsetTop + "px";
        }
        if(offsetLeft > desktop.offsetLeft && (offsetLeft + elmnt.clientWidth) < (desktop.offsetLeft + desktop.clientWidth)){
            elmnt.style.left = offsetLeft + "px";
        }       
    }
    function closeDragElement(e) {
        // stop moving when mouse button is released:
        window.removeEventListener('mousemove', elementDrag)
    }
}
  

/////////////
/*Make resizable div, tutorial by Hung Nguyen edited by Silvester Lipjanec*/
function makeResizableDiv(element) {
    const resizers = element.querySelectorAll('.resizer')
    const minimum_size_w = 250;
    const minimum_size_h = 50;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    for (let i = 0; i < resizers.length; i++) {
      const currentResizer = resizers[i];
      currentResizer.addEventListener('mousedown', function(e) {
        e.preventDefault()
        original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
        original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
        original_x = element.getBoundingClientRect().left;
        original_y = element.getBoundingClientRect().top;
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;
        window.addEventListener('mousemove', resize)
        window.addEventListener('mouseup', stopResize)
      });
      
      function resize(e) {
        if (currentResizer.classList.contains('bottom-right')) {
          const width = original_width + (e.pageX - original_mouse_x);
          const height = original_height + (e.pageY - original_mouse_y)
          if (width > minimum_size_w) {
            element.style.width = width + 'px'
          }
          if (height > minimum_size_h) {
            element.style.height = height + 'px'
          }
        }
        else if (currentResizer.classList.contains('bottom-left')) {
          const height = original_height + (e.pageY - original_mouse_y)
          const width = original_width - (e.pageX - original_mouse_x)
          if (height > minimum_size_h) {
            element.style.height = height + 'px'
          }
          if (width > minimum_size_w) {
            element.style.width = width + 'px'
            element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
          }
        }
        else if (currentResizer.classList.contains('top-right')) {
          const width = original_width + (e.pageX - original_mouse_x)
          const height = original_height - (e.pageY - original_mouse_y)
          if (width > minimum_size_w) {
            element.style.width = width + 'px'
          }
          if (height > minimum_size_h) {
            element.style.height = height + 'px'
            element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
          }
        }
        else if (currentResizer.classList.contains('top-left')){
          const width = original_width - (e.pageX - original_mouse_x)
          const height = original_height - (e.pageY - original_mouse_y)
          if (width > minimum_size_w) {
            element.style.width = width + 'px'
            element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
          }
          if (height > minimum_size_h) {
            element.style.height = height + 'px'
            element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
          }
        }
        else if(currentResizer.classList.contains('right')){
            const width = original_width + (e.pageX - original_mouse_x)
            if (width > minimum_size_w) {
                element.style.width = width + 'px'
            }
        }
        else if(currentResizer.classList.contains('left')){
            const width = original_width - (e.pageX - original_mouse_x)
            
            if (width > minimum_size_w) {
                element.style.width = width + 'px'
                element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
            }
        }
        else if (currentResizer.classList.contains('bottom')) {
            const height = original_height + (e.pageY - original_mouse_y)
            if (height > minimum_size_h) {
              element.style.height = height + 'px'
            }
        }
        else if (currentResizer.classList.contains('top')){
            const height = original_height - (e.pageY - original_mouse_y)
            if (height > minimum_size_h) {
              element.style.height = height + 'px'
              element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
            }
          }

      }
      
      function stopResize() {
        window.removeEventListener('mousemove', resize)
      }
    }
  }
  
