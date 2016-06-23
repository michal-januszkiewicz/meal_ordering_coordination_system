require 'rails_helper'
require 'helpers'

RSpec.describe Api::V1::OrdersController, type: :request do
  let!(:user1)  { User.create(name: 'Jan Kowalski', auth_token: 'token') }
  let!(:user2)  { User.create(name: 'Jan Nowak') }
  let!(:order1) { Order.create(restaurant: 'restaurant1', status: 'in progress')}
  let!(:order2) { Order.create(restaurant: 'restaurant2', status: 'ordered')}
  let!(:order3) { Order.create(restaurant: 'restaurant3', status: 'delivered')}
  let!(:order4) { Order.create(restaurant: 'restaurant4', status: 'finalized')}
  let!(:api_endpoint) { '/api/v1/orders' }

  describe 'GET /api/v1/orders - active' do
    before { get(api_endpoint,
          params = { type: 'active' },
          { Authorization: "Token token=#{user1.auth_token}" })
    }

    it 'works' do
      expect(response.status).to eq(200)
    end

    it 'return only active orders' do
      expect(json_body.first['restaurant']).to eq(order1.restaurant)
      expect(json_body.size).to eq(3)
    end

  end

  describe 'GET /api/v1/orders - history' do
    before { get(api_endpoint,
                 params = { type: 'history' },
                 { Authorization: "Token token=#{user1.auth_token}" })
    }

    it 'works' do
      expect(response.status).to eq(200)
    end

    it 'return only history orders' do
      expect(json_body.size).to eq(1)
      expect(json_body.first['restaurant']).to eq(order4.restaurant)
    end
  end


  describe 'POST /api/v1/orders' do
    before {
      allow_any_instance_of(Api::V1::BaseController).to receive(:current_user).and_return(user1)
      post(api_endpoint,
           order_params,
           { Authorization: "Token token=#{user1.auth_token}" })
    }

    let!(:order_params) do { restaurant: 'restaurant5' } end

    it 'works' do
      expect(response.status).to eq(201)
    end

    it 'creates a new order' do
      order = Order.last
      expect(order.user_id).to eq(user1.id)
      expect(order.restaurant).to eq('restaurant5')
      expect(order.status).to eq('in progress')
      expect(Order.all.size).to eq(5)
    end

  end

  describe 'PATCH /api/v1/orders' do
    before {
      patch(api_endpoint + '/' + order1.id.to_s,
           order_params,
           { Authorization: "Token token=#{user1.auth_token}" })
    }

    let!(:order_params) do { status: 'finalized' } end

    it 'works' do
      expect(response.status).to eq(200)
    end

    it 'updates an order' do
      order = Order.first
      expect(order.status).to eq('finalized')
    end
  end

  describe 'DELETE /api/v1/orders' do
    before {
      delete(api_endpoint + '/' + order1.id.to_s,
            nil,
            { Authorization: "Token token=#{user1.auth_token}" })
    }

    let!(:order_params) do { status: 'finalized' } end

    it 'works' do
      expect(response.status).to eq(200)
    end

    it 'deletes an order' do
      expect(Order.all.size).to eq(3)
    end
  end

end
