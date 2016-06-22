class Api::V1::AuthTokensController < Api::V1::BaseController
  skip_before_action :authenticate_api_with_token!, only: [:create]

  def create
    if current_user
      current_user.set_api_key
      session = ::V1::SessionRepresenter.new(current_user).basic
      render json: session
    else
      render json: {msg: 'There is no current user'}, status: 404
    end
  end

end
