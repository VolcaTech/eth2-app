import React, { Component } from 'react'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
//import SimpleSend from './components/SimpleSend'
import MainTab from './components/MainTab'
import getWeb3 from './utils/getWeb3'

import web3Api from "./web3-api"
import serverApi from "./quid-server-api"

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      web3Api.setWeb3(results.web3)
      serverApi.setWeb3(results.web3)

    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }


  render(){
    console.log(this.state.storageValue)
    return(
      <div className="wrapper">
          <div className="container-center animated slideInDown">
            <MainTab/>
          </div>
      </div>
    )
  }
}

export default App
