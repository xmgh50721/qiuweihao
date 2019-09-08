import vue from 'vue'
import app from './app.vue'
import textCss from './assets/css/text.less'

const root = document.createElement('div')
document.body.appendChild(root)

new vue({
  render: (h) => h(app)
}).$mount(root)