Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['CONSUMER_KEY'], ENV['CONSUMER_SECRET']
end