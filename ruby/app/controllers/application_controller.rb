class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  include CurrentUserConcern

  def logged_in?
    session[:user_id].present?
  end
end
