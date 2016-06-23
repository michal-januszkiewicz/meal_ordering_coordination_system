require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:user1) { User.create(name: "Jan Kowalski", auth_token: 'token') }

  it 'does not generate a new token if old one exists' do
    user1.set_api_key
    expect(user1.auth_token).to eq('token')
  end

end