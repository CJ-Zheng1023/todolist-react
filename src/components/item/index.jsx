import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './item.css'
export default class Item extends Component {
  changeStatus = (id) => {
    return () => {
      PubSub.publish('changeStatus', id)
    }
  }
  handleDelete = (id) => {
    return () => {
      PubSub.publish('delete', id)
    }
  }
  render() {
    const { todo } = this.props
    return (
      <div className="todo">
        <div className="content">
          <input type="checkbox" checked={todo.status} onChange={this.changeStatus(todo.id)} />
          <span>{todo.content}</span>
        </div>
        <div className="action">
          <button onClick={this.handleDelete(todo.id)}>删除</button>
        </div>
      </div>
    )
  }
}
