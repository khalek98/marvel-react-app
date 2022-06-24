import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import './singleCharacterLayout.scss'

const SingleCharacterLayout = ({data}) => {
    const {name, description, thumbnail, comics} = data;


    return (
        <>
            <Helmet>
                    <meta
                        name="description"
                        content={`Page of character ${name}`}
                    />
                    <title>{`${name} | Marvel information portal`}</title>
            </Helmet>
            <div className="single-comic">
                <img src={thumbnail} alt={name} className="single-comic__char-img"/>
                <div className="single-comic__info ">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <ul className="char__comics-list">
                        <h3>Character's comics list:</h3>
                        {
                            comics.length > 0 ? 
                            comics.map((comic, i) => {
                                const comicUrl = comic.resourceURI
                                const comicId = comicUrl.slice(comicUrl.length - 8, comicUrl.length).replace(/\D/g , '');

                                return (
                                    <li key={i} className="char__comics-item">
                                        <Link to={`/comics/${comicId}`}>{comic.name}</Link>
                                    </li>
                                )
                            }) : 'There is no comics with this character'
                        }
                    </ul> 
                </div>
            </div>
        </>
        
    )
}

export default SingleCharacterLayout;