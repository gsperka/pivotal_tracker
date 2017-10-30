require 'rails_helper'

RSpec.describe TicketsController, type: :controller do

	describe 'POST #create' do
		context "with valid attributes" do
			it "creates a new transportation" do 
				post :create , ticket:{
																state: 'Unstarted', completed: false, requester: 'Kris Bryant',
															 	description: 'This is a test', owner: "Wade Davis", story_type: "Feature",
															 	point: 5
															}
				expect(Ticket.count).to eql 1
			end
		end
	end

end