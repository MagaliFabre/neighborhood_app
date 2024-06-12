class Message < ApplicationRecord
  belongs_to :sender, class_name: 'User', foreign_key: :sender_id
  belongs_to :receiver, class_name: 'User', foreign_key: :receiver_id
  belongs_to :help_request


  validates :sender_id, presence: true
  validates :receiver_id, presence: true
  validates :content, presence: true
  validates :title, presence: true
  validates :help_request_id, presence: true

  has_many :sent_messages, class_name: 'Message', foreign_key: 'sender_id'
  has_many :received_messages, class_name: 'Message', foreign_key: 'receiver_id'
end
