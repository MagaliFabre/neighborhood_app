class HelpRequest < ApplicationRecord
  belongs_to :user

  # Validation des attributs
  validates :title, presence: true, length: { maximum: 100 }
  validates :description, presence: true, length: { maximum: 300 }
  validates :address, presence: true
  validates :request_type, presence: true, inclusion: { in: ['material-assistance', 'human-assistance'] }
  validates :status, presence: true, inclusion: { in: ['fulfilled', 'unfulfilled'] }

  # Ajout de la logique de géocodage
  before_validation :geocode_address

  private

  def geocode_address
    result = Geocoder.search(self.address).first
    if result
      self.latitude = result.latitude
      self.longitude = result.longitude
    else
      errors.add(:address, "could not be geocoded")
      throw(:abort)
    end
  end
end
