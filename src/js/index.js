(function ($, player) {
    function MusicPlayer(dom) {
        this.dom = dom;
        this.dataList = [];
        this.nowIndex = 0;
        this.timer = null;
        this.rotate = 0;
        this.idx = null;
        this.show = true;
        this.list = null;
        this.pro= player.pro.pros();
        this.dur=0;

    }

    MusicPlayer.prototype = {
        init() {
            this.getDom(); //初始化元素
            this.getData('../mock/data.json'); //初始化数据
        },
        getDom() {
            this.record = document.querySelector('.imgInfo img') //获取图片dom
            this.controlList = document.querySelectorAll('ul li') //获取控制按钮dom
        },

        // 获取数据
        getData(url) {
            let that = this;
            $.ajax({
                url: url,
                method: 'get',
                success(res) {
                    that.dataList = res;
                    that.idx = new player.autoIndex(res.length)
                    that.nowIndex = that.idx.now;
                    //    that.list= player.createDom(that.dataList, that.dom)
                    that.listPlay()
                    that.getAudio(that.idx.now);
                    that.playControl();
                    // console.log(that.dom)
                    // player.loadAudio(1)
                    that.process()
                }
            })
        },

        // 加载音乐
        getAudio(index) {
            // 渲染图片背景、音乐
            let that = this;
            this.dur = this.dataList[index].duration
            player.render(that.dataList[index])
            player.audioControl.load(that.dataList[index].audioSrc)

            // player.pro.renderAllTime(that.dataList[index].duration)
            this.pro.renderAllTime(that.dataList[index].duration)
 
            if (player.audioControl.status == 'pause') {
                player.audioControl.pause();
            } else {
                player.audioControl.play();
                that.controlList[2].className = 'play'
            }

        },

        // 上一首、下一首
        playControl() {
            let that = this;
            // 是否喜欢
            this.controlList[0].addEventListener('touchend', function () {
                if (that.dataList[0].isLike) {
                    this.className = '';
                    that.dataList[0].isLike = false;
                } else {
                    this.className = 'liking';
                    that.dataList[0].isLike = true;
                }
            })

            // 上一首
            this.controlList[1].addEventListener('touchend', function () {
                let prev = that.idx.prev()
                that.nowIndex = that.idx.now;

                that.list.changeSelect(prev)
                that.getAudio(prev);
                player.audioControl.play();
                that.controlList[2].className = 'play'
                that.imgRotate(0)
                that.pro.start(0);

            })
            // 下一首
            this.controlList[3].addEventListener('touchend', function () {
                let next = that.idx.next();
                that.nowIndex = that.idx.now;

                that.list.changeSelect(next)
                that.getAudio(next);
                player.audioControl.play();
                that.controlList[2].className = 'play'
                that.imgRotate(0)
               that.pro.start(0);

            })

            // 播放与暂停
            this.controlList[2].addEventListener('touchend', function () {
                if (player.audioControl.status == 'pause') {
                    // 播放
                    player.audioControl.play();
                    that.controlList[2].className = 'play';
                    var deg = that.record.dataset.rotate || 0;
                    that.imgRotate(deg);
                    // player.pro.start();
                    that.pro.start()

                } else {
                    player.audioControl.pause();
                    that.controlList[2].className = '';
                    clearInterval(that.timer);
                    // player.pro.stop();
                    that.pro.stop();

                }
            })

            this.controlList[4].addEventListener('touchend', function () {
                that.list.slideOut();
            })


        },
        imgRotate(deg) {
            let that = this;
            clearInterval(this.timer)
            this.timer = setInterval(function () {
                deg = +deg + .3;
                that.record.style.transform = 'rotate(' + deg + 'deg)'
                that.record.dataset.rotate = deg;
            }, 1000 / 60)
        },

        listPlay() {
            let that = this;
            this.list = player.createDom(that.dataList, that.dom); //将生成的对象保存出来

            this.list.musicList.forEach((item, index) => {
                item.addEventListener('touchend', function () {
                    if (that.nowIndex == index) {
                        return;
                    }
                    that.list.changeSelect(index);
                    that.list.slideIn();
                    that.nowIndex = index;
                    that.controlList[2].className = 'play';
                    player.render(that.dataList[index])
                    player.audioControl.load(that.dataList[index].audioSrc);
                    player.audioControl.play();
                })
            })
        },

        process(){
            let that = this;
             var circle = player.pro.drag(document.querySelector('.press .dot'));
             circle.start=function(){
                player.audioControl.pause();
                that.pro.stop();
             }
             circle.move=function(pre){

                that.pro.update(pre,true)

             }
             circle.end=function(pre){

     

                var curTime=pre * that.dur;
// console.log(curTime)
                player.audioControl.playTo(curTime);
                player.audioControl.play();
                that.pro.start(pre,false);

                var deg=that.record.dataset.rotate || 0;
				that.imgRotate(deg);

				that.controlList[2].className='play';
             }

        }
        




    }
    let Player = new MusicPlayer(document.querySelector('.wrap'))
    Player.init();

})(window.Zepto, window.player)