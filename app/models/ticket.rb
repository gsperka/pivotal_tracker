class Ticket < ActiveRecord::Base
	before_save :check_if_completed
	has_and_belongs_to_many :users

	private

	def check_if_completed
		# It doesn't make sense to have a completed task that also has a Unstarted state
		self.state = "Accepted" if self.completed
	end

end
