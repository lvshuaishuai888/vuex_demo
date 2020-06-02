<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="getValue"/>
<!--    <a-input placeholder="请输入任务" class="my_ipt" v-model="defaultValue" @change="getValue"/>-->
    <a-button type="primary" @click="addItems">添加事项</a-button>

    <a-list bordered :dataSource="handleList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="checkItem(item.id)">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewIndex == 0 ? 'primary': 'default'" @click="changeBtn(0)">全部</a-button>
          <a-button :type="viewIndex == 1 ? 'primary': 'default'" @click="changeBtn(1)">未完成</a-button>
          <a-button :type="viewIndex == 2 ? 'primary': 'default'" @click="changeBtn(2)">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      defaultValue: ''
    }
  },
  created () {
    this.$store.dispatch('getList')
  },
  methods: {
    // 获取搜索框的值
    getValue (e) {
      this.$store.commit('bindCode', e.target.value)
    },
    // 添加一项
    addItems () {
      if (this.inputValue.trim().length < 1) {
        return this.$message.warning('不能为空')
      }
      this.$store.commit('addItem', this.inputValue)
    },
    // 删除
    removeItem (id) {
      this.$store.commit('deleteItem', id)
    },
    // 选中值
    checkItem (id) {
      this.$store.commit('chooseItem', id)
    },
    // 清空已完成
    clean () {
      this.$store.commit('cleanDone')
    },
    // 切换按钮
    changeBtn (flag) {
      this.$store.commit('changeStatus', flag)
    }
  },
  computed: {
    ...mapState(['inputValue', 'viewIndex']),
    ...mapGetters(['unDoneLength', 'handleList'])
  }
}
</script>

<style scoped>
  #app {
    padding: 10px;
  }

  .my_ipt {
    width: 500px;
    margin-right: 10px;
  }

  .dt_list {
    width: 600px;
    margin: 10px auto;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
