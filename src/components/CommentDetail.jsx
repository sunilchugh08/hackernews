import React, { useState } from 'react'

function CommentDetail({ comment }) {
    return (
        <>
            <li style={{ textAlign: "left; :important" }}>  {comment.text}</li>
        </>
    )

}

export default CommentDetail
