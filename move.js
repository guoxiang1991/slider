(function(){
    var Effect = {
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        }
    };
    function move(curEle,target,duration,effect,callback){
        var tmpEffect=Effect.Linear;
        var ary = ["Linear", "Elastic-easeOut", "Back-easeOut", "Bounce-easeOut", "Expo-easeIn"];
        if(typeof effect==='number'){
            var str=ary[effect%ary.length];
            ary=str.split('-');
            tmpEffect=ary.length>=2?Effect[ary[0]][ary[1]]:Effect[ary[0]];
        }else if(typeof effect==='object'){
            tmpEffect=effect.length>=2?Effect[effect[0]][effect[1]]:Effect[effect[0]];
        }else if(typeof effect==='function'){
            callback=effect;
        }
        var begin={};
        var change={};
        var time=null;
        for(var attr in target){
            begin[attr]=utils.css(curEle,attr);
            change[attr]=target[attr]-begin[attr];
        }
        clearInterval(timer);
        var timer=setInterval(function(){
            time+=10;
            if(time>=duration){
                utils.css(curEle,target);
                clearInterval(timer);
                callback && callback.call(curEle);
                return;
            }
            for(var attr in change){
                var curPos=tmpEffect(time,begin[attr],change[attr],duration);
                utils.css(curEle,attr,curPos);
            }
        },10)
    }
    window.animate=move;
})();