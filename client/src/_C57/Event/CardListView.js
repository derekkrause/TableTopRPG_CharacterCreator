import React, { Component } from "react";
// import PostBoxes from "./PostBoxes";
// import { post } from "./data";
import CardLayout from "../../components/CardLayout";

class EventListView extends Component {
  state = {
    // code: '',
    // name: '',
    // displayOrder: 0,
    // inactive: false
  };

  render() {
    const post = [
      {
        image: "http://via.placeholder.com/500x330",
        title: "5 DIY tips to use in kitchen",
        date: "28 Oct, 2016",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt."
      },
      {
        image: "http://via.placeholder.com/500x330",
        title: "It allowance prevailed",
        date: "20 Sept, 2016",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
      },
      {
        image: "http://via.placeholder.com/500x330",
        title: "Case read they must",
        date: "14 Aug, 2016",
        description:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form"
      },
      {
        image: "http://via.placeholder.com/500x330",
        title: "Too carriage attended",
        date: "28 July, 2016",
        description:
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC"
      }
    ];

    const PostBox = ({ post }) => {
      const { image, title, date, description } = post;
      return (
        <li>
          <div className="post-images">
            <img className="img-fluid" src={image} alt={title} />
          </div>
          <div className="post-content ">
            <h4 className="title">
              <a href="javascript:void(0)">{title}</a>
            </h4>
            <small className="text-muted">{date}</small>
            <p className="text-truncate">{description}</p>
          </div>
        </li>
      );
    };

    return (
      <div>
        <CardLayout styleName="col-lg-12">
          <div className="card-header p-4">
            <h2 className="card-title">Pictures from around the world</h2>
            <p className="card-subtitle text-truncate">
              Fusce eget dolor id justo luctus commodo vel pharetra nisi. Donec velit libero
            </p>
          </div>
          <div className="card-body bg-transparent">
            <ul className="post-list">
              {post.map((post, index) => (
                <PostBox key={index} post={post} />
              ))}
            </ul>
          </div>
        </CardLayout>
      </div>
    );
  }
}

export default EventListView;
