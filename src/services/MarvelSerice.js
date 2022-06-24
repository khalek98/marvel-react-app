import {useHttp} from '../hooks/http.hook';

const useMarvelSerice = () => {
    const {loading, request, error, clearError} = useHttp();
    
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=d9c743675863ced839ca78419759170d';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset = 10) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0])
    }



    const _transformComics = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description ? 
                `${comic.description.length >= 600 ? comic.description.slice(0, 600) + '[...]' : comic.description}` : 'There is no description',
            pageCount: comic.pageCount ? `${comic.pageCount} pages` : 'No information about the number of pages',
            price: comic.prices[0].price ? `${comic.prices[0].price}$` : 'NOT AVAILABLE',
            thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            language: comic.textObjects[0] ? comic.textObjects[0].language : 'No information about language'
        }
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? 
                `${char.description.length >= 150 ? char.description.slice(0, 150) + "..." : char.description}` : 
                'This character hasn\'t description.',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {
        loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic, getCharacterByName
    }
}

export default useMarvelSerice;