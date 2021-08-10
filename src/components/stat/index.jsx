import { Component } from 'react'
import PubSub from 'pubsub-js'
import './stat.css'
export default class Action extends Component{
  state = {
    checkedNum: 0,
    total: 0
  }
  render() {
    const { checkedNum, total } = this.state
    return (
      <div class="stat">
        <span>{checkedNum}</span>
        <span>/</span>
        <span>{total}</span>
      </div>
    )
  }
  componentDidMount() {
    this.updateStatSub = PubSub.subscribe('updateStat', (_, stat) => {
      this.setState(stat)
    })
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.updateStatSub)
  }
}