import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, newsDate, newsAuthor } = props;
    return (
        <div>
            <div className="card" style={{ height: "25rem", borderColor: "black" }}>
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: 1, left: '50%', fontSize: '0.9rem' }}>{newsAuthor ? newsAuthor : 'Unknown'}</span>
                <img src={imageUrl} className="card-img-top" alt="" style={{ height: "10rem" }} />
                <div className="card-body text-center">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{new Date(newsDate).toGMTString()}</p>
                    <p className="card-text">{description}...</p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary" style={{ backgroundColor: "#2c3e50", borderColor: "#2c3e50" }}>Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
