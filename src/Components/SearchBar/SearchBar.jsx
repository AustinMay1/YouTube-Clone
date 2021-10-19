import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
            this.state = {
                searchQuery: '',
            }
    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.searchVideo(this.state.searchQuery);
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="searchQuery" placeholder="Search..."
                onChange={this.handleChange} value={this.searchQuery}/>
                <button className="btn btn-primary" type="submit">Submit </button>
            </form>
        )
    }
}

export default SearchBar;