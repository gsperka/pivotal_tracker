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
        <div key={i} className="result">
          <h2>ID: {result.id}</h2>
            
          <h3>Story Type: {result.story_type}</h3>

          <h3>Description: result.description</h3>
        </div>
      )
  	})
  	return <div>{all_tickets}</div>
	}
});