# frozen_string_literal: true

class MessagesController < ApiController
  # before_action :require_login
  before_action :set_message, only: %i[show update destroroy]

  # GET /messages
  def index
    @messages = current_user.messages || 'There are no messages.'

    render json: @messages
  end

  # GET /messages/1
  def show
    render json: @message
  end

  # POST /messages
  def create
    @message = Message.new(message_params)
    conversation = Conversation.find(message_params[:conversation_id])

    if @message.save
      # render json: @message, status: :created, location: @message
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        MessageSerializer.new(@message)
      ).serializable_hash
      MessagesChannel.broadcast_to conversation, serialized_data
      head :ok
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /messages/1
  def update
    if @message.update(message_params)
      render json: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /messages/1
  def destroy
    @message.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_message
    @message = Message.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def message_params
    params.require(:message).permit(:text, :conversation_id, :user_id)
  end
end
