class User < ActiveRecord::Base
  has_many :orders
  has_many :meals

  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.name = auth["info"]["name"]
    end
  end

  def set_api_key
    set_auth_token
  end

  private

  def set_auth_token
    return if auth_token.present?
    self.auth_token = generate_auth_token
    self.save
  end

  def generate_auth_token
    SecureRandom.uuid.gsub(/\-/,'')
  end
end
