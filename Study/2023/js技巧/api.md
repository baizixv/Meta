<a name="h2fu2"></a>
## 浏览器
<a name="k3ugo"></a>
### 实现全屏
当你需要将当前屏幕显示为全屏
```javascript
function fullScreen() {  
  const el = document.documentElement
  const rfs = 
    el.requestFullScreen || 
    el.webkitRequestFullScreen || 
    el.mozRequestFullScreen || 
    el.msRequestFullscreen
  if(typeof rfs != "undefined" && rfs) {
    rfs.call(el)
  }
}
fullScreen()
复制代码
```
<a name="kPI0M"></a>
### 退出全屏
当你需要退出全屏
```javascript
function exitScreen() {
    if (document.exitFullscreen) { 
        document.exitFullscreen()
    } 
    else if (document.mozCancelFullScreen) { 
        document.mozCancelFullScreen()
    } 
    else if (document.webkitCancelFullScreen) { 
        document.webkitCancelFullScreen()
    } 
    else if (document.msExitFullscreen) { 
        document.msExitFullscreen()
    } 
    if(typeof cfs != "undefined" && cfs) {
        cfs.call(el)
    }
}
exitScreen()
```
<a name="Doji1"></a>
### 页面打印
当你需要将当前页面打印出来
```javascript
window.print()
```
<a name="ckvjv"></a>
### 打印内容样式更改
当你需要将当前页面打印出来，但是需要修改一下当前排版
```javascript
<style>
/* 使用@media print可以调整你需要的打印样式 */
@media print {
    .noprint {
        display: none;
    }
}
</style>
<div class="print">print</div>
<div class="noprint">noprint</div>
```
<a name="GK0Zs"></a>
### 阻止关闭事件
当你需要防止用户刷新或者关闭浏览器，你可以选择触发beforeunload事件，部分浏览器不能自定义文本内容
```javascript
window.onbeforeunload = function(){
    return '您确定要离开haorooms博客吗？';
};
```
<a name="ZnzWS"></a>
### 屏幕录制
当你需要将录制当前屏幕，并将录屏上传或下载
```javascript
const streamPromise = navigator.mediaDevices.getDisplayMedia()
streamPromise.then(stream => {
    var recordedChunks = [];// 录制的视频数据

    var options = { mimeType: "video/webm; codecs=vp9" };// 设置编码格式
    var mediaRecorder = new MediaRecorder(stream, options);// 初始化MediaRecorder实例

    mediaRecorder.ondataavailable = handleDataAvailable;// 设置数据可用（录屏结束）时的回调
    mediaRecorder.start();

    // 视频碎片合并
    function handleDataAvailable(event) {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);// 添加数据，event.data是一个BLOB对象
            download();// 封装成BLOB对象并下载
        }
    }

    // 文件下载
    function download() {
        var blob = new Blob(recordedChunks, {
            type: "video/webm"
        });
        // 此处可将视频上传到后端
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "test.webm";
        a.click();
        window.URL.revokeObjectURL(url);
    }
})
```
<a name="cQ9f9"></a>
### 判断横竖屏
当你需要对手机进行横屏或者竖屏的状态判断
```javascript
function hengshuping(){
    if(window.orientation==180||window.orientation==0){
        alert("竖屏状态！")
    }
    if(window.orientation==90||window.orientation==-90){
        alert("横屏状态！")
    }
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
```
<a name="baK1X"></a>
### 横竖屏样式变更
当你需要在横屏和竖屏的时候设置不同的样式时
```javascript
<style>
@media all and (orientation : landscape) {
    body {
        background-color: #ff0000;
    }
}

@media all and (orientation : portrait) {
    body {
        background-color: #00ff00;
    }
}
</style>
```
<a name="FUI8w"></a>
### 标签页显隐
当你需要对标签页显示隐藏进行事件监听时
```javascript
const {hidden, visibilityChange} = (() => {
    let hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
      // Opera 12.10 and Firefox 18 and later support
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }
    return {
      hidden,
      visibilityChange
    }
})();

const handleVisibilityChange = () => {
    console.log("当前被隐藏", document[hidden]);
};

document.addEventListener(
    visibilityChange,
    handleVisibilityChange,
    false
);
```
<a name="YJmvz"></a>
## 图片
<a name="AEYOY"></a>
### 本地图片预览
当你从客户端获取到一张图片但不能立刻上传到服务器，却需要预览的时候
```javascript
<div class="test">
    <input type="file" name="" id="">
    <img src="" alt="">
</div>
<script>
const getObjectURL = (file) => {
    let url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // webkit or chrome
        url = window.URL.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    }
    return url;
}
document.querySelector('input').addEventListener('change', (event) => {
    document.querySelector('img').src = getObjectURL(event.target.files[0])
})
</script>
```
<a name="jquOC"></a>
### 图片预加载
当你有大量图片的时候，你需要将图片进行预加载以免出现白屏的情况
```javascript
const images = []
function preloader(args) {
    for (let i = 0, len = args.length; i < len; i++) {  
        images[i] = new Image()  
        images[i].src = args[i]
    } 
}  

preloader(['1.png', '2.jpg'])
```
<a name="F1LT4"></a>
## js
<a name="RiwY8"></a>
### 字符串脚本化
当你需要将一串字符串转换成一个js脚本，该方法有xss漏洞，慎用
```javascript
const obj = eval('({ name: "jack" })')
// obj会被转换为对象{ name: "jack" }
const v = eval('obj')
// v会变成obj这个变量
```
<a name="Vkgku"></a>
### 递归函数名解耦
当你需要写一个递归函数的时候，你声明了一个函数名，但是每次修改函数名的时候总会忘记修改内部的函数名。argument为函数内部对象，包含传入函数的所有参数，arguments.callee代表函数名。
```javascript
// 这是一个最基础的斐波那契数列
function fibonacci (n) {
    const fn = arguments.callee
    if (n <= 1) return 1
    return fn(n - 1) + fn(n - 2)
}
```
<a name="vq13X"></a>
## DOM元素
<a name="KcA0v"></a>
### 隐显判断
当你需要对一个dom元素进行判断当前是否出现在页面视图内，你可以尝试用IntersectionObserver进行判断
```javascript
<style>
.item {
    height: 350px;
}
</style>

<div class="container">
  <div class="item" data-id="1">不可见</div>
  <div class="item" data-id="2">不可见</div>
  <div class="item" data-id="3">不可见</div>
</div>

<script>
  if (window?.IntersectionObserver) {
    let items = [...document.getElementsByClassName("item")]; // 解析为真数组，也可用 Array.prototype.slice.call()

    let io = new IntersectionObserver(
      (entries) => {
        entries.forEach((item) => {
          item.target.innerHTML =
            item.intersectionRatio === 1 // 元素显示比例，为1时完全可见，为0时完全不可见
              ? `元素完全可见`
              : `元素部分不可见`;
        });
      },
      {
        root: null,
        rootMargin: "0px 0px",
        threshold: 1, // 阀值设为1，当只有比例达到1时才触发回调函数
      }
    );

    items.forEach((item) => io.observe(item));
  }
</script>
```
<a name="MYkAh"></a>
### 元素可编辑
当你需要在某个dom元素进行编辑，让它点击的时候就像一个textarea
```javascript
<div contenteditable="true">这里是可编辑的内容</div>
```
<a name="qHal7"></a>
### 元素属性监听
```javascript
<div id="test">test</div>
<button onclick="handleClick()">OK</button>

<script>
  const el = document.getElementById("test");
  let n = 1;
  const observe = new MutationObserver((mutations) => {
    console.log("属性发生变化了", mutations);
  })
  observe.observe(el, {
    attributes: true
  });

  function handleClick() {
    el.setAttribute("style", "color: red");
    el.setAttribute("data-name", n++);
  }

  setTimeout(() => {
    observe.disconnect(); // 停止监听
  }, 5000);
</script>
```
<a name="AcurQ"></a>
### 打印dom元素
当你需要在开发过程中打印dom元素时，使用console.log往往只会打印出整个dom元素，而无法查看该dom元素的内部属性。你可以尝试使用console.dir
```javascript
console.dir(document.body)
```
<a name="DWsno"></a>
## 其他
<a name="Oq4Ai"></a>
### 激活应用
当你在移动端开发时，需要打开其他应用。以下方法也可以通过location.href赋值操作
```javascript
  <a href="tel:12345678910">电话</a>

  <a href="sms:12345678910,12345678911?body=你好">android短信</a> 
  <a href="sms:/open?addresses=12345678910,12345678911&body=你好">ios短信</a>
  
  <a href="wx://">ios短信</a>
```
