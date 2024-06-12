class MessagesController < ApplicationController
  include CurrentUserConcern

  def create
    message = Message.new(message_params)
    message.sender = @current_user
    message.sent_at = Time.now

    if message.save
      render json: message, status: :created
    else
      render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    sent_messages = @current_user.sent_messages.includes(:receiver, :help_request)
    received_messages = @current_user.received_messages.includes(:sender, :help_request)

    render json: {
      sent_messages: sent_messages.as_json(include: { receiver: { only: [:id, :name] }, help_request: { only: [:id, :title] } }),
      received_messages: received_messages.as_json(include: { sender: { only: [:id, :name] }, help_request: { only: [:id, :title] } })
    }
  end

  def user_messages
    @sent_messages = @current_user.sent_messages.includes(:receiver)
    @received_messages = @current_user.received_messages.includes(:sender)

    grouped_messages = (@sent_messages + @received_messages).group_by(&:title)

    conversations = grouped_messages.map do |title, messages|
      {
        title: title,
        messages: messages.as_json(include: { sender: { only: [:id, :name] }, receiver: { only: [:id, :name] } })
      }
    end

    render json: { conversations: conversations }
  end

  def show_conversation
    title = params[:title]
    @messages = Message.where(title: title).includes(:sender, :receiver)
    render json: @messages.as_json(include: { sender: { only: [:id, :name] }, receiver: { only: [:id, :name] } })
  end

  private

  def message_params
    params.require(:message).permit(:content, :title, :receiver_id, :status, :sent_at)
  end

  def set_current_user
    @current_user = User.find(session[:user_id])
  end
end
