Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  resources :help_requests, only: [:create, :show, :update, :destroy, :index] do
    member do
      post 'create_message_flow'
    end
  end

  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  root to: "static#home"

  resources :messages, only: [:index, :create]
  resources :users, only: [:index] do
    member do
      get 'chatrooms'
    end
  end
  resources :chatrooms, only: [:index, :create, :show]

  mount ActionCable.server => '/cable'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  mount Sidekiq::Web => '/sidekiq'
end
