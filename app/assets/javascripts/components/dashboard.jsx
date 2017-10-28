var SideMenu = React.createClass({
  getInitialState: function() {
    return {
      tickets : this.props.tickets,
      currentUser : this.props.current_user,
      textHeader : 'All tickets currently listed'
    }
  },

  displayAllTickets: function() {
    this.setState({
      tickets : this.props.tickets,
      textHeader : "All tickets currently listed"
    })
  },

  filterByCurrentSprint: function() {
    var currentSprintTickets = []
    var tickets = this.props.tickets

    var today = new Date();
    var startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toString().split("00")[0];
    var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()+14).toString().split("00")[0];

    for (i = 0; i < tickets.length; i++) {
      var convertDateTimeDeadline = new Date(tickets[i].deadline)
      var timeDiff = Math.abs(today.getTime() - convertDateTimeDeadline.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

      if (diffDays <= 14) {
        currentSprintTickets.push(tickets[i])
      }
    }

    this.setState({
      tickets : currentSprintTickets,
      textHeader : "Current sprint starts on " + startDate + "and ends " + endDate
    })
  },

  filterByCurrentUser: function() {
    var currentUserTickets = []
    var tickets = this.props.tickets

    for (i = 0; i < tickets.length; i++) {
      if (tickets[i].requester == this.state.currentUser.name) {
        currentUserTickets.push(tickets[i])
      }
    }

    this.setState({
      tickets : currentUserTickets,
      textHeader : "My tickets"
    })
  },

  filterByCompleted: function() {
    var completedTickets = []
    var tickets = this.props.tickets

    for (i = 0; i < tickets.length; i++) {
      if (tickets[i].completed == true) {
        completedTickets.push(tickets[i])
      }
    }

    this.setState({
      tickets : completedTickets,
      textHeader : "Completed Work"
    })
  },

  addNewTicket: function() {
    this.setState({
      tickets : [],
      textHeader : 'Create a new ticket'
    })
  },

  render: function() {
    return (
      <div>
        <div className="sidemenu-container">
          <p onClick={this.displayAllTickets}>All Tickets</p>
          <p onClick={this.filterByCurrentSprint}>Current Sprint</p>
          <p onClick={this.filterByCurrentUser}>My Work</p>
          <p onClick={this.filterByCompleted}>Done</p>
          <p onClick={this.addNewTicket}>Add Ticket</p>
        </div>

        <div className="content-container">
          <ShowTickets tickets={this.state.tickets} currentUser={this.state.currentUser} textHeader={this.state.textHeader}/>
          <CreateNewTicket/>
        </div>
      </div>
    )
  }
});

var CreateNewTicket = React.createClass({

  handleSubmit: function(){
    console.log('hit')
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:<input type="text"/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
})

var ShowTickets = React.createClass({
  render: function() {

    function checkStoryType(result) {
      if (result.story_type == "Feature") {
        return (
          <span>{result.story_type} <br/> Points: {result.points}</span>
        )
      } else {
        return (
          <span>{result.story_type}</span>
        )
      }
    }

    function stripTimeZone(result) {
      return (
        <span>{result.deadline.split("T")[0]}</span>
      )
    }

  	var tickets = this.props.tickets
    var currentUser = this.props.currentUser

    var all_tickets = tickets.map(function(result,i){
      return (
        <div className="single-ticket-container">
          <div key={i} className="ticket">
            <p className="ticket-text">Requester: {result.requester}</p>
            <p className="ticket-text">Deadline: {stripTimeZone(result)}</p>
            <p className="ticket-text">Description: {result.description}</p>
            <p className="ticket-text">Complete: {result.completed.toString()}</p>
            <p className="ticket-text">State: {result.state}</p>
            <p className="ticket-text">Story Type: {checkStoryType(result)}</p>
            <p className="ticket-text">Owners: {result.owners}</p>
          </div>
        </div>
      )
  	})
  	return (
      <div>
        <h3>{this.props.textHeader}</h3>
        {all_tickets}
      </div>
    )
	}
});