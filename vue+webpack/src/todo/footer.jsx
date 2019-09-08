import footerLess from './../assets/css/footerLess.less'

export default{

  data() {
    return {
      auto: "QQQl"
    }
  },

  render() {
    return (
      <div id="footer">
        <h4>Demo is {this.auto}</h4>
      </div>
    )
  }
}