// 渲染模块，用于加载背景图、歌曲信息、是否喜欢
(function(root){

    // 背景图
    function bg(url){
        root.blurImg(url)
        let img = document.querySelector('.imgInfo img')
        img.src=url
    }

    // 歌曲
    function song(data){
let list = document.querySelector('.singerInfo').children;
        list[0].innerHTML = data.name;
        list[1].innerHTML = data.album;
        list[2].innerHTML = data.singer;
    }

    // 是否喜欢
    function isLike(flag){
        let like = document.querySelectorAll('.control li');
        like[0].className =flag? 'liking' : ''; 

    }

    root.render = function(data){
        bg(data.image);
        song(data);
        isLike(data.isLike);
    }

})(window.player || (window.player ={}))