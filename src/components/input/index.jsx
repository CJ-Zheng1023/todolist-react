import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './input.css'
export default class Input extends Component{
  inputRef = React.createRef()
  addTodo = (event) => {
    if (event.keyCode === 13) {
      const { value: content } = this.inputRef.current
      PubSub.publish('add', content)
      this.inputRef.current.value = ''
    }
  }
  render() {
    return (
      <div className="input">
        <input placeholder="回车添加" onKeyUp={this.addTodo} ref={this.inputRef} />
      </div>
    )
  }
}