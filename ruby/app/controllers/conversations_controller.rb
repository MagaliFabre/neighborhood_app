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

  def create
    recipient = User.find(params[:recipient_id])
    @conversation = Conversation.create(sender: @current_user, recipient: recipient)

    if @conversation.save
      render json: @conversation, status: :created
    else
      render json: @conversation.errors, status: :unprocessable_entity
    end
  end
end

private

  def conversation_params
    params.require(:conversation).permit(:volunteer_id, :request_id)
  end
end
