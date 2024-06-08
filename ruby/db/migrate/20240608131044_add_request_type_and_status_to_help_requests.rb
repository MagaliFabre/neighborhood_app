class AddRequestTypeAndStatusToHelpRequests < ActiveRecord::Migration[7.1]
  def change
    add_column :help_requests, :request_type, :string
    add_column :help_requests, :status, :string, default: 'unfulfilled'
  end
end

