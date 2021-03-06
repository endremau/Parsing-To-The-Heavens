import React, { Component } from 'react'
import MDReactComponent from 'markdown-react-js'
import styled from 'styled-components'
import localmain from '../assets/docs/main.md'
import localbackend from '../assets/docs/backend.md'
import localfrontend from '../assets/docs/frontend.md'
import localmocker from '../assets/docs/mocker.md'
import localclient from '../assets/docs/client.md'
import localVM from '../assets/docs/VM.md'
import fetch from 'isomorphic-fetch'

const Div = styled.div`
position: relative;
left:12.5%;
border-color:black;
border-top:2px solid;
width: 75%;
padding:40px;
`

class About extends Component {
  constructor () {
    super()
    this.state = {
      main: 'localmain',
      backend: 'localbackend',
      mocker: 'localmocker',
      frontend: 'localfrontend',
      client: 'localclient',
      VM: 'localVM'
    }
  }
  // Checks if we have a connection to the internet, if yes then start init the page Online.
  componentWillMount () {
    if (navigator.onLine) { this.setOnlineState() } else { this.setOfflineState() }
  }
  // Fetches the documentation that is the drive.

  async setOfflineState () {
    this.setState({ mode: 'Offline' })
    const main = await fetch(localmain).then(data => { return data.text() })
    const backend = await fetch(localbackend).then(data => { return data.text() })
    const frontend = await fetch(localfrontend).then(data => { return data.text() })
    const mocker = await fetch(localmocker).then(data => { return data.text() })
    const client = await fetch(localclient).then(data => { return data.text() })
    const VM = await fetch(localVM).then(data => { return data.text() })
    this.setState({
      client: client,
      main: main,
      backend: backend,
      frontend: frontend,
      mocker: mocker,
      VM: VM
    })
  }
  // Fetches the docs from the github repo

  async setOnlineState () {
    this.setState({ mode: 'Online' })
    const main = await fetch('https://raw.githubusercontent.com/it2901/Skrp/develop/README.md').then(data => { return data.text() })
    const backend = await fetch('https://raw.githubusercontent.com/it2901/Skrp/develop/backend/README.md').then(data => { return data.text() })
    const frontend = await fetch('https://raw.githubusercontent.com/it2901/Skrp/develop/frontend/README.md').then(data => { return data.text() })
    const mocker = await fetch('https://raw.githubusercontent.com/it2901/Skrp/develop/mocker/README.md').then(data => { return data.text() })
    const client = await fetch('https://raw.githubusercontent.com/it2901/Skrp/develop/client/README.md').then(data => { return data.text() })
    const VM = await fetch('https://raw.githubusercontent.com/it2901/Skrp/develop/virtual_machine/README.md').then(data => { return data.text() })
    this.setState({
      client: client,
      main: main,
      backend: backend,
      frontend: frontend,
      mocker: mocker,
      VM: VM
    })
  }

  render () {
    return (
      <div>
        <Div style ={{ border: 'none' }}>
          <h1 style={{ textAlign: 'center' }}>SKRP</h1>
          <br></br>
          <MDReactComponent text={this.state.main}/>
        </Div>
        <Div>
          <h1 style={{ textAlign: 'center' }}>Frontend</h1>
          <br></br>
          <MDReactComponent text={this.state.frontend}/>
        </Div>
        <Div>
          <h1 style={{ textAlign: 'center' }}>Backend</h1>
          <br></br>
          <MDReactComponent text={this.state.backend}/>
        </Div>
        <Div>
          <h1 style={{ textAlign: 'center' }}>Client</h1>
          <br></br>
          <MDReactComponent text={this.state.client}/>
        </Div>
        <Div>
          <h1 style={{ textAlign: 'center' }}>Mocker</h1>
          <br></br>
          <MDReactComponent text={this.state.mocker}/>
        </Div>
        <Div>
          <h1 style={{ textAlign: 'center' }}>VM</h1>
          <br></br>
          <MDReactComponent text={this.state.VM}/>
        </Div>
        <Div style ={{ border: 'none',
          textAlign: 'center' }}>
          <i> Used the {this.state.mode} version of the docs</i>
        </Div>
      </div>
    )
  }
}

export default About
