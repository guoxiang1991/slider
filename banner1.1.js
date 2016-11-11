function Banner(idName, data, interval, effect) {
    this.oBox = document.getElementById(idName);
    this.oBoxInner = this.oBox.getElementsByTagName('div')[0];
    this.oUl = this.oBox.getElementsByTagName('ul')[0];
    this.oOl = this.oBox.getElementsByTagName('ol')[0];
    this.aDiv = this.oBoxInner.getElementsByTagName('div');
    this.aImg = this.oBoxInner.getElementsByTagName('img');
    this.aLi = this.oUl.getElementsByTagName('li');
    this.aLi2 = this.oOl.getElementsByTagName('li');
    this.aA = this.oBox.getElementsByTagName('a');
    this.data = data;
    this.step = 0;
    this.autoTimer = null;
    this.interval = interval || 1000;
    this.myEffect = effect || 0;
    this.init();
}
Banner.prototype = {
    constructor: Banner,
    init: function init() {
        var _this = this;
        this.bind();
        setTimeout(function () {
            _this.lazyImg();
        }, 300);
        clearInterval(this.autoTimer);
        this.autoTimer = setInterval(function () {
            _this.autoMove();
        }, this.interval);
        this.overOut();
        this.handleChange();
        this.hoverChange();
        this.leftRight();
    },
    bind: function bind() {
        var str1 = '';
        var str2 = '';
        for (var i = 0; i < this.data.length; i++) {
            str1 += '<div><img realImg="' + this.data[i].imgSrc + '" alt=""/></div>';
            str2 += i === 0 ? '<li class="bg"></li>' : '<li></li>';
        }
        str1 += '<div><img realImg="' + this.data[0].imgSrc + '" alt=""/></div>';
        this.oBoxInner.innerHTML = str1;
        this.oUl.innerHTML = str2;
        this.oBoxInner.style.width = this.aDiv.length * this.aDiv[0].offsetWidth + 'px';
    },
    lazyImg: function lazyImg() {
        var _this = this;
        for (var i = 0; i < this.aImg.length; i++) {
            (function (index) {
                var tmpImg = new Image;
                tmpImg.src = _this.aImg[index].getAttribute('realImg');
                tmpImg.onload = function () {
                    _this.aImg[index].src = this.src;
                    tmpImg = null;
                };
                tmpImg.onerror = function () {
                    tmpImg = null;
                }
            })(i);
        }
    },
    autoMove: function autoMove() {
        if (this.step >= this.aDiv.length - 1) {
            this.step = 0;
            utils.css(this.oBoxInner, 'left', 0);
        }
        this.step++;
        animate(this.oBoxInner, {left: -this.step * 800}, 500, this.myEffect);
        this.bannerTip();
    },
    bannerTip: function bannerTip() {
        var tmpStep = this.step >= this.aLi.length ? 0 : this.step;
        for (var i = 0; i < this.aLi.length; i++) {
            i === tmpStep ? utils.addClass(this.aLi[i], 'bg') : utils.removeClass(this.aLi[i], 'bg');
        }
    },
    overOut: function () {
        var _this = this;
        _this.oBox.onmouseover = function () {
            clearInterval(_this.autoTimer);
        };
        _this.oBox.onmouseout = function () {
            _this.autoTimer = setInterval(function () {
                _this.autoMove();
            }, _this.interval);
        };
    },
    handleChange: function handleChange() {
        var _this = this;
        for (var i = 0; i < _this.aLi.length; i++) {
            _this.aLi[i].index = i;
            _this.aLi[i].onclick = function () {
                _this.step = this.index;
                animate(_this.oBoxInner, {left: -_this.step * 800}, 500);
                _this.bannerTip();
            }
        }
    },
    hoverChange:function hoverChange(){
        var _this = this;
        for (var i = 0; i < _this.aLi2.length; i++) {
            _this.aLi2[i].index = i;
            _this.aLi2[i].onmouseover = function () {
                _this.step = this.index;
                animate(_this.oBoxInner, {left: -_this.step * 800}, 500);
                _this.bannerTip();
            }
        }
    },
    leftRight: function () {
        var _this = this;
        _this.aA[1].onclick = function () {
            _this.autoMove();
        };
        _this.aA[0].onclick = function () {
            if (_this.step <= 0) {
                _this.step = _this.aLi.length;
                utils.css(_this.oBoxInner, 'left', -_this.step * 800);
            }
            _this.step--;
            animate(_this.oBoxInner, {left: -_this.step * 800}, 500);
            _this.bannerTip();
        }
    }
};