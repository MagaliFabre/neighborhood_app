module CurrentUserConcern
  extend ActiveSupport::Concern

    included do
      before_action :set_current_user
    end

    def set_current_user
      puts("HELLO I AM BROKEN", session[:user_id])
      if session[:user_id]
        @current_user = User.find(session[:user_id])
      else
        @current_user = nil
      end
  end
end
