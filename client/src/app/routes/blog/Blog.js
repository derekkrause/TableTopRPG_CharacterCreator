import React from "react";
import IntlMessages from "util/IntlMessages";
import BlogCard from "../../../components/Cards/BlogCard";
import { getBlog } from "./BlogServer";

class Blog extends React.Component {
  state = {
    blogs: [],
    name: "",
    description: "tbd",
    body: "",
    imageUrl: "",
    title: "",
    content: "",
    avatarUrl: "",
    firstName: "",
    lastName: ""
  };

  componentDidMount() {
    getBlog()
      .then(response => {
        console.log("Get All", response);
        this.setState({
          blogs: response.data.item.pagedItems
        });
      })
      .catch(error => console.log(error));
  }

  handleEditBlog = () => {};

  render() {
    return (
      <div className="app-wrapper">
        <div className="animated slideInUpTiny animation-duration">
          <div className="row">
            <div className=" animation slideInLeft">
              {this.state.blogs.map(blog => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  editBlog={this.handleEditBlog}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
