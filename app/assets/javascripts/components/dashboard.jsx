var SideMenu = React.createClass({
  getInitialState: function() {
    return {
      tickets : this.props.tickets,
      currentUser : this.props.current_user,
      users : this.props.users,
      textHeader : 'All tickets currently listed',
      showForm : false
    }
  },

  displayAllTickets: function() {
    this.setState({
      tickets : this.props.tickets,
      textHeader : "All tickets currently listed",
      showForm : false
    })
  },

  filterByCurrentSprint: function() {
    var currentSprintTickets = []
    var tickets = this.props.tickets

    var today = new Date();
    var startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    var startDateText = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toString().split("00")[0];
    var endDateText = new Date(today.getFullYear(), today.getMonth(), today.getDate()+14).toString().split("00")[0];

    for (i = 0; i < tickets.length; i++) {
      var convertDateTimeDeadline = new Date(tickets[i].deadline)
      var timeDiff = Math.abs(today.getTime() - convertDateTimeDeadline.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

      if ((diffDays <= 14) && (startDate < convertDateTimeDeadline)) {
        currentSprintTickets.push(tickets[i])
      }
    }

    this.setState({
      tickets : currentSprintTickets,
      textHeader : "Current sprint starts on " + startDateText + "and ends " + endDateText,
      showForm : false
    })
  },

  filterByCurrentUser: function() {
    var currentUserTickets = []
    var tickets = this.props.tickets

    for (i = 0; i < tickets.length; i++) {
      if (tickets[i].owner == this.state.currentUser.name) {
        currentUserTickets.push(tickets[i])
      }
    }

    this.setState({
      tickets : currentUserTickets,
      textHeader : "My tickets",
      showForm : false
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
      textHeader : "Completed Work",
      showForm : false
    })
  },

  addNewTicket: function() {
    this.setState({
      tickets : [],
      textHeader : '',
      showForm : true
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
          {
            this.state.showForm ? <CreateNewTicket users={this.state.users} currentUser={this.state.currentUser} /> : null
          }
        </div>
      </div>
    )
  }
});

var CreateNewTicket = React.createClass({

  getInitialState: function() {
    return {
      showForm : true,
      successMessage : '',
      deadline : '01/1/2018',
      description : 'Placeholder',
      owner : 'Kris Bryant',
      storyType : 'Bug',
      points : 0
    }
  },

  handleSubmit: function(event){
    var self = this;

    event.preventDefault();
    $.ajax({
      url: '/tickets',
      method: 'POST',
      data: {"ticket": {
          state : 'Unstarted',
          completed : false,
          requester : this.props.currentUser.name,
          deadline : this.state.deadline,
          description : this.state.description,
          owner : this.state.owner,
          story_type : this.state.storyType,
          points : this.state.points
        }
      },
      success: function(data, success, xhr) {
        self.setState({
          showForm : false,
          successMessage : "Your ticket was created successfully"
        })
      }
    })
  },

  updateStoryType: function(event) {
    this.setState({
      storyType: event.target.value
    }) 
  },

  updateDescription: function(event) {
    this.setState({
      description: event.target.value
    }) 
  },

  updatePoints: function(event) {
    this.setState({
      points: event.target.value
    }) 
  },

  updateDeadline: function(event) {
    var date = new Date(event.target.value)
    this.setState({
      deadline: date
    }) 
  },

  updateOwner: function(event) {
    this.setState({
      owner: event.target.value
    }) 
  },

  render: function() {
      var users = this.props.users
      var currentUser = this.props.currentUser
      var user_names = users.map(function(result,i){
        if (result.id != currentUser.id) {
          return (
            <option key={i} value={result.name}>{result.name}</option>
          )
        }
    })

    if (this.state.showForm == true) {
      return (
        <form onSubmit={this.handleSubmit}>
        <h2>Create a new ticket</h2>
        <p>
          <label>Story type: </label>
          <select onChange={this.updateStoryType}>
            <option value="Bug">Bug</option>
            <option value="Feature">Feature</option>
            <option value="Chore">Chore</option>
            <option value="Release">Release</option>
          </select>
        </p>

        <p>
          <label>Points: </label>
          <input placeholder="ex: 15" onChange={this.updatePoints}></input>
        </p>

        <p>
          <label>Description: </label>
          <input placeholder="Description of the task" onChange={this.updateDescription}></input>
        </p>

        <p>
          <label>Deadline: </label>
          <input placeholder="mm/dd/yyyy format" onChange={this.updateDeadline}></input>
        </p>

        <p>
          <label>Owner: </label>
          <select onChange={this.updateOwner}>
            {user_names}
          </select>
        </p>

        <input type="submit" value="Submit" />
      </form>
    )
    } else {
      return (
        <p>{this.state.successMessage}</p>
      )
    }
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
        <div className="single-ticket-container" key={i}>
          <div className="ticket">
            <p className="ticket-text">Requester: {result.requester}</p>
            <p className="ticket-text">Deadline: {stripTimeZone(result)}</p>
            <p className="ticket-text">Description: {result.description}</p>
            <p className="ticket-text">Complete: {result.completed.toString()}</p>
            <p className="ticket-text">State: {result.state}</p>
            <p className="ticket-text">Story Type: {checkStoryType(result)}</p>
            <p className="ticket-text">Owner: {result.owner}</p>
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