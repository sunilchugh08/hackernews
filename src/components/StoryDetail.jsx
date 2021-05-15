import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CommentDetail from './CommentDetail';

function StoryDetail({ story }) {
    const [comment, setComment] = useState(story);
    const [storyCommentList, setStoryCommentList] = useState([]);
    const [showComment, setShowComment] = useState(false);



    const showComments = () => {
        if (comment.kids && comment.kids.length > 0 && !showComment && storyCommentList.length === 0) {
            const commentIds = comment.kids.length > 0 ? comment.kids.slice(0, 20) : [];
            Promise.all(commentIds.map((record, index) => {
                return axios.get(`https://hacker-news.firebaseio.com/v0/item/${record}.json?print=pretty`)
            })).then(res => {
                setStoryCommentList(res)
                setShowComment(true)
            });

        }



    }


    const toggleComment = () => {

        showComments();
        setShowComment(!showComment)
    }






    return (
        <div className="story-comment">

            <div>
                <div className="story-title"> {story.title}</div>
            </div>
            <div onClick={toggleComment} className="comment-title"><span></span> comments ({story.kids && story.kids.length && (story.kids.length > 20 ? 20 : story.kids.length)})</div>

            { showComment &&
                (<ul className="comment-description">
                    {storyCommentList.length > 0 && storyCommentList.map(comment => (
                        <CommentDetail key={comment.data.id} comment={comment.data} />
                    )
                    )}
                    {storyCommentList.length < 1 && <div>...loading</div>}
                </ul>)
            }
        </div>
    )

}

export default StoryDetail
