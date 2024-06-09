class MessagesController < ApplicationController
  before_action :authenticate_user!

  def index
    @conversation = Conversation.find(params[:conversation_id])
    @messages = @conversation.messages
    render json: @messages
  end

  def create
    conversation = Conversation.find(params[:conversation_id])
    sender = @current_user
    recipient = conversation.sender == sender ? conversation.recipient : conversation.sender
    @message = @conversation.messages.new(message_params)
    @message.user = sender

    if @message.save
      render json: @message, status: :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end


  private

  def message_params
    params.require(:message).permit(:content)
  end
end
end
