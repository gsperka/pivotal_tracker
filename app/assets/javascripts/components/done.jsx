var Tickets = React.createClass({
  render: function() {
    return (
      <div>
        <Done tickets={this.props.tickets} />
      </div>
    )
  }
});

var Done = React.createClass({
  render: function() {
  	var tickets = this.props.tickets
    var all_tickets = tickets.map(function(result,i){
      return (
        <div key={i} className="ticket">
          <p className="ticket-text">State: {result.state}</p>
          <p className="ticket-text">Story Type: {result.story_type}</p>
          <p className="ticket-text">Description: {result.description}</p>
          <p className="ticket-text">Requester: {result.requester}</p>
          <p className="ticket-text">Deadline: {result.deadline}</p>
          <p className="ticket-text">Owners: {result.owners}</p>
        </div>
      )
  	})
  	return <div>{all_tickets}</div>
	}
});