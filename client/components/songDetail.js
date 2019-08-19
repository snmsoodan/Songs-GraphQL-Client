import React from 'react';
import fetchSong from '../queries/fetchSong';
import {graphql} from 'react-apollo';
import {Link} from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

const SongDetail = (props) => {

    if(props.data.loading) {
        return <div>Loading</div>
    }
    return (
        <div>
            <Link to="/">Back</Link>
            <h3>
                {props.data.song.title}
            </h3>
            <LyricList lyricList={props.data.song.lyrics} />
            <LyricCreate songId={props.params.id}/>
        </div>
    )
}

export default graphql(fetchSong, {
    options: (props) => {
        return {
            variables: {
                id: props.params.id
            }
        }
    }
})(SongDetail);