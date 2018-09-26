# frozen_string_literal: true

class ConversationsController < ApiController
  before_action :require_login
  before_action :set_conversation, only: %i[show update destroy]

  # GET /conversations
  def index
    @conversations = Conversation.all

    render json: @conversations
  end

  def subscribed
    user = User.find_by_token!(request.headers[:token])
    conversations = user.conversations.uniq

    render json: conversations
  end

  def private

  end

  # GET /conversations/1
  # def show
  #   render json: @conversation
  # end

  # def messages
  #   @conversation = Conversation.find(params[:conversation_id])
  #   render json: @conversation.messages
  # end

  # POST /conversations
  def create
    @conversation = Conversation.new(conversation_params)

    if @conversation.save
      # render json: @conversation, status: :created, location: @conversation
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        ConversationSerializer.new(@conversation)
      ).serializable_hash
      ActionCable.server.broadcast 'conversations_channel', serialized_data
      head :ok
    else
      render json: @conversation.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /conversations/1
  def update
    if @conversation.update(conversation_params)
      render json: @conversation
    else
      render json: @conversation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /conversations/1
  def destroy
    @conversation.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_conversation
    @conversation = Conversation.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def conversation_params
    params.require(:conversation).permit(:title)
  end
end
