import React, {Component} from react;

class EventCreate extends Component {
    state = {
        Name: "",
        ShortName: "",
        EventTypeId: 0,
        StartDate: "",
        EndDate: "",
        Description: "",
        WebsiteUrl: "",
        Logo: "",
        IsOngoing: false,
        Organizer: "",
        Street: "",
        Suite: "",
        City: "",
        Zip: "",
        Lat: 0.0,
        Long: 0.0
    };

    render() {
        return (
            <div>
                {"Something"}
                
            </div>
        );
    }
}
 
export default EventCreate;