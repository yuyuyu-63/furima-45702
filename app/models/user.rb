class User < ApplicationRecord
  # Devise のモジュール
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # パスワード: 半角英数字混合
  VALID_PASSWORD_REGEX = /\A(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+\z/

  # 名前: 全角(漢字・ひらがな・カタカナ)
  VALID_NAME_REGEX = /\A[ぁ-んァ-ヶ一-龥々ー]+\z/

  # フリガナ: 全角カタカナ
  VALID_KANA_REGEX = /\A[ァ-ヶー－]+\z/

  # パスワード（半角英数字混合）
  validates :password,
            format: { with: VALID_PASSWORD_REGEX,
                      message: 'は半角英数字混合で入力してください' },
            allow_nil: true  # 編集時など password 入力しないとき用

  # ニックネーム
  validates :nickname, presence: true

  # 名前（全角）
  validates :last_name,  presence: true, format: { with: VALID_NAME_REGEX }
  validates :first_name, presence: true, format: { with: VALID_NAME_REGEX }

  # フリガナ（全角カタカナ）
  validates :last_name_kana,  presence: true, format: { with: VALID_KANA_REGEX }
  validates :first_name_kana, presence: true, format: { with: VALID_KANA_REGEX }

  # 誕生日
  validates :birthday, presence: true

  
  has_many :items
  has_many :orders

end
