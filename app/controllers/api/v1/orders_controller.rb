class Api::V1::OrdersController < Api::V1::BaseController
  def index
    orders = Order.all
    orders = orders.map do |order|
      ::V1::OrderRepresenter.new(order).basic
    end
    active, history = orders.partition{|order| order[:status] == 'in progress'}
    orders = {
        active: active,
        history: history,
    }
    render json: orders[index_params[:type].to_sym]
  end

  def create
    order = current_user.orders.build(order_params)
    order.status = 'in progress'
    order.save!
    render json: ::V1::OrderRepresenter.new(order).basic, status: 201
  end

  private

  def order_params
    params.permit(:restaurant)
  end

  def index_params
    params.permit(:type)
  end
end
