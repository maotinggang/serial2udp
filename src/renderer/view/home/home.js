import { mapState, mapActions } from 'vuex'
import { EventBus } from '@/lib/event'

export default {
  name: 'home',
  data() {
    return {
      comSelected: '',
      baudRate: 115200,
      packageTime: 100,
      hostIp: '192.168.99.116',
      hostPort: 8080,
      serverIp: '47.92.151.105',
      serverPort: 8000,
      checkedDisplay: ['hex']
    }
  },
  created() {
    // 监听错误事件
    EventBus.$on('message-box', value => {
      this.$Message.warning({
        content: value,
        duration: 5
      })
    })
    // 监听窗口尺寸变化
    window.onresize = () => {
      this.actionWindowSize({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }
    window.onload = () => {
      this.actionWindowSize({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }
  },
  computed: {
    ...mapState('home', [
      'comNumber',
      'windowSize',
      'serialState',
      'serialIsDisabled',
      'netState',
      'netIsDisabled',
      'displayState',
      'infos'
    ])
  },
  methods: {
    ...mapActions('home', [
      'actionCheckedChange',
      'actionDisplayPause',
      'actionDisplayClear',
      'actionWindowSize',
      'actionSerial',
      'actionNet'
    ]),
    handleSerial() {
      if (!this.comSelected || !this.baudRate || !this.packageTime) {
        this.$Message.warning('请填写串口参数')
        return
      }
      this.actionSerial({
        port: this.comSelected,
        baudRate: this.baudRate,
        packageTime: this.packageTime < 50 ? 50 : this.packageTime
      })
    },
    handleNet() {
      if (
        !this.hostIp ||
        !this.hostPort ||
        !this.serverIp ||
        !this.serverPort
      ) {
        this.$Message.warning('请填写网络参数')
        return
      }
      this.actionNet({
        hostIp: this.hostIp,
        hostPort: this.hostPort,
        serverIp: this.serverIp,
        serverPort: this.serverPort
      })
    },
    checkedChange(value) {
      this.actionCheckedChange(value)
    },
    displayPause() {
      this.actionDisplayPause()
    },
    displayClear() {
      this.actionDisplayClear()
    }
  }
}
