class V1::SessionRepresenter
  def initialize(user)
    @user = user
  end

  def basic
    {
        id: @user.id,
        api_key: @user.auth_token,
    }
  end
end
