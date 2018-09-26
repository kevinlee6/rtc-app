class MessageSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :conversation_id, :text, :username, :created_at
end
