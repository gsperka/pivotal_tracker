require 'rails_helper'

RSpec.describe Listing, type: :model do
  describe '#self.by_tiebreaker_score' do 
    it 'orders the query by the tiebreaker_sort value (descending)' do 
      record_one = Listing.create!({tiebreaker_sort: 0.0375771})
      record_two = Listing.create!({tiebreaker_sort: 0.5954354})
      expect(Listing.by_tiebreaker_score.first.tiebreaker_sort).to eql 0.5954354
    end
  end


end