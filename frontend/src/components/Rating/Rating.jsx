import { useState, useEffect } from "react";
import "./Rating.css"
export default function Rating({rating}) {
    const [starRating, setStarRating] = useState([]);
    useEffect(()=> {
        const stars = () => {
            let arr = [];
            for (let i = 1; i < rating/2; ++i) {
                arr.push(true);
            }
            if ( rating - Math.floor(rating) > 0.2)
                arr.push(false);
            return arr;
        }
        setStarRating(stars());
    }, [])
    return (
        <div className="rating-container">
            <div className="star-container">
                {rating &&
                    starRating.map( (x , i) => {
                        if(x)
                            return <img key={i} className="star" src="star.svg"></img> 
                        return <img key={i} className="star" src="star-half.svg"></img>
                    })
                }
            </div>
            <p className="rating">{rating}</p>
        </div>

    )
}