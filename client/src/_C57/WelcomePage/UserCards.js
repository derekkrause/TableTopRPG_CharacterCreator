import React from "react";
import { Card, CardFooter, CardImg, CardImgOverlay, CardTitle, Button, ListGroup, ListGroupItem } from "reactstrap";

class UserTypeCards extends React.Component {
  render() {
    return (
      <div className="d-flex flex-row flex-wrap p-0 mx-auto card-deck justify-content-around">
        <div
          className="card-container d-flex p-0 col-md-4 col-xs-10 my-2 order-md-2"
          tabIndex={1}
          style={{ maxWidth: "450px" }}
        >
          <div className="card-flip">
            <Card inverse className="d-flex border-0 front p-0" name="athleteCard">
              <CardImg
                height="100%"
                src="https://sabio-training.s3.us-west-2.amazonaws.com/C57/98facd6a-bb44-46b5-adac-63586855b0c9"
                style={{ objectFit: "cover" }}
                alt="Athlete"
              />
              <CardImgOverlay className="d-flex wrap justify-content-center align-items-end pr-0">
                <CardTitle className="mb-0 w-100 bg-primary rounded-left">
                  <p className="text-white m-0 pl-3 p-2">ATHLETE</p>
                </CardTitle>
              </CardImgOverlay>
            </Card>
            <Card className="d-flex border-0 justify-content-center back p-2" name="athleteCard">
              <ListGroup flush className="pb-2">
                <ListGroupItem>Find schools</ListGroupItem>
                <ListGroupItem>Share your skills</ListGroupItem>
                <ListGroupItem>Connect with Recruiters</ListGroupItem>
                <ListGroupItem>Access on the go!</ListGroupItem>
                <ListGroupItem>Get the latest news</ListGroupItem>
              </ListGroup>
              <Button
                color="primary"
                className="btn btn-block btn-lg mt-auto mb-3"
                onClick={this.props.regScrollAthlete}
              >
                Get Started
              </Button>
            </Card>
          </div>
        </div>
        <div
          className="card-container d-flex p-0 col-md-4 col-xs-10 my-2 order-md-1"
          tabIndex={2}
          style={{ maxWidth: "450px" }}
        >
          <div className="card-flip">
            <Card inverse className="d-flex border-0 front p-0" name="coachCard" onClick={void 0}>
              <CardImg
                height="100%"
                src="https://c1.staticflickr.com/6/5292/5477733359_102d9c5533_b.jpg"
                alt="Coach"
                style={{ objectFit: "cover" }}
              />
              <CardImgOverlay className="d-flex wrap justify-content-center align-items-end pr-0">
                <CardTitle className="mb-0 w-100 bg-danger rounded-left">
                  <p className="text-white m-0 pl-3 p-2">COACH</p>
                </CardTitle>
              </CardImgOverlay>
            </Card>
            <Card className="d-flex border-0 justify-content-center back p-2" name="coachCard">
              <ListGroup flush className="pb-2">
                <ListGroupItem>Find prospects</ListGroupItem>
                <ListGroupItem>Watch game highlights</ListGroupItem>
                <ListGroupItem>Talk to Player Advocates</ListGroupItem>
                <ListGroupItem>Access on the go!</ListGroupItem>
                <ListGroupItem>Get the latest news</ListGroupItem>
              </ListGroup>
              <Button color="danger" className="btn btn-block btn-lg mt-auto mb-3" onClick={this.props.regScrollCoach}>
                Get Started
              </Button>
            </Card>
          </div>
        </div>
        <div
          className="card-container d-flex p-0 col-md-4 col-xs-10 my-2 order-3"
          tabIndex={3}
          style={{ maxWidth: "450px" }}
        >
          <div className="card-flip">
            <Card inverse className="d-flex border-0 front p-0" name="advocateCard" onClick={void 0}>
              <CardImg
                height="100%"
                src="https://sabio-training.s3.us-west-2.amazonaws.com/C57/c670f692-a624-4567-a42c-2fb835cb95ea"
                style={{ objectFit: "cover" }}
                alt="Advocate"
              />
              <CardImgOverlay className="d-flex wrap justify-content-center align-items-end pr-0">
                <CardTitle className="mb-0 w-100 bg-warning rounded-left">
                  <p className="text-white m-0 pl-3 p-2">ADVOCATE</p>
                </CardTitle>
              </CardImgOverlay>
            </Card>
            <Card className="d-flex border-0 justify-content-center back p-2" name="advocateCard">
              <ListGroup flush className="pb-2">
                <ListGroupItem>Promote your athletes</ListGroupItem>
                <ListGroupItem>Help athletes get noticed</ListGroupItem>
                <ListGroupItem>Approve their stats</ListGroupItem>
                <ListGroupItem>Access on the go!</ListGroupItem>
                <ListGroupItem>Get the latest news</ListGroupItem>
              </ListGroup>
              <Button
                color="warning"
                style={{ color: "white" }}
                className="btn btn-block btn-lg mt-auto mb-3"
                onClick={this.props.regScrollAdvocate}
              >
                Get Started
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
export default UserTypeCards;
