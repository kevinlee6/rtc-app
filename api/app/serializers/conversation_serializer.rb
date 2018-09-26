class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :title, :privacy
  has_many :messages
end
