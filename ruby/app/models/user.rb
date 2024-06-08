class User < ApplicationRecord
  has_secure_password
  has_many :help_requests, dependent: :destroy
  has_many :conversations, foreign_key: :sender_id
  has_many :messages
  validates_presence_of :email
  validates_uniqueness_of :email
  end
