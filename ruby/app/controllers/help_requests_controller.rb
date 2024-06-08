require 'geocoder'

class HelpRequestsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_help_request, only: [:show, :update, :destroy, :create]

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
    # Mettez votre logique pour vérifier si l'utilisateur est connecté ici
    # Par exemple, vous pouvez vérifier si session[:user_id] est défini
    session[:user_id].present?
  end
end
  # Use callbacks to share common setup or constraints between actions.
  def set_help_request
    @help_request = HelpRequest.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def help_request_params
    params.require(:help_request).permit(:title, :description, :address, :request_type, :status)
  end
