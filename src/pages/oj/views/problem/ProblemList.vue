<template>
  <Row
    type="flex"
    :gutter="18"
  >
    <Col :span=19>
    <Panel
      shadow
      style="min-width:900px;"
    >
      <div slot="title">{{$t('m.Problem_List')}}</div>
      <div slot="extra">
        <ul class="filter">
          <li>
            <Dropdown @on-click="filterByDifficulty">
              <span>{{query.difficulty === '' ? this.$i18n.t('m.Difficulty') : this.$i18n.t('m.' + query.difficulty)}}
                <Icon type="arrow-down-b"></Icon>
              </span>
              <Dropdown-menu slot="list">
                <Dropdown-item name="">{{$t('m.All')}}</Dropdown-item>
                <Dropdown-item name="Low">{{$t('m.Low')}}</Dropdown-item>
                <Dropdown-item name="Mid">{{$t('m.Mid')}}</Dropdown-item>
                <Dropdown-item name="High">{{$t('m.High')}}</Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
          </li>
          <li>
            <i-switch
              size="large"
              v-model="tagVisible"
            >
              <span slot="open">{{$t('m.Tags')}}</span>
              <span slot="close">{{$t('m.Tags')}}</span>
            </i-switch>
          </li>
          <li>
            <Input
              v-model="query.keyword"
              @on-enter="filterByKeyword"
              @on-click="filterByKeyword"
              placeholder="搜索关键词"
              icon="ios-search-strong"
            />
          </li>

          <li>
            <Button
              type="info"
              @click="pickone"
            >
              <Icon type="refresh"></Icon>
              随机选题
            </Button>
          </li>

          <li>
            <span>排序方式:</span>
            <el-select
              v-model="selectHowToShow"
              placeholder="请选择排序方式"
              size="small"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </li>

        </ul>
      </div>

      <el-table
        @row-click='pushProblemDetail'
        :data="problemList"
        style="width: 100%"
      >
        <el-table-column
          v-if="isAuthenticated"
          label="状态"
          width="50"
        >
          <template v-slot='scope'>
            <Icon
              v-if="scope.row.my_status === null || scope.row.my_status === undefined?false:true"
              :type="scope.row.my_status === 0 ? 'checkmark-round' : 'minus-round'"
              :color="scope.row.my_status === 0 ? '#19be6b' : '#ed3f14'"
              size='16'
            >
            </Icon>
          </template>
        </el-table-column>
        <el-table-column
          prop="_id"
          label="ID"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="title"
          label="题目"
        >
        </el-table-column>
        <el-table-column
          prop="difficulty"
          label="难度"
          width="150"
        >
          <template v-slot='scope'>
            <Tag
              :color="getColor(scope.row.difficulty)"
              style='width:30px'
              disable-transitions
            >{{$t('m.'+scope.row.difficulty)}}</Tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="submission_number"
          label="提交数"
          width="125"
        >
        </el-table-column>
        <el-table-column
          label="通过率"
          width="225"
        >
          <template v-slot='scope'>
            <el-progress
              v-if="scope.row.submission_number>=10"
              stroke-width='15px'
              :percentage='getACRate(scope.row)'
              :color="getColor(getACRate(scope.row))"
              style="width:100%"
            ></el-progress>
            <el-tag
              size="small"
              type="info"
              v-else
            >提交数不足，快来试试吧！</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="tagVisible"
          label="标签"
        >
          <template v-slot='scope'>
            <template v-for="tag in scope.row.tags">
              <el-tag style="padding: 2px; margin:4px 4px;">{{tag}}</el-tag>
            </template>
          </template>
        </el-table-column>

      </el-table>
    </Panel>
    <Pagination
      :total="total"
      :page-size="limit"
      @on-change="pushRouter"
      :current.sync="query.page"
    ></Pagination>

    </Col>

    <Col :span="5">
    <Panel :padding="10">
      <div
        slot="title"
        class="taglist-title"
      >{{$t('m.Tags')+"筛选"}}</div>
      <template v-for="tag in tagList">
        <Button
          v-if="query.tag===tag.name"
          :key="tag.name"
          @click="disableTag(tag)"
          type="info"
          shape="circle"
          class="tag-btn"
        >
          <Font
            color="white"
            v-if="tag.name == query.tag"
          >{{tag.name}}</Font>
        </Button>
        <Button
          v-else
          :key="tag.name"
          @click="disableTag(tag)"
          type="ghost"
          shape="circle"
          class="tag-btn"
        >
          <Font
            color="red"
            v-if="tag.name == query.tag"
          >{{tag.name}}</Font>
          <Font
            color="black"
            v-else
          >{{tag.name}}</Font>
        </Button>
      </template>
      <Button
        long
        id="pick-one"
        @click="onReset"
      >
        <Icon type="refresh"></Icon>
        重置标签
      </Button>
    </Panel>
    <Spin
      v-if="loadings.tag"
      fix
      size="large"
    ></Spin>
    </Col>
  </Row>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import api from '@oj/api'
import utils from '@/utils/utils'
import {
  ProblemMixin
} from '@oj/components/mixins'
import Pagination from '@oj/components/Pagination'

export default {
  name: 'ProblemList',
  mixins: [ProblemMixin],
  components: {
    Pagination
  },
  data () {
    return {
      selectHowToShow: 'old',
      tagList: [],
      options: [{
        value: 'old',
        label: '时间从旧到新'
      },
      {
        value: 'new',
        label: '时间从新到旧'
      },
      {
        value: 'correct',
        label: '正确率从高到低'
      },
      {
        value: 'wrong',
        label: '正确率从低到高'
      }
      ],
      problemList: [],
      limit: 20,
      total: 0,
      tagVisible: false,
      loadings: {
        tag: true
      },
      routeName: '',
      query: {
        keyword: '',
        difficulty: '',
        tag: '',
        page: 1
      }
    }
  },
  mounted () {
    this.init()
    this.getTagList()
  },
  methods: {
    init (simulate = false) {
      this.routeName = this.$route.name
      let query = this.$route.query
      this.query.difficulty = query.difficulty || ''
      this.query.keyword = query.keyword || ''
      this.query.tag = query.tag || ''
      this.query.page = parseInt(query.page) || 1
      if (this.query.page < 1) {
        this.query.page = 1
      }
      if (!simulate) {
        this.getTagList()
      }
      this.getProblemList()
    },
    getACRate (row) {
      return (row.accepted_number / row.submission_number * 100).toFixed(0)
    },
    getColor (description) {
      let color = 'orange'
      if (description === 'Low' || description > 45) color = 'LightGreen'
      else if (description === 'High' || description < 25) color = 'red'
      return color
    },
    pushRouter () {
      this.$router.push({
        name: 'problem-list',
        query: utils.filterEmptyValue(this.query)
      })
    },
    pushProblemDetail (row) {
      this.$router.push({
        name: 'problem-details',
        params: {
          problemID: row._id
        }
      })
    },
    getProblemList () {
      let offset = (this.query.page - 1) * this.limit
      var isReserved = false
      var sortByAC = false
      if (this.selectHowToShow === 'new') {
        isReserved = true
        sortByAC = false
      } else if (this.selectHowToShow === 'correct') {
        isReserved = true
        sortByAC = true
      } else if (this.selectHowToShow === 'wrong') {
        isReserved = false
        sortByAC = true
      }
      api.getProblemList(offset, this.limit, isReserved, sortByAC, this.query).then(res => {
        this.problemList = res.data.data.results
        this.total = res.data.data.total
      })
    },
    disableTag (tag) {
      if (this.query.tag === tag.name) {
        this.$router.push({
          name: 'problem-list'
        })
      } else {
        this.filterByTag(tag.name)
      }
    },
    getTagList () {
      api.getProblemTagList().then(res => {
        this.tagList = res.data.data
        this.loadings.tag = false
      }, res => {
        this.loadings.tag = false
      })
    },
    filterByTag (tagName) {
      this.query.tag = tagName
      this.query.page = 1
      this.pushRouter()
    },
    filterByDifficulty (difficulty) {
      this.query.difficulty = difficulty
      this.query.page = 1
      this.pushRouter()
    },
    filterByKeyword () {
      this.query.page = 1
      this.pushRouter()
    },
    onReset () {
      this.disabledTagList = []
      this.getTagList()
      this.isDisabled = false
      this.$router.push({
        name: 'problem-list'
      })
    },
    pickone () {
      api.pickone().then(res => {
        this.$success('Good Luck')
        this.$router.push({
          name: 'problem-details',
          params: {
            problemID: res.data.data
          }
        })
      })
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  watch: {
    '$route' (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.init(true)
      }
    },
    'isAuthenticated' (newVal) {
      if (newVal === true) {
        this.init()
      }
    },
    selectHowToShow (newVal) {
      this.getProblemList()
    }
  }
}
</script>

<style lang="less" scoped>
.taglist-title {
  margin-left: -10px;
  margin-bottom: -10px;
}

.tag-btn {
  margin-right: 5px;
  margin-bottom: 10px;
}

#pick-one {
  margin-top: 10px;
}
</style>
<!--a-->
