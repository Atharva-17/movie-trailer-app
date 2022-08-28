import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';

import MovieList from '../../components/movie-list/MovieList';

const Detail = () => {

        const [like,setlike]=useState(10);
        const [dislike,setdislike]=useState(1);
        
        const [likeac,setlikeac]=useState(false);
        const [dislikeac,setdislikeac]=useState(false);

        function likef(){
            if(likeac){
                setlikeac(false)
                setlike(like-1)
            }
            else{
                setlikeac(true)
                setlike(like+1)
                if(dislikeac){
                    setdislikeac(false)
                    setlike(like+1)
                    setdislike(dislike-1)
                }
            }
        }
        function dislikef(){
            if(dislikeac){
                setdislikeac(false)
                setdislike(dislike-1)
            }
            else{
                setdislikeac(true)
                setdislike(like+1)
                if(likeac){
                    setlikeac(false)
                    setlike(like+1)
                    setdislike(dislike-1)
                }
            }
        }
    

    const { category, id } = useParams();

    const [item, setItem] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{}});
            setItem(response);
            window.scrollTo(0,0);
        }
        getDetail();
    }, [category, id]);

    return (
        <>
            {
                item && (
                    <>
                        <div className="banner" style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">
                                    {item.title || item.name}
                                </h1>
                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                </div>
                                <p className="overview">{item.overview}</p>
                                {/* <div className='yay'>
                                    <button id='yay1' className='yayornay' onClick={likef}>YAY {like}</button>
                                    <button id='nay1' className='yayornay' onClick={dislikef}>NAY {dislike}</button>
                                </div> */}
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={item.id}/>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <VideoList id={item.id}/>
                            </div>
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Similar</h2>
                                </div>
                                <MovieList category={category} type="similar" id={item.id}/>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
};

export default Detail;
