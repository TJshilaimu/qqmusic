(function (root) {
    function MyAudio() {
        this.audio = new Audio();
        this.status = 'pause';
        this.ended=null;
    }
    MyAudio.prototype = {
        play() {
            this.audio.play();
            this.status = 'play';
        },
        pause() {
            this.audio.pause();
            this.status = 'pause';
        },
        load(url) {
            this.audio.src = url;
            this.audio.load();
        },
        playTo(time){
            this.audio.currentTime=time;
        },
        duration(){
            return this.audio.duration;
        },
        current(){
            return this.audio.currentTime;
        }
    }
    root.audioControl = new MyAudio();

})(window.player)