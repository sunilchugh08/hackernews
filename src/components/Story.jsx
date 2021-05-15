import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StoryDetail from './StoryDetail';

function Story() {
    const [story, setStory] = useState([]);
    const [storyDetailList, setStoryDetailList] = useState([]);

    useEffect(() => {
        axios.get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
            .then(data => setStory(data.data))

    }, []);


    useEffect(() => {
        if (story.length > 0) {
            const storyIds = story.length > 0 ? story.slice(0, 10) : [];

            const storyDetail = Promise.all(storyIds.map((record, index) => {
                return axios.get(`https://hacker-news.firebaseio.com/v0/item/${record}.json?print=pretty`);
            })).then(res => {
                setStoryDetailList(res)
            });
            console.log("storyDetail", storyDetail)

        }
    }, [story])





    return (


        <div className="storyBody" >
            <h1 className="heading">Top 10 Stories </h1>
            {storyDetailList.length > 0 && storyDetailList.map((data) => <StoryDetail key={data.data.id} story={data.data} />)}
        </div >
    )
}

export default Story
