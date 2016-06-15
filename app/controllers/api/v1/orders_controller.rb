class Api::V1::OrdersController < Api::V1::BaseController
  def index
    orders = Order.all
    orders = orders.map do |order|
      ::V1::OrderRepresenter.new(order).basic
    end
    history, active = orders.partition{|order| order[:status] == 'finalized'}
    orders = {
        active: active,
        history: history,
    }
    render json: orders[index_params[:type].to_sym], status: 200
  end

  def create
    order = current_user.orders.build(order_params)
    order.status = 'in progress'
    if order.save!
      render json: ::V1::OrderRepresenter.new(order).basic, status: 201
    else
      render json: {
          msg: 'Create order failed'
      }, status: 500
    end
  end

  def update
    order = Order.find(params[:id])
    if order.update_attributes(update_params)
      render json: ::V1::OrderRepresenter.new(order).basic, status: 200
    else
      render json: {
          msg: 'Update order failed'
      }, status: 500
    end
  end

  def destroy
    order = Order.find(params[:id])
    if order.destroy!
      render json: {}, status: 200
    else
      render json: {
          msg: 'Destroy order failed'
      }, status: 500
    end
  end


  private

  def order_params
    params.permit(:restaurant)
  end

  def index_params
    params.permit(:type)
  end

  def update_params
    params.permit(:restaurant, :status)
  end
end
