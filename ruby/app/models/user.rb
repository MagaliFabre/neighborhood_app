class User < ApplicationRecord
  has_secure_password
  has_many :help_requests, dependent: :destroy
  has_many :conversations, foreign_key: :sender_id
  has_many :messages
  has_many :sent_conversations, foreign_key: :sender_id, class_name: "Conversation"
  has_many :received_conversations, foreign_key: :recipient_id, class_name: "Conversation"

  validates :email, presence: true, uniqueness: true
end
