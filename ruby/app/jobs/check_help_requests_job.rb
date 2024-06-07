class CheckHelpRequestsJob < ApplicationJob
  queue_as :default

  def perform
    HelpRequest.unfulfilled.each do |help_request|
      if help_request.created_at <= 24.hours.ago
        help_request.update(status: "republish")
      end
    end
  end
end
