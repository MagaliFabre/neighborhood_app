class SessionsController < ApplicationController
  include CurrentUserConcern
  protect_from_forgery with: :null_session
  # skip_before_action :authenticate_user!, only: [:create, :logged_in]

  def create
    user = User.find_by(email: params["user"]["email"])
    # .try(:authenticate, params["user"]["password"])
    if user && user.authenticate(params[:user][:password])
      session[:user_id] = user.id
      render json: {
        status: :created,
        logged_in: true,
        user: user
      }
    else
      render json: { status: 401 }
    end
  end

  def logged_in
    if @current_user
      render json: {
        logged_in: true,
        user: @current_user
      }
    else
      render json: {
        logged_in: false
      }
    end
  end

  def logout
    reset_session
    render json: { status: 200, logged_out: true }
  end
end
