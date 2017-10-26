require 'rails_helper'

RSpec.describe ResultsController, type: :controller do

  describe 'Get index' do 
    it 'displays all listings if they exist' do
      get :index
      response.should render_template :index
    end
  end

  describe 'GET show/:id' do 
    context 'with valid id' do 
      it 'routes to a page showing the single listing' do
        record_one = Listing.create!({title: "Hawaii Getaway"})
        get :show, id: record_one.id
        response.should render_template :show
      end
    end

    context 'with invalid id' do 
      it 'throws an error if no valid id is given' do
        expect {
          get :show, id: 5
        }.to raise_exception(ActiveRecord::RecordNotFound)
      end
    end
  end


end