import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends Component{

    onLike(id, likes) {
        this.props.mutate({
            variables: {
                id
            },
            optimisticResponse: {       //this object structure can be found in the networks tab in console
                __typename: 'Mutation',
                likeLyric: {
                    id,
                    __typename: 'LyricType',
                    likes: likes+1
                }
            } //Note: we do not refetch anymore as we changed the appoloClient object in index.js 
        })
    }

    renderLyrics() {
        return this.props.lyricList.map(({id, content, likes}) => {
            return (
                <li key={id} className="collection-item">
                    {content}
                    <div className="vote-box">
                        <i 
                            className="material-icons"
                            onClick={() => this.onLike(id, likes)}
                        >
                            thumb_up
                        </i>
                        {likes}
                    </div>
                </li>
            )
        })
    }
    render(){
        if(!this.props.lyricList){
            return(<div>Loading</div>)   
        }
        return(
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        )
    }
}

const mutation = gql`
mutation LikeLyric($id: ID) {
    likeLyric(id:$id) {
      id,
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);