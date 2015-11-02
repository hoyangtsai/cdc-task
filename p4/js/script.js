var BossSaying = {
  comments: [],
  click: null,
  content: null,
  init: function() {
    BossSaying.click = 'touch' in window ? 'touchstart' : 'click';
    BossSaying.content = document.getElementById('content');
    var moreBtn = document.getElementsByClassName('more-btn');
    for (var i = 0; i < moreBtn.length; i++) {
      moreBtn[i].addEventListener(BossSaying.click, BossSaying.handleClick);
    }

    var msgBody = document.getElementsByClassName('message-body');
    for (var i = 0; i < msgBody.length; i++) {
      var ref = msgBody[i].dataset.ref;
      var text = msgBody[i].innerHTML;
      BossSaying.comments[ref] = text;
    }

    TextEllipsis.length = 58;
    TextEllipsis.init();
  },

  handleClick: function(e) {
    if (e.target.id === 'popup-closeBtn') {
      document.getElementById('lightbox').classList.add('null-opacity');
    } else if(e.target.className === 'more-btn'){
      var ref = e.target.dataset.ref;
      var comment = document.getElementById(ref);
      var name = comment.querySelector('.profile-name');
      var photo = comment.querySelector('.profile-photo');
      var text = BossSaying.comments[ref];
      var lightbox = BossSaying.getLightbox(name.innerHTML, photo.src, text);
      BossSaying.content.appendChild(lightbox);
    }
  },

  handleTransition: function(e) {
    e.stopPropagation();
    BossSaying.content.removeChild(BossSaying.content.lastChild);
  },

  getLightbox: function(name, imgsrc, text) {
    var lightSect = document.createElement('section');
    lightSect.id = 'lightbox';
    lightSect.addEventListener('webkitTransitionEnd', BossSaying.handleTransition);
    lightSect.addEventListener('transitionend', BossSaying.handleTransition);
    var popupDiv = document.createElement('div');
    popupDiv.className = 'popup';
    var closeBtn = document.createElement('span');
    closeBtn.id = 'popup-closeBtn';
    closeBtn.addEventListener(BossSaying.click, BossSaying.handleClick);

    var profileDiv = document.createElement('div');
    profileDiv.className = 'popup-profile';
    var photo = document.createElement('img');
    photo.src = imgsrc;
    var nameNode = document.createElement('p');
    nameNode.innerHTML = name;

    var textNode = document.createElement('p');
    textNode.className = 'popup-text';
    textNode.innerHTML = text;

    profileDiv.appendChild(photo);
    profileDiv.appendChild(nameNode);

    var contentDiv = document.createElement('div');
    contentDiv.className = 'popup-content';
    contentDiv.appendChild(profileDiv);
    contentDiv.appendChild(textNode);

    popupDiv.appendChild(closeBtn);
    popupDiv.appendChild(contentDiv);

    lightSect.appendChild(popupDiv);

    return lightSect;
  }
};

window.addEventListener('load', BossSaying.init.bind(this));