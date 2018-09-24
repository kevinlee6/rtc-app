# frozen_string_literal: true

Rails.application.routes.draw do
  resources :users
  resources :conversations
  resources :messages
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/settings', to: 'users#settings'


  mount ActionCable.server => '/cable'
end
