import { Component } from 'react'
import Input from './components/input'
import List from './components/list'
import Stat from './components/stat'
export default class App extends Component {
  render() {
    return (
      <div style={{width: '200px'}}>
        <Input />
        <List />
        <Stat />
      </div>
    )
  }
}
