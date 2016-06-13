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
    meal.save!
    render json: ::V1::MealRepresenter.new(meal).basic, status: 201
  end

  def update
    order = Order.find(params[:order_id])
    meal = order.meals.find(params[:id])
    if current_user.id == meal.user_id
      meal.update_attributes(meal_params)
      render json: ::V1::MealRepresenter.new(meal).basic, status: 200
    end
  end

  private

  def meal_params
    params.permit(:name, :price)
  end
end
