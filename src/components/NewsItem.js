// import { getByTitle } from '@testing-library/dom'
import React, { Component } from 'react'

export default class NewsItem extends Component {



  render() {
    let { title, description, imageurl, url, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>
            {source}

          </span>
          <img src={imageurl ? imageurl : "data:image/jpeg;base64,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"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={url} target="_blank" className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}