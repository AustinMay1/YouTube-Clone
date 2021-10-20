import React from 'react';

const RelatedVideos = (props) => {
        return (
            <div>
                {console.log("Related Videos Comp Props: ", props.relatedVideos)}
                {props.relatedVideos.map((video,index) => {
                    return (
                        <li>src={`${video.snippet.thumbnails.default.url}`}{video.videoId}</li>
                    )
                })}

            </div>
        );
}

export default RelatedVideos;
