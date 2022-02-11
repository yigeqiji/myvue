<template>
  <div class="pagination" :class="{' pagination-vertical' : mode ==='vertical'}">
    <div :disabled="current === 1" class="btn-prev cursor-pointer" @click="prevPage">
<!--      <p class="prev-btn-icon">&lt;</p>-->
      <p class="prev-btn-text">上一页</p>
    </div>
    <ul class="pager">
      <li
          v-for="(page, index) in pageList"
          :key="index"
          class="cursor-pointer"
          :class="{
                    active: page === current && typeof page !== 'string',
                    'more btn-quickprev': page === 'prev',
                    'more btn-quicknext': page === 'next'
                    }"
          @click="pagerClick(page)"
      >{{typeof page === 'number' ? page + suffix : '•••'}}</li>
    </ul>
    <div :disabled="current === total" class="btn-next cursor-pointer" @click="nextPage">
      <p class="next-btn-text">下一页</p>
<!--      <p class="next-btn-icon">&gt;</p>-->
    </div>
    <span class="go-page" v-if="showJumper && mode ==='horizontal'">
            前往&thinsp;
            <input
                ref="goPageInput"
                type="text"
                v-model="goPageNum"
                @keyup.enter="goPage($refs.goPageInput.value*1)"
                @blur="goPage($refs.goPageInput.value*1)"
            />&thinsp;页
        </span>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    //总页数
    total: {
      type: Number,
      default: 30
    },
    //当前页
    currentPage: {
      type: Number,
      default: 1
    },
    //页码显示数量
    pagerCount: {
      type: Number,
      default: 7
    },
    //展示模式横向或竖向
    mode: {
      type: String,
      default: 'horizontal'
    },
    //分页跳转
    showJumper: {
      type: Boolean,
      default: false
    },
    //分页码后缀
    suffix: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      current: 1,
      pageList: [] //分页列表
    };
  },
  computed:{
    goPageNum(){
      if (this.pageList[9]&&typeof this.pageList[9] === 'number'){
        return this.pageList[9]+1
      }else if(this.pageList[8]&&typeof this.pageList[8] === 'number'){
        return this.pageList[8]+1
      }else{
        return 1
      }
    }
  },
  watch: {
    total(v) {
      this.total=v
      this.pageList =this.getPageList(this.current);
    },
    currentPage(val) {
      this.current = val;
    },
    pagerCount() {
      this.pageList =this.getPageList(this.current);
    },
    current(val, old) {
      this.pageList = this.getPageList(val);
      this.$emit('current-change', val, old);
    }
  },
  mounted() {
      this.current = this.currentPage;
      this.pageList = this.getPageList(this.current);

  },
  methods: {
    getPageList(current) {
      let { total, pagerCount } = this;

      let pageList = [];
      //如果总页数在可显示页码数量以内，全部显示
      if (pagerCount > total - 1) {
        for (let i = 1; i <= total; i++) {
          pageList.push(i);
        }
      } else {
        //如果总页数超过可显示页码数量，根据不同情况显示

        //当前页能连到开始
        if (current < pagerCount - 1) {
          for (let i = 1; i < pagerCount; i++) {
            pageList.push(i);
          }
          pageList.push('next');
          pageList.push(total);
        } else {
          //当前页能连到结束
          if (current >= total - 1 - Math.floor(pagerCount / 2)) {
            pageList.push(1);
            pageList.push('prev');
            for (
                let i = total - (pagerCount - 2);
                i <= total;
                i++
            ) {
              pageList.push(i);
            }
          } else {
            //当前页不能连到结束
            pageList.push(1);
            pageList.push('prev');

            for (
                let i = current - Math.floor((pagerCount - 2) / 2);
                i <=
                current + (Math.ceil((pagerCount - 2) / 2) - 1);
                i++
            ) {
              pageList.push(i);
            }

            pageList.push('next');
            pageList.push(total);
          }
        }
      }
      return pageList;
    },
    /**
     * 上一页
     */
    prevPage() {
      if (this.current > 1) {
        this.current--;

        this.$emit('prev-click', this.current);
      }
    },
    /**
     * 下一页
     */
    nextPage() {
      if (this.current < this.total) {
        this.current++;
        this.$emit('next-click', this.current);
      }
    },
    /**
     * 分页点击
     * @param {Number} page 目标页面
     */
    pagerClick(page) {
      if (typeof page === 'number') {
        this.current = page;
        this.$emit('page-click', page);
      } else {
        let quickPage = 1;
        if (page === 'prev') {
          quickPage = this.current - (this.pagerCount - 2);
          quickPage < 1 && (quickPage = 1);
        }

        if (page === 'next') {
          quickPage = this.current + (this.pagerCount - 2);
          quickPage > this.total && (quickPage = this.total);
        }
        this.current = quickPage;

        this.$emit(`${page}-quick-click`, this.current);
      }
    },
    /**
     * 跳转页
     * @param {Number} page 目标页面
     */
    goPage(page) {
      this.current = page < 1 ? 1 : page > this.total ? this.total : page;
      this.$refs.goPageInput.value = this.current;

      this.$emit('jumpe', page);
    }
  }
};
</script>

<style lang="scss" scoped>

.pagination {
  &,
  & * {
    box-sizing: border-box;
  }
  display: flex;

  .pager {
    display: flex;
    margin: 0;
    padding: 0;
    height:2rem;
    li {
      list-style: none;
      color: #606266;
      &:not(.disabled).active {
        color: #fff;
        background-color: $pageSelectColor;
        pointer-events: none;
        cursor: none;
      }
      &:hover {
        color: $pageSelectColor;
        opacity:0.8;
      }
    }
    .more {
      color: #999;
    }
  }

  .pager li,
  .btn-next,
  .btn-prev {
      display: flex;
      align-items: center;
      justify-content: center;
      background: $buttonBgColor;
      border-radius: 0.5rem;
    color:white;
  }
  .prev-btn-icon,.next-btn-icon{
    font-size:1rem;
  }
  .prev-btn-icon{
    margin-right:0.5rem;
  }
  .next-btn-icon{
    margin-left:0.5rem;
  }
  .pager li{
    padding:0 1rem;
    border-radius: 0.2rem;
  }
  .pager li:not(:first-child){
    margin-left:0.5rem;
  }
  .btn-prev,.btn-next{
    padding:0 1rem;
  }
  .btn-prev:hover{
    opacity:0.8;
  }
  .btn-next:hover{
    opacity:0.8;
  }
  .btn-prev{
    margin-right:1rem;
  }
  .btn-next{
    margin-left:1rem;
  }

  .go-page {
    margin-left:1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color:white;
    font-weight: 900;
    input {
      width:3rem;
      margin:0 0.5rem;
      border: 2px solid $buttonBgColor;
      border-radius: 4px;
      color: white;
      text-align: center;
      background: $buttonBgColor;

      &:focus {
        outline: none;
      }
    }
  }
}

.pagination-vertical {
  flex-direction: column-reverse;

  .pager {
    flex-direction: column-reverse;
  }

}
</style>

