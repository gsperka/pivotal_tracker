class TicketsController < ApplicationController

	def new
	end

	def create
		@new_ticket = Ticket.create(ticket_params)
		if @new_ticket.save
			redirect_to '/dashboard'
		else
			render '/dashboard' 
		end
	end

	 private

  def ticket_params
    params.require(:ticket).permit(:state, :completed, :requester, :description, :deadline, :owner, :story_type, :points)
  end

end