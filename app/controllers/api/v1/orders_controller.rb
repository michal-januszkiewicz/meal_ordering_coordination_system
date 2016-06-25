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
    order = current_user.orders.build(create_params)
    order.status = 'in progress'
    if order.save!
      response = ::V1::OrderRepresenter.new(order).basic
      status = 201
    else
      response = { msg: 'Create order failed' }
      status = 500
    end
    render json: response, status: status
  end


  def update
    order = Order.find(params[:id])
    if order.update_attributes(update_params)
      if update_params[:status] == 'delivered'
        order.meals.each do |meal|
          UserMailer.meal_delivered_email(meal).deliver_now
        end
      end
      response = ::V1::OrderRepresenter.new(order).basic
      status = 200
    else
      response = { msg: 'Update order failed' }
      status = 500
    end
    render json: response, status: status
  end


  def destroy
    order = Order.find(params[:id])
    if order.destroy!
      response = { msg: 'Order destroyed' }
      status = 200
    else
      response = { msg: 'Destroy order failed' }
      status = 500
    end
    render json: response, status: status
  end


  private

  def create_params
    params.permit(:restaurant)
  end


  def index_params
    params.permit(:type)
  end


  def update_params
    params.permit(:restaurant, :status)
  end

end
