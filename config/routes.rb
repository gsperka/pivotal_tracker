Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/dashboard' => 'dashboard#index'
  post '/ticket/:id' => 'tickets#new'
  get '/ticket/:id' => 'tickets#show'

  root 'sessions#new'

end
