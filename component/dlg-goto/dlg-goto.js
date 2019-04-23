/* exported $dlgGoto */
var $dlgGoto=(function(){ //加$表示页面上的UI元素
  //DOM绘制
  var $dlg=$(''
      + '<div class="notepad-dlg-mask notepad-dlg-goto">'
        + '<div class="dialogbox notepad-dlgbox">'
          + '<div class="notepad-dlg-titlebar">'
            + '<p class="title">转到指定行</p>'
            + '<span class="close-btn">×</span>'
          + '</div>'
          + '<div class="main notepad-dlg-main">'
          + '<label>行号(L):</label><br>'
          + '<input type="text" class="txt-line-num" autofocus><br>'
          + '<input type="button" value="转到" class="btn-goto btn">'
          + '<input type="button" value="取消" class="btn-cancel btn">'
          + '</div>'
        + '</div>'
      + '</div>');
  var $btnClose=$dlg.find('.close-btn'),
      $btnCancel=$dlg.find('.btn-cancel'),
      $btnGoto=$dlg.find('.btn-goto'),
      $textLineNum=$dlg.find('.txt-line-num'),
      $titleBar=$dlg.find('.notepad-dlg-titlebar');

  var $errMsg=$('<div class="err-msg"></div>');

  var cfg={
    curLine:1,
    totalLines:1,
    gotoHandler:null
  };

  function validation(){
    if($textLineNum.val()===''){
      showErrMsg('行号不能为空');
      return false;
    }

    var num=Number($textLineNum.val());

    if(isNaN(num)){
      showErrMsg('行号不是数字!');
      return false;
    }
    if(num===0){
      showErrMsg('行号不能小于1!');
      $textLineNum.select();
      return false;
    }

    if(num>cfg.totalLines){
      showErrMsg('行号超过了总行数!');
      return false;
    }

    return true;
  }
  function destroy(){ $dlg.remove(); }
  
  function gotoHandler(){
    if(!validation()) return;
    cfg.gotoHandler($textLineNum.val());
    destroy();
  }

  function filterKey(e){
    if(!/[0-9]/.test(e.key)){
      e.preventDefault();
      showErrMsg('你只能在此输入数字!');
    }
  }

  function showErrMsg(msg){
    $errMsg.html(msg);

    $($btnGoto.parent()).append($errMsg);

    setTimeout(function(){
      $errMsg.remove();
      $textLineNum.select();
    },3000);
  }

  var init=function(conf){
    $.extend(cfg,conf);
    $('body').append($dlg);

    //只有光标在titlebar上时才允许拖拽
    $dlg.find('.dialogbox').draggable({handle:$titleBar});
    $textLineNum.val(cfg.curLine);
    $textLineNum.select();

    //事件绑定
    $btnClose.click(destroy);
    $btnCancel.click(destroy);
    $btnGoto.click(gotoHandler);
    $textLineNum.keypress(filterKey);
  };

  return {init:init};
}());
