Rails.application.routes.draw do

  root to: 'application#angular'

  match "/auth/:provider/callback", to: "sessions#create", via: :all
  match "/signout" => "sessions#destroy", as: :signout, via: :all

  namespace :api do
    namespace :v1 do
      resources :auth_tokens, only: [:create]
      resources :users, only: [:index]
      resources :orders, only: [:index, :create, :update, :destroy] do
        resources :meals, only: [:index, :create, :update, :destroy]
      end
    end
  end
end
