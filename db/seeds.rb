puts 'Seeds: start'

5.times do |i|
  User.create!(
          name: "User #{i+1}"
  )
end

3.times do
  Order.create!(
           restaurant: "restaurant #{rand(1..10)}",
           status: 'finalized'
  )
end

Order.create!(
    restaurant: "restaurant #{rand(1..10)}",
    status: 'in progress'
)

Order.create!(
    restaurant: "restaurant #{rand(1..10)}",
    status: 'ordered'
)

Order.create!(
    restaurant: "restaurant #{rand(1..10)}",
    status: 'delivered'
)

meals = Array.new
10.times do |i|
  meals.push(
      {
          name: "meal #{i+1}",
          price: rand(10..20).to_f + rand(0..99)/100.to_f,
      }
  )
end

Order.all.each do |order|
  rand(1..5).times do |i|
    meal = meals[rand(1..10)]
    meal['user_id'] = i +1
    meal['order_id'] = order.id
    order.meals << Meal.create!(meal)
  end
end

puts 'Seeds: done'

