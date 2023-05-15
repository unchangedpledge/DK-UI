// 获取需要的元素
var wrap = document.getElementsByClassName('wrap')[0]
var items = document.getElementsByClassName('item')
var goPreBtn = document.getElementsByClassName('goPre')[0]
var goNextBtn = document.getElementsByClassName('goNext')[0]
var trigger = document.getElementsByClassName('trigger')[0]

var index = 0 //作为当前元素的下标索引值

//动态生成导航圆点
for(var i = 0; i < items.length; i++) {
    var li = document.createElement("li")
    li.className = 'point'
    li.index = i //添加索引，代表该圆点对应的是哪一张图片
    li.addEventListener('click', function () {
        index = this.index
        goIndex()
    })
    trigger.appendChild(li)
}

var points = document.querySelectorAll('.point')
var clearCurrent = function () {
    for (var i = 0; i < items.length; i++) {
        items[i].className = "item"
        points[i].className = "point"
    }
}
var goIndex = function () {
    clearCurrent()
    items[index].className = "item current"
    points[index].className = "point current"
}
var goNext = function () {
    if(index == items.length - 1) { //到最后一张图时将索引切换为0，也就是指向第一张图
        index = 0
    }else {
        index++
    }
    goIndex()
}
var goPre = function () {
    if(index == 0) {
        index = items.length - 1
    }else {
        index--
    }
    goIndex()
}
goNextBtn.addEventListener('click', function () {
    goNext()
})
goPreBtn.addEventListener('click', function () {
    goPre()
})
var time = 100
var count = 0
function auto() {
    return setInterval(function() {
        if(count == 50) {
            goNext()
            count = 0
        }
        count++
    }, time)
}
var timer = auto()
wrap.addEventListener('mouseenter', function () {
    clearInterval(timer)
    timer = null
})
wrap.addEventListener('mouseleave', function () {
    count = 0
    timer = auto()
})
goIndex()