import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }


  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      articles: [],
      loading: false,
      totalResults: 0
    };
    document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - Rocking`;
  }


  async componentDidMount() {
    // runs after render method
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=9a946766d7d842adaec3ff96ff7dbf28&page=1&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);

    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handleNextClick = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
        }&category=${this.props.category}&apikey=9a946766d7d842adaec3ff96ff7dbf28&page=${this.state.page + 1
        }&pageSize=${this.props.pageSize}`;
      this.setState({
        loading: true,
      });
      let data = await fetch(url);

      let parsedData = await data.json();

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
  };

  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
      }&category=${this.props.category}&apikey=9a946766d7d842adaec3ff96ff7dbf28&page=${this.state.page - 1
      }&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);

    let parsedData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };
  fetchMoreData = () => {
    this.setState({
      page: this.state.page + 1
    })


  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: '39px 0px' }}>Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}  Deeksha !</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >

          {this.state.loading && <Spinner />}
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 35) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageurl={element.urlToImage}
                    url={element.url}
                    author={element.author ? element.author : "Unknown"}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>

      </div>
    );
  }
}
