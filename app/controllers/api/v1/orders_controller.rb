class Api::V1::OrdersController < Api::V1::BaseController
  def index
    orders = Order.all
    orders = orders.map do |order|
      ::V1::OrderRepresenter.new(order).basic
    end
    render json: orders
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
end
