import React, { Component } from 'react'
import Item from '../item'
import PubSub from 'pubsub-js'
import { v4 as uuidv4 } from 'uuid'
import './list.css'
export default class List extends Component {
  state = {
    todos:[]
  }
  pubTodosStat = () => {
    const { todos } = this.state
    PubSub.publish('updateStat', {
      total: todos.length,
      checkedNum: todos.reduce((count, item) => {
        return item.status ? count + 1 : count
      }, 0)
    })
  }
  render() {
    const { todos } = this.state
    return (
      <div className="wrapper">
        {
          todos.length ?
          <div className="list">
            {
              todos.map(todo => <Item key={todo.id} todo={{...todo}} />)
            }
          </div> :
          <div className="empty">暂无数据</div>
        }
      </div>
    )
  }
  componentDidMount() {
    this.addSub = PubSub.subscribe('add', (_, content) => {
      const { todos } = this.state
      this.setState({ todos: [{ id: uuidv4(), status: false, content }, ...todos] })
      this.pubTodosStat()
    })
    this.changeStatusSub = PubSub.subscribe('changeStatus', (_, id) => {
      const { todos } = this.state
      this.setState({ todos: todos.map(item => {
        if (item.id === id) {
          item.status = !item.status
        }
        return item
      }) })
      this.pubTodosStat()
    })
    this.deleteSub = PubSub.subscribe('delete', (_, id) => {
      const { todos } = this.state
      this.setState({ todos: todos.filter(item => item.id !== id) })
      this.pubTodosStat()
    })
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.addSub)
    PubSub.unsubscribe(this.changeStatusSub)
    PubSub.unsubscribe(this.deleteSub)
  }
}
