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
            <React.Fragment>
                <h3>Reply:</h3>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div>
                    <input type="text" name="reply_text" onChange={this.handleChange} 
                    value={this.state.reply_text} placeholder="Commenting publicly..."/>    
                    </div>  
                    <div>
                        <button className="btn btn-primary" type="comment">REPLY</button>
                    </div>
                </form>
            </React.Fragment>
         );
    }
}
 
export default CommentReply;