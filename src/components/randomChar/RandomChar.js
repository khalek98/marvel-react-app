import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelSerice from '../../services/MarvelSerice';
import setContent from '../../utils/setContent';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


const RandomChar = (props) => {
    const [char, setChar] = useState({});
    const {getCharacter, clearError, process, setProcess} = useMarvelSerice();

    useEffect(() => {
        updateChar();
        // const timerId = setInterval(updateChar, (30000))

        // return () => {
        //     clearInterval(timerId)
        // }
    }, [])
    
    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = () => {
        clearError(); 
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({data, onCharSelected}) => {
    const {thumbnail, name, description, homepage, wiki, id} = data;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" || 
        thumbnail ===  'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
        imgStyle = {'objectFit' : 'contain'}
    }
    
    return (
        <div className="randomchar__block">
            <img style={imgStyle} 
                  src={thumbnail} 
                  alt="Random character" 
                  onClick={() => onCharSelected(id)}
                  className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">
                    <Link to={`/characters/${id}`}>{name}</Link>
                </p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;