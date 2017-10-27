class Ticket < ActiveRecord::Base
	attr_accessor :id, :story_type, :description
	has_and_belongs_to_many :users

	before_create :set_default_deadline
	validates :story_type,  :inclusion => { :in => [ 'Feature', 'Bug', 'Chore', 'Release'], 
                          :message => "%{value} is not a valid story type" }

  def set_default_deadline
  	# Sets default deadline randomly within two weeks from when created
    self.deadline = Time.now + (60 * rand(60) * 24 * 7 * 2) 
  end

end
