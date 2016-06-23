require 'rails_helper'
require 'helpers'

RSpec.describe Api::V1::MealsController, type: :request do
  let!(:user1)  { User.create(name: 'Jan Kowalski', auth_token: 'token1') }
  let!(:user2)  { User.create(name: 'Jan Nowak', auth_token: 'token2') }
  let!(:order1) { Order.create(restaurant: 'restaurant1', status: 'in progress')}
  let!(:order2) { Order.create(restaurant: 'restaurant2', status: 'ordered')}
  let!(:order3) { Order.create(restaurant: 'restaurant3', status: 'delivered')}
  let!(:order4) { Order.create(restaurant: 'restaurant4', status: 'finalized')}
  let!(:meal1)  { Meal.create(name: 'meal1', price: 12.50, user_id: 1, order_id: 1)}
  let!(:meal2)  { Meal.create(name: 'meal2', price: 10.50, user_id: 2, order_id: 1)}
  let!(:api_endpoint) { '/api/v1/orders/' }

  describe 'GET /api/v1/orders/:id/meals' do
    before {
      get(api_endpoint + order1.id.to_s + '/meals',
          nil,
          { Authorization: "Token token=#{user1.auth_token}" })
    }

    it 'works' do
      expect(response.status).to eq(200)
    end

    it 'returns meals for active order' do
      expect(json_body.first['order_id']).to eq(meal1.order_id)
      expect(json_body.size).to eq(2)
    end
  end

  describe 'POST /api/v1/orders/:id/meals' do
    before {
      allow_any_instance_of(Api::V1::BaseController).to receive(:current_user).and_return(user1)
      post(api_endpoint + order2.id.to_s + '/meals',
           meal_params,
           { Authorization: "Token token=#{user1.auth_token}" })
    }

    let!(:meal_params) do { name: 'meal3', price: 15.50 } end

    it 'works' do
      expect(response.status).to eq(201)
    end

    it 'creates a new meal' do
      expect(json_body['user_id']).to eq(user1.id)
      expect(json_body['order_id']).to eq(order2.id)
      expect(json_body['name']).to eq('meal3')
      expect(Meal.all.size).to eq(3)
    end
  end

  describe 'PATCH /api/v1/orders/:id/meals/:id' do
    before {
      allow_any_instance_of(Api::V1::BaseController).to receive(:current_user).and_return(user1)
      patch(api_endpoint + order1.id.to_s + '/meals/' + meal1.id.to_s,
           meal_params,
           { Authorization: "Token token=#{user1.auth_token}" })
    }

    let!(:meal_params) do { name: 'meal4', price: 10.50 } end

    it 'works' do
      expect(response.status).to eq(200)
    end

    it 'updates a meal' do
      expect(json_body['name']).to eq('meal4')
    end
  end

  describe 'DELETE /api/v1/orders/:id/meals/:id' do
    before {
      delete(api_endpoint + order1.id.to_s + '/meals/' + meal1.id.to_s,
             nil,
             { Authorization: "Token token=#{user1.auth_token}" })
    }

    it 'works' do
      expect(response.status).to eq(200)
    end

    it 'deletes a meal' do
      expect(Meal.all.size).to eq(1)
    end
  end

end
