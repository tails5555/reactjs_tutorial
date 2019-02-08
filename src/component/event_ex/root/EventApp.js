import React, { PureComponent, Fragment } from 'react';

class EventApp extends PureComponent {
    constructor(props){
        super(props);
        this.state = { text1 : '', text2 : '', num : 0 };
    }

    _handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [ name ] : value
        });
    }

    _handleClick = (event) => {
        event.preventDefault();
        const { num } = this.state;
        this.setState({
            num : num + 1
        });
    }

    render() {
        const { text1, text2, num } = this.state;
        return (
            <Fragment>
                <div>
                    <input type="text" name="text1" value={text1} onChange={this._handleChange.bind(this)} />
                    <p>{ text1 }</p>
                </div>
                <div>
                    <button onClick={this._handleClick}>+</button>
                    <p>{ num }</p>
                </div>
            </Fragment>
        );
    }
}

export default EventApp;