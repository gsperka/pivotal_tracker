class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.string :state, :default => "Unstarted"
      t.boolean :completed, :default => false
      t.string :requester
      t.datetime :deadline
      t.string :description
      t.text  :owners, array: true, default: ["None"]
      t.string :story_type, :default => "Bug"
      t.integer :points, :default => 0

      t.timestamps null: false
    end
  end
end
