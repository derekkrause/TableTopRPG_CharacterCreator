import React from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardTitle, Button } from "reactstrap";

class UserTypeCards extends React.Component {
  state = {
    athleteCard: true,
    coachCard: true,
    advocateCard: true
  };

  onClick = e => {
    e.preventDefault();
    console.log("this is: ", e);
    this.setState({ [e.target.name]: !e.target.value });
  };

  render() {
    return (
      <div className="row d-flex justify-content-around p-0 mt-3 mx-2 card-deck">
        <Card
          inverse
          className="p-0 d-flex bg-dark border-dark card-flip"
          ref="coachCard"
          onClick={this.onCl}
          value={this.state.coachCard}>
          <CardImg height="100%" src="https://c1.staticflickr.com/6/5292/5477733359_102d9c5533_b.jpg" alt="Coach" />
          <CardImgOverlay className="justify-content-center">
            <CardTitle>Coach</CardTitle>
            <CardText>Find your next All-Star!</CardText>
          </CardImgOverlay>
        </Card>
        <Card
          inverse
          className="p-0 d-flex bg-dark border-dark card-flip"
          name="athleteCard"
          onClick={this.onClick}
          value={this.state.athleteCard}>
          <CardImg
            height="100%"
            src="https://www.publicdomainpictures.net/pictures/90000/velka/baseball-batter.jpg"
            alt="Athlete"
          />
          <CardImgOverlay>
            <CardTitle>Athlete</CardTitle>
            <CardText>Find your next Team!</CardText>
          </CardImgOverlay>
        </Card>
        <Card
          inverse
          className="p-0 d-flex bg-dark border-dark card-flip"
          name="advocateCard"
          onClick={this.onClick}
          value={this.state.advocateCard}>
          <CardImg
            height="100%"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Caleb_Porter_Portland_Timbers_vs_Seattle_Sounders_2016-07-17_%2828378409765%29.jpg/1024px-Caleb_Porter_Portland_Timbers_vs_Seattle_Sounders_2016-07-17_%2828378409765%29.jpg"
            alt="Advocate"
          />
          <CardImgOverlay>
            <CardTitle>Advocate</CardTitle>
            <CardText>Promote your All-Star!</CardText>
          </CardImgOverlay>
        </Card>
      </div>
    );
  }
}
export default UserTypeCards;
