class User < ActiveRecord::Base
	has_secure_password
	has_and_belongs_to_many :tickets
	
	def User.digest(string)
  	cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                BCrypt::Engine.cost
  	BCrypt::Password.create(string, cost: cost)
	end
end
