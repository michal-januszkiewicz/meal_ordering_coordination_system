class Api::V1::BaseController < ApplicationController
  # Disables CSRF protection
  skip_before_action :verify_authenticity_token
end
