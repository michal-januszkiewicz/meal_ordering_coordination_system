class Api::V1::MealsController < Api::V1::BaseController
  
  def create
    order_id = params[:order_id]
    meal = Order.find(order_id).meals.build(meal_params)
    meal.user_id = current_user.id
    meal.save!
    render json: ::V1::MealRepresenter.new(meal).basic, status: 201
  end

  private

  def meal_params
    params.permit(:name, :price)
  end
end
