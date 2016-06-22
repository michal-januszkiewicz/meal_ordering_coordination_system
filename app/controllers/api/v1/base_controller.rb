class Api::V1::BaseController < ApplicationController
  # Disable CSRF protection
  skip_before_action :verify_authenticity_token
  before_action :authenticate_api_with_token!
  helper_method :current_user

  def authenticate_api_with_token!
    authenticate_or_request_with_http_token do |token, options|
      user = User.find_by(auth_token: token)
      if user
        @current_user = user
      else
        fail 'Invalid api key'
      end
    end
  end

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end
