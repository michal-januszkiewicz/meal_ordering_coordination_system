class Meal < ActiveRecord::Base
  belongs_to :user
  belongs_to :order

  validates :user_id, uniqueness: {
      scope: :order_id,
      message: 'Users can add only one meal per order',
  }

end
