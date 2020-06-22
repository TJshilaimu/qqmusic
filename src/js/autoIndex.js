(function (root) {
    function Index(total) {
        this.now = 0;
        this.total = total;

    }
    Index.prototype = {
        // prev
        prev() {
            return this.getIndex(-1);
        },
        // 下一个
        next() {
            return this.getIndex(1);
        },
        // 计算值
        getIndex(num) {
          this.now=(this.now + num + this.total) % this.total;
            return this.now
        }
    }

    root.autoIndex =Index;

})(window.player)