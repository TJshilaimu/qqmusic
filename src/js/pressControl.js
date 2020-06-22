(function (root) {

    function Process() {
        this.dur = 0;
        this.frameId = 0;
        this.startTime = 0;
        this.lastTime = 0;
        this.getDom();
    }

    Process.prototype = {
        getDom() {
            this.current = document.querySelector('.process .currentTime');
            this.total = document.querySelector('.process .totalTime');
            this.line = document.querySelector('.press .frontBg');
            this.dot = document.querySelector('.press .dot');
        },
        formatTime(time) {
            time = Math.round(time);
            var m = Math.floor(time / 60);
            var s = time % 60;

            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;

            return m + ':' + s;
        },
        renderAllTime(time) {
            this.dur = time;
            time = this.formatTime(time);
            this.total.innerText = time;
        },
        start(p,flag) {
            let that = this;
            this.lastTime = p == undefined ? this.lastTime : p
            this.startTime = new Date().getTime();
            cancelAnimationFrame(this.frameId)

            function frame() {
                let lastTime = new Date().getTime();
                let per = that.lastTime + (lastTime - that.startTime) / (that.dur * 1000);
                if (per <= 1) {
       
                    that.update(per,flag);
                } else {
                    cancelAnimationFrame(that.frameId);
                }
                that.frameId = requestAnimationFrame(frame);
            }
            frame();
        },
        update(per,flag) {
            let t = per * this.dur;
            t = this.formatTime(t);
            // console.log(t)
            this.current.innerText = t;
            this.line.style.width = per * 100 + '%';
            if(flag){
                return;
            }
            var l = per * this.dot.parentNode.offsetWidth;
            this.dot.style.transform = 'translateX(' + l + 'px)';
            // console.log(window.getComputedStyle(this.line.width))
        },
        stop() {
            cancelAnimationFrame(this.frameId)
            let ls = new Date().getTime();
            this.lastTime = this.lastTime + (ls - this.startTime) / (this.dur * 1000);
        }

    }

    function Drag(obj) {
        this.obj = obj;
        this.startPoint = 0;
        this.startLeft = 0;
        this.percent = 0;
        this.disPointX=0;
        this.touchStart()
    }
    Drag.prototype = {
        touchStart() {
            let that = this;
            this.obj.style.transform = 'translateX(0)';
            this.obj.addEventListener('touchstart', function (e) {
              that.startPoint=e.changedTouches[0].pageX;
              that.startLeft=parseFloat(this.style.transform.split('(')[1]); 

              that.start && that.start();
            })
            this.obj.addEventListener('touchmove',function(e){
                that.disPointX = e.changedTouches[0].pageX - that.startPoint;
            
                var l =that.startLeft + that.disPointX;
                
                if (l < 0) {
                    l = 0;
                } else if (l > this.offsetParent.offsetWidth) {
                    l = this.offsetParent.offsetWidth
                }
                this.style.transform = 'translateX(' + l + 'px)';
                that.percent = l / this.offsetParent.offsetWidth;

                that.move && that.move(that.percent);
            })
            this.obj.addEventListener('touchend',function(e){
                that.end && that.end(that.percent);
            })

        }

    }

    // root.pro = new Process()


    function instancesProgress() {
        return new Process();
    }

    function instancesDrag(obj) {
        return new Drag(obj);
    }


    root.pro = {
        pros: instancesProgress,
        drag: instancesDrag,
    }


})(window.player || (window.player = {}))