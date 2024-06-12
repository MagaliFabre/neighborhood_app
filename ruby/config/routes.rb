Rails.application.routes.draw do
  # Sessions and Registrations routes
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]

  # Help Requests routes
  resources :help_requests, only: [:create, :show, :update, :destroy, :index] do
    member do
      post 'create_message_flow'
    end
  end

  # Messages routes
  resources :messages, only: [:create, :index, :show] do
    collection do
      get 'annonce_messages'
    end
    member do
      get 'messages', to: 'messages#show_conversation', as: 'conversation'
    end
  end

  # Logout and Logged-in routes
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"

  # Static home page route
  root to: "static#home"

  # User routes
  resources :users, only: [:index] do
    member do
      get 'chatrooms'
    end
  end

  # Nested resource for annonces with messages
  resources :annonces do
    resources :messages, only: [:create, :index] do
      collection do
        get 'annonce_messages'
      end
    end
  end
end
