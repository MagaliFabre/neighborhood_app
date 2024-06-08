class ConversationsController < ApplicationController
  before_action :authenticate_user!
  include CurrentUserConcern

  def index
    @conversations = @current_user.conversations
    render json: @conversations
  end

  def show
    @conversation = Conversation.find(params[:id])
    render json: @conversation
  end
end
