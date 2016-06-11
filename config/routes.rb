Rails.application.routes.draw do

  root to: 'application#angular'

  match "/auth/:provider/callback", to: "sessions#create", via: :all
  match "/signout" => "sessions#destroy", as: :signout, via: :all
end
