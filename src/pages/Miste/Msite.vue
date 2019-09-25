<template>
  <section class="msite">
    <!--首页头部-->
    <header-top :title="address.name">
      <router-link
        slot="left"
        class="header_search"
        to="/search"
      >
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link
        slot="right"
        class="header_login"
        :to="userInfo._id ? 'userInfo' : '/login'"
      >
        <span class="header_login_text">登录|注册</span>
      </router-link>
    </header-top>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(categorys, index) in categorysArr"
            :key="index"
          >
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(category, index) in categorys"
              :key="index"
            >
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <shop-list></shop-list>
    </div>
  </section>
</template>
<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import ShopList from "../../components/ShopList/ShopList.vue";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import { mapState } from "vuex";

export default {
  data() {
    return {
      baseImageUrl: "http://fuss10.elemecdn.com"
    };
  },
  mounted() {
    // 发起请求，调用action
    this.$store.dispatch("getCategorys");
    this.$store.dispatch("getShops");
  },
  components: {
    HeaderTop,
    ShopList
  },
  computed: {
    ...mapState(["address", "categorys", "userInfo"]),

    // 根据categorys一维数组生成一个2维数组,小数组中的元素个数最大为8
    categorysArr() {
      const { categorys } = this;
      const arr = [];
      let minArr = [];
      // 遍历categorys
      categorys.forEach(element => {
        if (minArr.length === 8) {
          minArr = [];
        }
        if (minArr.length === 0) {
          arr.push(minArr);
        }
        minArr.push(element);
      });
      return arr;
    }
  },
  watch: {
    categorys(value) {
      // categorys有数据了，在异步更新界面之前执行
      // 创建一个Swiper实例对象，来实现轮播(创建时机在列表显示之后)
      // 使用setTimeout可以实现
      // 界面更新就立即创建swiper对象
      this.$nextTick(() => {
        // 一旦完成界面更新，就调用
        new Swiper(".swiper-container", {
          loop: true,
          pagination: {
            el: ".swiper-pagination"
          }
        });
      });
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../.././common/stylus/mixins.styl';

.msite {
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }
}
</style>
