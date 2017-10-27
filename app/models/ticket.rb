class Ticket < ActiveRecord::Base
	before_save :set_default_deadline, :assign_random_requester

	private

  def set_default_deadline
  	# Sets default deadline randomly within two weeks from when created
    self.deadline = Time.now + (60 * rand(60) * 24 * 7 * 2) 
  end
  	# Sets default requester
  def assign_random_requester
  	total_users = User.count
  	self.requester = User.all[rand(total_users)].name
  end

end
