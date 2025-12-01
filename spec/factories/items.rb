FactoryBot.define do
  factory :item do
    name                   { "テスト商品" }
    description            { "これはテスト用の商品説明です。" }
    category_id            { 2 }
    status_id              { 2 }
    shipping_fee_status_id { 2 }
    prefecture_id          { 2 }
    scheduled_delivery_id  { 2 }
    price                  { 500 }
    association :user

    after(:build) do |item|
      item.image.attach(io: File.open('public/images/test_image.png'), filename: 'test_image.png')
    end
  end
end
