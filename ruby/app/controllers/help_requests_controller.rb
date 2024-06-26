require 'geocoder'

class HelpRequestsController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :authenticate_user!, only: [:show, :index]
  before_action :set_help_request, only: [:show, :update, :destroy]

  # POST /help_requests
  def index
    @help_requests = HelpRequest.all
    render json: @help_requests
  end

  def create
    address = params[:help_request][:address]

    # Utiliser Geocoder pour obtenir les coordonnées géographiques de l'adresse
    result = Geocoder.search(address).first
    if result
      latitude = result.latitude
      longitude = result.longitude

      # Créer la demande d'aide avec les coordonnées géographiques
      @help_request = @current_user.help_requests.new(help_request_params)
      @help_request.latitude = latitude
      @help_request.longitude = longitude

      # Sauvegarder la demande d'aide
      if @help_request.save
        render json: @help_request, status: :created
      else
        render json: @help_request.errors, status: :unprocessable_entity
      end
    else
      render json: { error: 'Invalid address' }, status: :unprocessable_entity
    end
  end

  # POST /help_requests/create_chat_or_message_flow
  def create_message_flow
    # Logique pour créer un flux de messages
    @help_request = HelpRequest.find(params[:id])
    # Assurer validations et les permissions sont vérifiées ici
    @message_flow = @help_request.message_flows.create(user: current_user)

    if @message_flow.persisted?
      render json: { message_flow_id: @message_flow.id }, status: :created
    else
      render json: { errors: @message_flow.errors.full_messages }, status: :unprocessable_entity
    end
  end


  # GET /help_requests/:id
  def show
    render json: @help_request
  end

  # PATCH/PUT /help_requests/:id
  def update
    if @help_request.update(help_request_params)
      render json: @help_request
    else
      render json: @help_request.errors, status: :unprocessable_entity
    end
  end

  # DELETE /help_requests/:id
  def destroy
    @help_request.destroy
    head :no_content
  end

  private

  def authenticate_user!
    unless logged_in?
      render json: { error: 'You must sign in to access this page' }, status: :unauthorized
    end
  end

  def logged_in?
    session[:user_id].present?
  end

  def set_help_request
    @help_request = HelpRequest.find(params[:id])
  end

  def help_request_params
    params.require(:help_request).permit(:title, :description, :address, :request_type, :status, :recycled)
  end
end
