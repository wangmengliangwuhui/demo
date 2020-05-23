function getStyle(obj,name){
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }else{
        return getComputedStyle(obj,false)[name];
    }
}

function startMove(obj,attr,target){
    clearInterval(obj.time);
    obj.time=setInterval(function(){
        //此时，可以使用之前封装好的函数,但是一定要记得使用parseInt，
        //因为得到的值带有px，使用parseInt把他转化为整数
        //对于透明度要换一种方式
        var curr=0;
        if(attr=='opacity'){
            //计算机存储小数时出现的bug，0.07*100得到的是7.000000001，所以四舍五入
            curr = Math.round(parseFloat(getStyle(obj,attr))*100);
        }else{
            curr = parseInt(getStyle(obj,attr));
        }

        var speed = (target-curr)/6;
        speed = speed>0?Math.ceil(speed):Math.floor(speed);
        //此时不需要使用>号，是因为对于缓冲运动而言，速度是变化的，到最后的时候，速度回变成1
        //因此不会存在高度大于目标值的情况
        if(curr==target){
            clearInterval(obj.time);
        }else{
            //此时可以利用[]获取属性的方法把属性作为参数传进来，
            //即把obj.style.height 转换为obj.style['height']

            if(attr=='opacity'){
                //记得加括号
                obj.style.filter = 'alpha(opacity:'+(curr+speed)+')';
                obj.style.opacity = (curr+speed)/100;
            }else{
                obj.style[attr] = curr+speed+'px';
            }                       
        }
    },30)
}
