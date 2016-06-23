require 'rails_helper'
require 'helpers'

RSpec.describe Api::V1::UsersController, type: :request do
  let!(:user1) { User.create(name: 'Jan Kowalski', auth_token: 'token') }
  let!(:user2) { User.create(name: 'Jan Nowak') }
  let!(:api_endpoint) { '/api/v1/users' }

  describe 'GET /api/v1/users' do
    before { get(api_endpoint, nil, { Authorization: "Token token=#{user1.auth_token}" }) }

    it 'works' do
      expect(response.status).to eq(200)
    end

    it 'returns array of users' do
      expect(json_body.size).to eq(2)
      expect(json_body.first['name']).to eq(user1.name)
    end
  end

end

