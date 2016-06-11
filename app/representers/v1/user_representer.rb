class V1::UserRepresenter
  def initialize(user)
    @user = user
  end

  def basic
    {
        id: @user.id,
        name: @user.name,
    }
  end
end