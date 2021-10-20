import React, { Component } from 'react';

class CommentReply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment_id: '',
            reply_text: '',
        }
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
            
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.getReply(this.state, this.props.comment);
    }
    render() { 
        return ( 
            <form onSubmit={this.handleSubmit}>
            <input text="text" name="reply_text" value={this.state.reply_text} onChange={this.handleChange} />
            <button type="submit">Comment</button>
            </form>
         );
    }
}
 
export default CommentReply;