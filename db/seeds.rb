# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(name: 'Kris Bryant', email: 'kb@gmail.com', password_digest: User.digest('password1'))
User.create(name: 'Anthony Rizzo', email: 'ar@gmail.com', password_digest: User.digest('password2'))
User.create(name: 'Jake Arieta', email: 'ja@gmail.com', password_digest: User.digest('password3'))
User.create(name: 'Wade Davis', email: 'wd@gmail.com', password_digest: User.digest('password4'))
User.create(name: 'Kyle Hendricks', email: 'kh@gmail.com', password_digest: User.digest('password5'))

def deadline_in_the_past
	Faker::Date.between(1.year.ago, 10.days.ago)
end

def deadline_in_the_future
	Faker::Date.forward(rand(20..30))
end

def deadline_in_current_sprint
	Faker::Date.between_except(7.days.ago, 7.days.from_now, Date.today)
end

user_name_array = User.all.each_with_object([]) {|user, user_name_array| user_name_array << user.name}
state = ["Started", "Unstarted", "Accepted"]
story_type = ["Release", "Feature", "Chore", "Bug"]
completed = [true, false]

100.times {
	random_deadline = [deadline_in_the_past, deadline_in_the_future, deadline_in_current_sprint]
	Ticket.create(
		description: Faker::Hacker.say_something_smart,
		state: state.sample,
		story_type: story_type.sample,
		completed: completed.sample,
		requester: user_name_array.sample,
		points: rand(21),
		deadline: random_deadline.sample
	)
}