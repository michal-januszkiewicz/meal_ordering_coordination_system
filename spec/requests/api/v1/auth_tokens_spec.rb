require 'rails_helper'
require 'helpers'

RSpec.describe Api::V1::AuthTokensController, type: :request do
  let!(:user1)  { User.create(name: 'Jan Kowalski') }
  let!(:api_endpoint) { '/api/v1/auth_tokens' }

  describe 'POST /api/v1/auth_tokens' do
    before {
      allow_any_instance_of(Api::V1::BaseController).to receive(:current_user).and_return(user1)
      allow(SecureRandom).to receive(:uuid).and_return('token')
      post(api_endpoint)
    }

    it 'works' do
      expect(response.status).to eq(201)
    end

    it 'creates auth token for current user' do
      expect(json_body['api_key']).to eq(user1.auth_token)
    end
  end
end
