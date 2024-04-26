class RegistrationsController < ApplicationController
  def createuser = User.create!(
    email: params['user']['email'],
    password: params['user']['password']
    password_confirmation: params['user']['password_confirmation']
  )

  if user
    session[:user_ud] = user.id
    render json: {
      status: :created,
      user: user
    }
  else
    render json: {status: 500 }
  end
end
