class AfterRegister extends Component{

    state = {
        cnt: 5
    }

    componentDidMount = () =>{
        const intervalId = setInterval(this.countDown, 1000)
        this.setState({intervalId})
    }

    countDown = () => this.setState({cnt: this.state.cnt - 1})

    componentWillUnmount = () => clearInterval(this.state.intervalId)

    render(){
        return(
            <div>
               <p> Dzieki za rejestracje </p>
                {this.cnt === 0 && <Navigate to ='/' />}
            </div>
        )
    }
}