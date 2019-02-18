import React, { Component } from 'react'
import axios from 'axios'
import Image from './Image'
import InfiniteScroll from 'react-infinite-scroll-component'

export class Images extends Component {
  constructor () {
    super()

    this.state = {
      images: [],
      count: 30,
      start: 1
    }

    this.fetchImages = this.fetchImages.bind(this)
  }

  componentDidMount () {
    const { count, start } = this.state

    axios
      .get(`/api/photos?count=${count}&start=${start}`)
      .then(res => this.setState({ images: res.data }))
  }

  fetchImages () {
    const { images, count, start } = this.state

    this.setState({ start: start + count })

    axios
      .get(`/api/photos?count=${count}&start=${start}`)
      .then(res => this.setState({ images: images.concat(res.data) }))
  }

  render () {
    const { images } = this.state

    return (
      <div className="images">
        <InfiniteScroll
          dataLength={images.length}
          next={this.fetchImages}
          hasMore={true}
          loader={<h4>Loading...</h4>}>
          {images.map(image => <Image key={image.id} image={image} />)}
        </InfiniteScroll>
      </div>
    )
  }
}

export default Images
