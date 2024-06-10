class CreateHelpRequests < ActiveRecord::Migration[7.1]
  def change
    create_table :help_requests do |t|
      t.string :title
      t.text :description
      t.string :address
      t.float :latitude
      t.float :longitude
      t.references :user, null: false, foreign_key: true
      t.string :request_type
      t.string :status

      t.timestamps
    end
  end
end
