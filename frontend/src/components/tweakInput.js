import React, { Component } from 'react'
import Parameters from './parameter'
import styled from 'styled-components'

const Div = styled.div`
top-border: 50%;
display:flex;
flex-direction:row;
`

class TweakInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.props = props
  }

  componentWillMount(){
    this.setInitalState()
  }

  async setInitalState (){
  const stateToBe = await fetch('http://localhost:8090/configure').then(data => { return data.json()}).catch(err => console.error(err))
  let parameters = stateToBe[0]
  delete parameters['conf_id']
  Object.entries(parameters).map(p=>(
    this.setState({
        [p[0]]:p[1]
    })
  )
  )}
    
  sendToConfigure(){
    let state = this.state
    let statement = "?"
    Object.entries(state).map(x=>statement+=x[0]+"="+x[1]+"&")
    statement = statement.substring(0, statement.length-1)
    fetch("http://localhost:8090/configure"+statement)
  }

  valdiator (value) {
    return value.match(/^[.0-9]*$/gm)
  }

    onChangeParameterValue(name, event){
      if (event.key === 'Enter' && this.valdiator(event.target.value) )  {
        this.setState({
          [name]: event.target.value
        })
        setTimeout(() => {
          this.sendToConfigure()
        }, 1);
        
      }
    }

   

    render () {
      let state = Object.entries(this.state)
      let parameters = state.map(s => {
        return <Parameters key={s[0]}changeParameterValue={this.onChangeParameterValue.bind(this, s[0])} parameter={s[1]} name ={s[0]}/>
      })
      return <Div>{parameters}</Div>
    }
}

export default TweakInput
