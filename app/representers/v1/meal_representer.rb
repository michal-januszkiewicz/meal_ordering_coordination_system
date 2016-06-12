class V1::MealRepresenter
  def initialize(meal)
    @meal = meal
  end

  def basic
    {
        id: @meal.id,
        name: @meal.name,
        price: @meal.price,
        user_id: @meal.user_id,
        order_id: @meal.order_id,
    }
  end
end
