Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  root to: "static#home"

  resources :help_requests, controller: 'help_requests', only: [:create, :show, :update, :destroy, :index]

  resources :conversations, only: [:index, :show, :create] do
    resources :messages, only: [:index, :create]
  end

  resources :help_requests do
    post 'volunteer', to: 'help_requests#volunteer'
  end

  get "up" => "rails/health#show", as: :rails_health_check
  mount Sidekiq::Web => '/sidekiq'
end
