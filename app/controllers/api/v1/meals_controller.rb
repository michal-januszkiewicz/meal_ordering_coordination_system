class Api::V1::MealsController < Api::V1::BaseController

  def index
    order = Order.find(params[:order_id])
    meals = order.meals
    meals = meals.map do |meal|
      ::V1::MealRepresenter.new(meal).basic
    end
    render json: meals, status: 200
  end


  def create
    order_id = params[:order_id]
    meal = Order.find(order_id).meals.build(meal_params)
    meal.user_id = current_user.id
    begin
      if meal.save!
        response = ::V1::MealRepresenter.new(meal).basic
        status = 201
      else
        response = { msg: 'Create meal failed' }
        status = 500
      end
    rescue => error
      response = { msg: error.message }
      status = 403
    end
    render json: response, status: status
  end


  def update
    order = Order.find(params[:order_id])
    meal = order.meals.find(params[:id])
    if current_user.id != meal.user_id
      response = { msg: 'Unauthorized access. Only creator of a meal can edit it' }
      status = 401
    elsif order.status != 'in progress'
      response = { msg: 'Meals in closed orders cannot be updated' }
      status = 403
    else
      meal.update_attributes(meal_params)
      response = ::V1::MealRepresenter.new(meal).basic
      status = 200
    end
    render json: response, status: status
  end


  def destroy
    order = Order.find(params[:order_id])
    meal = order.meals.find(params[:id])
    if meal.destroy!
      response = { msg: 'Meal destroyed' }
      status = 200
    else
      response = { msg: 'Destroy meal failed' }
      status = 500
    end
    render json: response, status: status
  end


  private

  def meal_params
    params.permit(:name, :price)
  end
end
