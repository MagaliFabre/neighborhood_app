class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  # before_action :authenticate_user!
  # skip_before_action :verify_authenticity_token, if: :json_request?
  include CurrentUserConcern

  def authenticate_user!
    render json: { error: "You must sign in to access this page" }, status: :unauthorized unless @current_user
  end

  def logged_in?
    session[:user_id].present?
  end

  protected

  def json_request?
    request.format.json?
  end
end
