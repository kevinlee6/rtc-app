# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  has_secure_token
  has_many :messages
  has_many :conversations, through: :messages
  validates_uniqueness_of :username
  validates_uniqueness_of :email

  def invalidate_token
    update_columns(token: nil)
  end

  def self.valid_login?(username, password)
    user = find_by(username: username)
    if user && user.authenticate(password)
      user
    end
  end
end
