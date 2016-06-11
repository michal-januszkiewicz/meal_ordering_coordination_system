class V1::OrderRepresenter
  def initialize(order)
    @order = order
  end

  def basic
    {
        id: @order.id,
        restaurant: @order.restaurant,
        status: @order.status,
        user_id: @order.user_id,
        meals: @order.meals,
    }
  end
end
