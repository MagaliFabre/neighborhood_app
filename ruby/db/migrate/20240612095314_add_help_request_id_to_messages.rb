class AddHelpRequestIdToMessages < ActiveRecord::Migration[7.1]
  def change
    add_reference :messages, :help_request, foreign_key: true
  end
end
