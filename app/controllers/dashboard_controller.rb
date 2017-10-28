class DashboardController < ApplicationController
	before_filter :authorize
  
  def index
  	@tickets = Ticket.order(:deadline)
  end

end
