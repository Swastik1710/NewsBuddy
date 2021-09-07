import React, { useState, useEffect } from 'react'
import Loader from './Loader'
import NewsItem from './NewsItem'
import unavailable from '../unavailable.jpg'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {
    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setpage] = useState(1);
    const [totalResults, settotalResults] = useState(0);
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    document.title = `NewsBuddy - ${capitalize(props.category)}`;

    useEffect(() => {
        (async function () {
            props.setProgress(20);
            let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=1&pagesize=18`;
            setloading(true);
            let data = await fetch(url);
            let parsedData = await data.json();
            setloading(false);
            setarticles(parsedData.articles);
            settotalResults(parsedData.totalResults);
            props.setProgress(100);
        })();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pagesize=18`;
        setpage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setarticles(articles.concat(parsedData.articles));
    };

    // handlePrev = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=388d2277f4a0475ab2f5028b9212585a&pagesize=18&page=${page - 1}`;
    //     setState({ loading: true })
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     setState({ loading: false })
    //     setState({
    //         page: page - 1,
    //         articles: parsedData.articles
    //     })
    // }

    // handleNext = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=388d2277f4a0475ab2f5028b9212585a&pagesize=18&page=${page + 1}`;
    //     setState({ loading: true })
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     setState({ loading: false })
    //     setState({
    //         page: page + 1,
    //         articles: parsedData.articles
    //     })
    // }

    return (
        <div className="container my-3">
            <h1 className="text-center" style={{ marginTop: "4rem", marginBottom: "4rem" }}>NewsBuddy - Top {capitalize(props.category)} Headlines</h1>
            {loading && <Loader />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Loader />}
            >
                <div className="container">
                    <div className="row">
                        {/* {!loading && articles.map((element) => { */}
                        {articles.map((element) => {
                            return <div className="col-md-4 my-3" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 50) : ''} description={element.description ? element.description.slice(0, 100) : ''} imageUrl={element.urlToImage ? element.urlToImage : unavailable} newsUrl={element.url} newsDate={element.publishedAt} newsAuthor={element.author} />
                            </div>
                        })}
                    </div>
                </div>
                {/* <div className="container d-flex justify-content-between my-5">
                    <button disabled={page <= 1} type="button" className="btn btn-success" onClick={handlePrev}>&larr; Prev</button>
                    <button disabled={page >= Math.ceil(totalResults / 18)} type="button" className="btn btn-success" onClick={handleNext}>Next &rarr;</button>
                </div> */}
            </InfiniteScroll>
        </div>
    )
}

export default News