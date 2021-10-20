import React from 'react';

const RelatedVideos = (props) => {
        return (
            <div>
                {console.log("Related Videos Comp Props: ", props.relatedVideos)}
                {props.relatedVideos.map((video,index) => {
                    return (
                        <li><a href={`${video.snippet.thumbnails.default.url}`}>{video.videoId}</a></li>
                    )
                })}

            </div>
        );
}

export default RelatedVideos;
