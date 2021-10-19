import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './Components/SearchBar/SearchBar';
import RelatedVideos from './Components/RelatedVideos/RelatedVideos';
import CommentForm from './Components/Comments/Comments';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        comments: [],
        filteredComments: [],
        replies: [],
        videoId: '',
        videoTitle: '',
        videoDescription: '',
        relatedVideos: [],
      
      }
  }

  componentDidMount() {
    this.searchVideo('software development')
    this.getComments();
  }

  searchVideo = async (searchQuery) => {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&type=video&part=snippet&key=APIkey`);
    let allVideos = response.data;

    this.getRelatedVideos({
      videoId: allVideos.items[0].id.videoId,
      videoTitle: allVideos.items[0].snippet.title,
      videoDescription: allVideos.items[0].snippet.description,
    })

  }

  getRelatedVideos = async (videoData) => { 
    let response = await axios.get (`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoData.videoId}&type=video&part=snippet&key=AIzaSyAIfh92bqWo0T_AbXjELe4jIF2iDLZvb18`);
    let relatedVideos = response.data.items.filter(video => video.snippet);
    let relatedVideosArray = relatedVideos.map((video) => {
      return ({
          videoId: video.id.videoId,
          videoTitle: video.snippet.title,});
      });
      this.setState({
        videoId: videoData.videoId,
        videoTitle: videoData.videoTitle,
        videoDescription: videoData.videoDescription,
        relatedVideos: relatedVideosArray
    })
  }

  getComments = async () => {
    try{
      // console.log("get all comments request is called")   // test
      let response = await axios.get('http://127.0.0.1:8000/comments/')
          this.setState({
          comments: response.data,
          })
      this.filterComments();
    }
    catch (err) {
      // console.log(err)
    }
  }

  filterComments = () => {
    let filtered = this.state.comments.filter(comment => comment.video_id.includes(this.state.videoId))
    // console.log(this.state.videoId)   // test
    this.setState({
      filteredComments:filtered
    })
    // console.log(this.state.filteredComments);
  }

  likeComment = async (id, video_id) => {
    try{
      await axios.patch(`http://127.0.0.1:8000/comments/${id}/${video_id}/1/`)
      let response = await this.getComments()
      if(response === undefined) {
        this.setState({
        })
      }
      else{
        this.setState({
          comments: response.data
        });
      }
    }
    catch(err) {
      // console.log(err);
    }
  }

  dislikeComment = async (id, video_id) => {
    try{
      await axios.patch(`http://127.0.0.1:8000/comments/${id}/${video_id}/2/`)
      let response = await this.getComments()
      if(response === undefined) {
        this.setState({
        })
      }
      else{
        this.setState({
          comments: response.data
        });
      }
    }
    catch(err) {
      // console.log(err);
    }
  }

  render() { 
    return (
      <div className="bg-secondary ">
        <React.Fragment>
        <br />
          <br />
          <div className="container bg-light text-dark border border-primary">
          <u><h1 className="marquee">YouTube Clone</h1></u>
          <br />
          <SearchBar searchVideo={this.searchVideo}/>
          </div>
          <br />
          <br />
          <br />
          <div className="d-flex justify-content-center">
          <iframe class="border border-primary" id="ytplayer" title="title" type="text/html" width="640" height="360"
              src={`https://www.youtube.com/embed/${this.state.videoId}?`}
              frameborder="0"></iframe>
          </div>
          <div className="container">
          <h2>{this.state.videoTitle}</h2>
          <h3>{this.state.videoDescription}</h3>
          </div>
          <br />
          <br />
          <div className="container bg-light text-dark border border-primary">
          <RelatedVideos relatedVideos={this.state.relatedVideos} />
          </div>
          <br />
          <br />
          <div className="container bg-light text-dark border border-primary">
          <CommentForm getComments={this.getComments} videoId={this.state.videoId}/>
          <br />
          <br />
          
          </div> 
        </React.Fragment>
      </div>
    );
  }
}

export default App;

