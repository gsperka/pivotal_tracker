require 'rails_helper'

RSpec.describe Ticket, type: :model do
  
	describe 'check_if_completed' do 
		it 'assigns a state of Accepted if the ticket is completed' do 
			record_one = Ticket.create!({state: 'Unstarted', completed: true})
			expect(record_one.state).to eql "Accepted"
		end
  end  

end
