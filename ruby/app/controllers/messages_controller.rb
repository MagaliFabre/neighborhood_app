class MessagesController < ApplicationController
  def create
    message = Message.new(message_params)
    chatroom = Chatroom.find(params[:chatroom_id])
    message.chatroom = chatroom
    message.user = current_user

    if message.save
      ChatroomsChannel.broadcast_to chatroom, message: render_message(message)
      head :ok
    else
      render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end

  def render_message(message)
    ApplicationController.render(partial: 'messages/message', locals: { message: message })
  end
end
