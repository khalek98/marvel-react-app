import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelSerice from '../../services/MarvelSerice';

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelSerice();

    useEffect(() => {
        onRequest(offset, true);
    }, [])
    
    const onRequest = (offset, initial) => {
        setNewComicsLoading(!initial)
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true
        }

        setComicsList([...comicsList, ...newComicsList])
        setNewComicsLoading(false)
        setOffset(offset => offset + 8);
        setComicsEnded(ended)
    }

    function renderItems(comicsList) {
        const items = comicsList.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newComicsLoading ? <Spinner/> : null;
    const items = renderItems(comicsList)

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                onClick={() => onRequest(offset)}
                disabled={newComicsLoading}
                style={{display: comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;