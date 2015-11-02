var TextEllipsis = {
  length: 0,
  selector: 'ellipsis',
  init: function() {
    var ele = document.getElementsByClassName(this.selector);
    for (var i = 0; i < ele.length; i++) {
      var text = ele[i].innerHTML;
      if (text.length > this.length) {
        ele[i].innerHTML = text.slice(0, 57) + '......';
      }
    }
  }
}