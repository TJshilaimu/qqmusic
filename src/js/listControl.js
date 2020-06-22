(function (root) {

    function createDom(dataList, wrap) {
        let musicList = []; //存储所有歌曲对应的DOM
        let div = document.createElement('div');
        let dl = document.createElement('dl');
        let dt = document.createElement('dt');
        let close = document.createElement('div');
        div.className = 'playList';
        wrap.appendChild(div)
        div.appendChild(dl);
        dt.innerHTML = "播放列表";
        dl.appendChild(dt);
        dataList.forEach((item, index) => {
            let dd = document.createElement('dd');
            dd.innerHTML = item.name;
            dd.onclick = function () {
                changeSelect(index);
            }
            dl.appendChild(dd);
            musicList.push(dd);
        })
        close.className = 'close';
        close.innerText = "关闭";

        // var disY=list.offsetHeight;
        // list.style.transform='translateY('+disY+'px)';
function slideIn(){
    div.style.transform = 'translateY(180vw)'
}

        close.addEventListener('touchend', function () {
            div.style.transform = 'translateY(180vw)'

        })
        div.appendChild(close);
        changeSelect(0);

        function changeSelect(index) {
            
            for(let i=0;i< musicList.length;i++){
                musicList[i].className='';
            }
            musicList[index].className='active';

        }
        function slideOut(){
            div.style.transform = 'translateY(0vw)'
        }

        return {
            dom: div,
            musicList:musicList,
            changeSelect:changeSelect,
            slideOut:slideOut,
            slideIn:slideIn
        }
    }

    root.createDom = createDom;

})(window.player)