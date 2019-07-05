import React, { Component } from 'react'
import fan from '../images/fan-wings.png'
import '../style/fan.css'

class Fan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            power: 'off',
            time: 0,
            timerState: 1,
            speed: 5
        }
        
    }
    handlePower = (e) => {
        e.preventDefault()
        if(this.state.timerState == 0 ) {
            this.setState({ timerState: 1})
        }
        if(this.state.power == 'on') {
            this.setState({ power: 'off' })
        } else {
            this.setState({ power: 'on' })
        }
    }
    handleSpeedClick = (e) => {
        clearInterval(this.intervalFunction)
        switch(e) {
            case 'add':
                this.state.speed == 5 ? this.setState({ speed: this.state.speed }) : this.setState({ speed: this.state.speed+1 })
                return
            case 'red':
                this.state.speed == 1 ? this.setState({ speed: this.state.speed }) : this.setState({ speed: this.state.speed-1 })
                return
            default:
                return
        }
    }
    handleTimer = (time) => {
        this.setState({ time: this.state.time+time })
    }
    intervalFunction = () => {
        return setInterval( () => {
            if(this.state.time != 0) {
                this.setState({ time: this.state.time-1 })
            } else {
                this.setState({ power: 'off', timerState: 0 })
            }
        }, 1000 )
    }
    handleTimeState = () => {
        this.state.timerState == 0 ? this.setState({ timerState: 1 }) : this.setState({ timerState: 0 })

        if(this.state.time !== 0) {
            if (this.state.timerState == 1 && this.state.time != 0) {
                let intervalId = this.intervalFunction()
                this.setState({intervalId})
            } else {
                clearInterval(this.state.intervalId)
            }
        } else {
            clearInterval(this.state.intervalId)
        }
    }
    render() {
        return (
            <div className="Main">
                <p className="guide-text">{  }</p>
                <div className="square">
                    <div className="controls">
                        <div className="onOff">
                            <button className="on-off" onClick={this.handlePower} style={{background: '#282c34', color: '#fff' }}>{this.state.power}</button>
                            <button className="time-btn" style={{ background: this.state.timerState == 0 ? 'linear-gradient(to top left, #fffc00, #fff)' : '#282c34', color: '#fff' }} onClick={this.handleTimeState}>timer</button>
                        </div>
                        <div>
                            <div className="speed">
                                <form>
                                    <button type="button" className="speed-up top-btn" onClick={() => {this.handleSpeedClick('add')}}><i className="fa fa-arrow-up" aria-hidden="true"></i></button>
                                    <input type="text" value={this.state.speed} readOnly/>
                                    <button type="button" className="speed-down" onClick={() => {this.handleSpeedClick('red')}}><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
                                    <p>SPEED</p>
                                </form>
                            </div>
                            <div className="timer">
                                <form>
                                    <button type="button" className="time-up top-btn" onClick={ () => { this.handleTimer(10) } }>+10S</button>
                                    <input type="text" value={Math.floor(this.state.time / 60)} />
                                    <input type="text" value={this.state.time % 60} />
                                    <button type="button" className="time-down" onClick={ () => { this.handleTimer(-10) } }>-10S</button>
                                    <p>TIMER</p>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="circle">
                        <img src={fan} style={this.state.power == 'on' ? { animationDuration: 2/this.state.speed+"s" } : null} className="App-logo" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Fan