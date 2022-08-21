/// <reference path="../../js/jquery.js" />
/// <reference path="../../js/base.js" />
var vm = null, _isMobile = false;
$(function () {
    Init();
});

function Init() {
    vm = new Vue({
        el: '#search',
        data: {
          input: '',
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value: '',
          hotList: [
            {
              name: '防疫政策',
              id: '1',
              index: '1',
              url: '//www.baidu.com/'
            },
            {
              name: '房贷利率',
              id: '2',
              index: '2'
            },
            {
              name: '毕业设计',
              id: '3',
              index: '3'
            },
            {
              name: '论文答辩',
              id: '4',
              index: '4'
            },
            {
              name: '大分子材料',
              id: '5',
              index: '5'
            },
            {
              name: '河南考生人数125万',
              id: '6',
              index: '6'
            },
            {
              name: '钢解构',
              id: '7',
              index: '7'
            },
            {
              name: '知识管理',
              id: '8',
              index: '8'
            },
            {
              name: '人工智能',
              id: '9',
              index: '9'
            },
            {
              name: '自然科学',
              id: '10',
              index: '10'
            },
          ],
          historyList: [
            {
              name: '防疫政策',
              id: '1',
              index: '1'
            },
            {
              name: '房贷利率',
              id: '2',
              index: '2'
            },
            {
              name: '毕业设计',
              id: '3',
              index: '3'
            },
            {
              name: '论文答辩',
              id: '4',
              index: '4'
            },
            {
              name: '大分子材料',
              id: '5',
              index: '5'
            },
            {
              name: '今年为何是最热一年',
              id: '6',
              index: '6'
            },
            {
              name: '钢解构',
              id: '7',
              index: '7'
            },
            {
              name: '知识管理',
              id: '8',
              index: '8'
            },
            {
              name: '人工智能',
              id: '9',
              index: '9'
            },
            {
              name: '自然科学',
              id: '10',
              index: '10'
            },
          ],

        }, methods: {
          handleClickUrl(item) {
            // window.open(item.href, '_blank')
            window.location.href = item.url
          }
        }, created: function () {
            $("#search").show();
        }
    });
}

