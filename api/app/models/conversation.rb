# frozen_string_literal: true

class Conversation < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_many :users, through: :messages
  validates :title, presence: true
end
