class MessagesController < ApplicationController
  include CurrentUserConcern

  def create
    @message = Message.new(message_params)
    @message.sender = @current_user
    @message.sent_at = Time.now

    if @message.save
      update_help_request_status(@message.help_request)
      render json: @message, status: :created
    else
      Rails.logger.error("Error creating message: #{@message.errors.full_messages.join(", ")}")
      render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    sent_messages = @current_user.sent_messages.includes(:receiver, :help_request)
    received_messages = @current_user.received_messages.includes(:sender, :help_request)

    Rails.logger.info("Sent messages: #{sent_messages.inspect}")
    Rails.logger.info("Received messages: #{received_messages.inspect}")

    render json: {
      sent_messages: sent_messages.as_json(include: { receiver: { only: [:id, :name] }, help_request: { only: [:id, :title] } }),
      received_messages: received_messages.as_json(include: { sender: { only: [:id, :name] }, help_request: { only: [:id, :title] } })
    }
  end

  def annonce_messages
    annonce_id = params[:annonce_id]
    sent_messages = @current_user.sent_messages.where(help_request_id: annonce_id).includes(:receiver, :help_request)
    received_messages = @current_user.received_messages.where(help_request_id: annonce_id).includes(:sender, :help_request)

    Rails.logger.info("Sent messages for annonce #{annonce_id}: #{sent_messages.inspect}")
    Rails.logger.info("Received messages for annonce #{annonce_id}: #{received_messages.inspect}")

    render json: {
      sent_messages: sent_messages.as_json(include: { receiver: { only: [:id, :name] }, help_request: { only: [:id, :title] } }),
      received_messages: received_messages.as_json(include: { sender: { only: [:id, :name] }, help_request: { only: [:id, :title] } })
    }
  end

  private

  def update_help_request_status(help_request)
    if help_request.messages.count >= 1
      help_request.update(status: 'fulfilled')
    end
  end

  def message_params
    params.require(:message).permit(:content, :title, :receiver_id, :help_request_id, :status, :sent_at)
  end
end
