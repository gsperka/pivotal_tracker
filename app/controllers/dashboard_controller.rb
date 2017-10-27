class DashboardController < ApplicationController
	before_filter :authorize
  
  def index
  	@tickets = Ticket.all()
  end

end
