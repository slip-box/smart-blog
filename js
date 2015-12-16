```
/*
Create by chayangge 
e-mail:chayangge@163.com
*/

;(function($){ 
    $.fn.extend({
        "Timing" : function(time,url,data){
            var newopts = {
                time:time,
                url:url, //读取不同的验证接口，如：注册，密码找回，绑定手机等。。。。
                data:data
            };
            var defaults = {
                time:60  //默认倒计时60秒
            };
            //传参取代默认时间
            var option = $.extend({},defaults,newopts);
            var _this = $(this);
            _this.on("click",send);
            //ajax
            function send() {
                if( mobileBox.isValid() ){ // 此处判断手机格式是否通过验证，请根据实际情况更改，可删除
                    _this.html("正在发送");
                    option.data.mobile = mobileBox.val();
                    $.ajax({
                        type: "POST",
                        url: option.url,
                        dataType:"json",
                        data:option.data,
                        success: function(msg) {
                            if (msg.code !== 200) {
                                 
                                _this.html("发送验证码");
                                util.alertOnEl(msg.data.message, _this,{ //用alertdilog显示错误信息，可自定义更改、删除
                                    autoClose:true
                                });
                                return;
                            }
                            _this.unbind("click"); //很重要，点击后取消点击事件，防止多次点击验证
                            var startTime = option.time; //一下是逻辑代码，点击后切换倒计时按钮样式
                            _this.html(startTime+"s重新发送").removeClass("send-validate").addClass("send-timing");
                            var timer = setInterval(function(){
                                _this.html(--startTime+"s重新发送");
                                if(startTime <= 0){
                                    clearInterval(timer);
                                    _this.html("重新发送").on("click",send).removeClass().addClass("send-validate"); 
                                }
                            },1000);                 
                        },
                        error:function(XMLHttpRequest, textStatus, errorThrown){
                            console.log(XMLHttpRequest);
                        }
                    });
                }
            }
            return this; //保持链式
        }
    });
})(jQuery)
```
