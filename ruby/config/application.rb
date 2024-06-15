require_relative "boot"

require "rails/all"
require 'rack'
require 'rack/cors'
require 'sidekiq/web'

module NeighborhoodApp
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w(assets tasks))

    config.middleware.insert_before 0, Rack::Cors do
      # allow do
      #   origins 'http://localhost:3001'  # Ajoutez l'origine de votre frontend

      #   resource '*',
      #     headers: :any,
      #     methods: [:get, :post, :put, :patch, :delete, :options, :head],
      #     credentials: true  # Permet l'envoi de cookies et autres credentials

      allow do
        origins 'https://neighborhood-app-front.onrender.com'  # Ajoutez l'origine de votre fronten
        resource '*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head],
          credentials: true  # Permet l'envoi de cookies et autres credentials
      end
    end

    # Require the gems listed in Gemfile, including any gems
    # you've limited to :test, :development, or :production.
    Bundler.require(*Rails.groups)
    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
