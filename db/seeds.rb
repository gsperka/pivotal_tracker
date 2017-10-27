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


Ticket.create(description: "Deploy staging server", story_type: "Release")
Ticket.create(description: "Navbar bleeds off the page")
Ticket.create(description: "Create Career Cluster survey", story_type: "Feature", points: 7)
Ticket.create(description: "Write unit tests", story_type: "Chore")
Ticket.create(description: "Technical debt", story_type: "Chore")
Ticket.create(description: "Mobile text is not the correct size")
Ticket.create(description: "Create counselor dashboard", story_type: "Feature", points: 10)
Ticket.create(description: "Follow up with candidate", story_type: "Chore")
Ticket.create(description: "Update Python version", story_type: "Feature", points: 15)