import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelSerice from '../../services/MarvelSerice';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const  CharInfo = (props) => {
    const [char, setChar] = useState(null)

    // const [classCharInfo, setClassCharInfo] = useState('char__info')

    const {loading, error, getCharacter, clearError} = useMarvelSerice();

    useEffect(() => {
        updateChar()
        // window.addEventListener('scroll', changePositionBlock)

        // return () => {
        //     window.removeEventListener('scroll', changePositionBlock);
        // }
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }
    
    // const changePositionBlock = () => {
    //     if (window.scrollY >= 425) {
    //         setClassCharInfo('char__info char__info_fixed')
    //     } else {
    //         setClassCharInfo('char__info')
    //     }
    // }

    const skeleton =  char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className='char__info'>
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" || 
        thumbnail ===  'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
        imgStyle = {'objectFit' : 'contain'}
    }

    const shortComicsList = (comics) => {
        const newArr = [];
            try {
                for (let i = 0; i < (comics.length < 10 ? comics.length : 10); i++) {
                    const comicUrl = comics[i].resourceURI
                    const comicId = comicUrl.slice(comicUrl.length - 8, comicUrl.length).replace(/\D/g , '');
                    const elem = (
                        <li key={i} className="char__comics-item">
                            <Link to={`/comics/${comicId}`}>{comics[i].name}</Link>
                        </li>
                    );
                    newArr.push(elem);
                }
                return newArr;
            } catch (e) {
                console.log(e);
            }
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">
                        <Link to={`/characters/${char.id}`}>{name}</Link>
                    </div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.length > 0 ? shortComicsList(comics) : 'There is no comics with this character'
                }
                    
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;
