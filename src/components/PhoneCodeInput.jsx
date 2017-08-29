import React, { Component } from 'react'


export default class PhoneCodeInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            code: "",
        };

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }




    render() {
        return (
            <form>
                    <div>
                        <label>
                            Your phone number
                </label>
                    </div>
                    <div>
                    <input type="text" onChange={(value)=>this.setState({phone:value})} />
                    </div>
                    <br />
                    <div>
                        <label>
                            Verification code
                </label>
                    </div>
                    <div>
                        <input type="text" value={this.state.code} onChange={(value)=>this.setState({code:value})} />
                    </div>
                    <br />
                </form>
        )
    }

}
