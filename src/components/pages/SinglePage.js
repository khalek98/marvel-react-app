import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelSerice from "../../services/MarvelSerice";
import AppBanner from "../appBanner/AppBanner";
import setContent from "../../utils/setContent";

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {getComic, getCharacter, clearError, process, setProcess} = useMarvelSerice();

    useEffect(() => {
        updateData();
    }, [id]);

    const onDataLoaded = (data) => {
        setData(data);
    }

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'))
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'))
        }
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
 
}

export default SinglePage;