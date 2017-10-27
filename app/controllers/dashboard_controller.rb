class DashboardController < ApplicationController
	before_filter :authorize
  
  def index
  	@tickets = Ticket.all()
  	@current_user_tickets = Ticket.where(id: @current_user.id)
  end

end
