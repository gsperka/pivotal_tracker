class Ticket < ActiveRecord::Base
	before_save :check_if_completed

	private

	def check_if_completed
		# It doesn't make sense to have a completed task that also has a Unstarted state
		self.state = "Accepted" if self.completed
	end

end
