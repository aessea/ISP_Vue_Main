<template>
  <div>
    <el-row style="">
      <el-col :span="8">
        <el-card class="quick-action">
          <div slot="header" class="clearfix">
            <span>{{ $t('DashboardPage.QuickActions') }}</span>
          </div>
          <el-row>
            <el-col :span="12">
              <div @click="toCompute">
                <el-card shadow="hover" class="btn-card">
                  <span class="btn-icon"><i class="el-icon-monitor" /></span>
                  <span style="margin-left: 10px;">{{ $t('route.SchedulePanel') }}</span>
                </el-card>
              </div>
            </el-col>
            <el-col :span="12">
              <div @click="toAnalysis">
                <el-card shadow="hover" class="btn-card">
                  <span class="btn-icon"><i class="el-icon-monitor" /></span>
                  <span style="margin-left: 10px;">{{ $t('route.AnalysisControl') }}</span>
                </el-card>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div @click="toParamsConfig">
                <el-card shadow="hover" class="btn-card">
                  <span class="btn-icon"><i class="el-icon-setting" /></span>
                  <span style="margin-left: 10px;">{{ $t('route.ParamsConfig') }}</span>
                </el-card>
              </div>
            </el-col>
            <el-col :span="12">
              <div @click="toLineConfig">
                <el-card shadow="hover" class="btn-card">
                  <span class="btn-icon"><i class="el-icon-setting" /></span>
                  <span style="margin-left: 10px;">{{ $t('route.LineData') }}</span>
                </el-card>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div @click="toLoggingdb">
                <el-card shadow="hover" class="btn-card">
                  <span class="btn-icon"><i class="el-icon-document" /></span>
                  <span style="margin-left: 10px;">{{ $t('route.HistoryRun') }}</span>
                </el-card>
              </div>
            </el-col>
            <el-col :span="12">
              <div @click="toHistory">
                <el-card shadow="hover" class="btn-card">
                  <span class="btn-icon"><i class="el-icon-document" /></span>
                  <span style="margin-left: 10px;">{{ $t('route.HistoryOpera') }}</span>
                </el-card>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div @click="toBlockTimeData">
                <el-card shadow="hover" class="btn-card">
                  <span class="btn-icon"><i class="el-icon-s-data" /></span>
                  <span style="margin-left: 10px;">{{ $t('route.BlockTimeData') }}</span>
                </el-card>
              </div>
            </el-col>
            <el-col :span="12">
              <div @click="toProcessData">
                <el-card shadow="hover" class="btn-card">
                  <span class="btn-icon"><i class="el-icon-monitor" /></span>
                  <span style="margin-left: 10px;">{{ $t('route.ProcessData') }}</span>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="calendar-card">
          <el-calendar v-model="value">
            <template slot="dateCell" slot-scope="{data}">
              {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : '' }}
              <div v-for="item in calendarData" :key="item.id" style="width:100%;">
                <el-tag v-if="item.date === data.day && item.isYuPai === true" type="success">{{ $t('FileKeyWord.PrepSchedule') }}√</el-tag>
                <el-tag v-if="item.date === data.day && item.isZhengPai === true" type="success">{{ $t('FileKeyWord.DulySchedule') }}√</el-tag>
                <el-tag v-if="item.date === data.day && item.isHoliday === true">{{ $t('FileKeyWord.Holiday') }}</el-tag>
              </div>
            </template>
          </el-calendar>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-card style="margin: 16px;">
      <div slot="header" class="clearfix">
        <span>历史排程数据变化趋势图</span>
        <el-dropdown style="float: right; padding: 3px 0" @command="handleCommand">
          <span class="el-dropdown-link">
            <span v-if="command === '3'">近三天</span>
            <span v-else-if="command === '7' ">近七天</span>
            <span v-else-if="command === '15'">近十五天</span>
            <span v-else>选择结果</span>
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="3">近三天</el-dropdown-item>
            <el-dropdown-item command="7">近七天</el-dropdown-item>
            <el-dropdown-item command="15">近十五天</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div id="scheduleCharts" style="width: 100%; height: 420px" />
    </el-card> -->
  </div>
</template>
<script>
import * as echarts from 'echarts'
import { GetChartsData, GetCalendarData } from '@/api/Dashboard'
export default {
  name: 'Dashboard',
  data() {
    return {
      date_list: [],
      obj_value_list: [],
      overdue_value_list: [],
      idle_value_list: [],
      line_balance_list: [],
      group_count_list: [],
      run_time_list: [],
      value: new Date(),
      calendarData: [],
      command: '7'
    }
  },
  created() {
    // this.getChartsData()
    this.getCalendarData()
  },
  mounted() {
    // this.drawCharts(7)
  },
  methods: {
    // 一些快捷路由跳转
    toCompute() {
      this.$router.push({ path: 'control/schedulepanel' })
    },
    toAnalysis() {
      this.$router.push({ path: 'control/analysiscontrol' })
    },
    toLoggingdb() {
      this.$router.push({ path: 'historylog/historyrun' })
    },
    toHistory() {
      this.$router.push({ path: 'historylog/historyopera' })
    },
    toParamsConfig() {
      this.$router.push({ path: 'control/paramsconfig' })
    },
    toLineConfig() {
      this.$router.push({ path: 'longconfig/linedata' })
    },
    toBlockTimeData() {
      this.$router.push({ path: 'dayconfig/blocktimetata' })
    },
    toProcessData() {
      this.$router.push({ path: 'longconfig/mainprocessdata' })
    },
    // 画图
    drawCharts(days) {
      this.getChartsData(days)
      // 等待2秒获取数据
      setTimeout(() => {
        this.initScheduleEcharts()
      }, 1000)
    },
    handleCommand(command) {
      this.command = command
      echarts.init(document.getElementById('scheduleCharts')).dispose() // 销毁实例
      this.drawCharts(parseInt(command))
    },
    getChartsData(days) {
      GetChartsData(days).then(res => {
        if (res.code === 20000) {
          this.date_list = res.date_list
          this.obj_value_list = res.obj_value_list
          this.overdue_value_list = res.overdue_value_list
          this.idle_value_list = res.idle_value_list
          this.line_balance_list = res.line_balance_list
          this.group_count_list = res.group_count_list
          this.run_time_list = res.run_time_list
        }
      })
    },
    getCalendarData() {
      GetCalendarData().then(res => {
        if (res.code === 20000) {
          this.calendarData = res.calendar_data
        }
      })
    },
    initScheduleEcharts() {
      var app = {}

      var chartDom = document.getElementById('scheduleCharts')
      var myChart = echarts.init(chartDom)
      var option

      const posList = [
        'left',
        'right',
        'top',
        'bottom',
        'inside',
        'insideTop',
        'insideLeft',
        'insideRight',
        'insideBottom',
        'insideTopLeft',
        'insideTopRight',
        'insideBottomLeft',
        'insideBottomRight'
      ]
      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right'
          }
        },
        verticalAlign: {
          options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
          }
        },
        position: {
          options: posList.reduce(function(map, pos) {
            map[pos] = pos
            return map
          }, {})
        },
        distance: {
          min: 0,
          max: 100
        }
      }
      app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function() {
          const labelOption = {
            rotate: app.config.rotate,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            position: app.config.position,
            distance: app.config.distance
          }
          myChart.setOption({
            series: [
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              }
            ]
          })
        }
      }
      const labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 12,
        rich: {
          name: {}
        }
      }
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['逾期', '停顿', '线平衡', '分组数', '运行时长']
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: this.date_list // 日期
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '逾期',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: this.overdue_value_list
          },
          {
            name: '停顿',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: this.idle_value_list
          },
          {
            name: '线平衡',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: this.line_balance_list
          },
          {
            name: '分组数',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: this.group_count_list
          },
          {
            name: '运行时长',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: this.run_time_list
          }
        ]
      }
      option && myChart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
<style >
#scheduleCharts{
  margin-top: 10px;
}
.quick-action{
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  height: 500px;
}
.calendar-card{
  margin-top: 16px;
  margin-right: 16px;
  height: 500px;
}
.calendar-card .el-card__body{
    padding: 0px;
}
.el-calendar-table .el-calendar-day{
  height: 60px;
}
.btn-card{
  user-select: none;
}
.btn-icon{
  font-size: 22px;
}
.btn-card :hover{
  color:#02bafd;
}
.btn-card .el-card__body{
    padding: 20px;
}
</style>
