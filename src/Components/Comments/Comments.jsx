import React, {Component} from 'react';
import axios from 'axios'

class CommentForm extends Component {
    constructor(props) {
        super(props);
            this.state = {
                    video_id: '',
                    comment_text: '',
                    like: '',
                    dislike: '',
            }
    }

    addComment = async () => {
        const comment = {
            video_id: this.props.videoId,
            comment_text: this.state.comment_text,
        }
        try{
            await axios.post('http://127.0.0.1:8000/comments/', comment);
            this.props.getComments();
            this.setState({
            });
        }
        catch (err) {
            console.log(err)
        }
    }
    
    handleChange = (event) => {
        console.log("beginning handle change") // test
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log("end of handle change") // test
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.addComment();
    }

    render() {
        return(
            <React.Fragment>
                <h1>Comments:</h1>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div>
                    <input type="text" name="comment_text" onChange={this.handleChange}
                    value={this.state.comment_text} placeholder="Comment here"/>    
                    </div>  
                    <div>
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

export default CommentForm;