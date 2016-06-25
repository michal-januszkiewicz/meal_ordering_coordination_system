class UserMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def meal_delivered_email(meal)
    @user = meal.user
    if @user.try(:email)
      @meal = meal
      mail(to: @user.email, subject: 'Your meal has arrived')
    end
  end
end
