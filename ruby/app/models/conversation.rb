class Conversation < ApplicationRecord
  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User"
  validates :volunteer_id, presence: true
  validates :request_id, presence: true
  has_many :messages, dependent: :destroy
end
