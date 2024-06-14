class AddRecycledToHelpRequest < ActiveRecord::Migration[7.1]
  def change
    add_column :help_requests, :recycled, :boolean
  end
end
