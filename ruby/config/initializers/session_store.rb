if Rails.env == "production"
  # Rails.application.config.session_store :cookie_store, key: "_authentication_app", domain: "neighborhood-authentication-app-api.herokuapp.com"
  # Rails.application.config.session_store :cookie_store, key: "_authentication_app", domain: "localhost"
  Rails.application.config.session_store :cookie_store, key: "_authentication_app", domain: "neighborhood_app_front"

else
  Rails.application.config.session_store :cookie_store, key: "_authentication_app"
end
