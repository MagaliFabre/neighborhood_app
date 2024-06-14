ActiveRecord::Schema[7.1].define(version: 2024_06_14_150900) do
  enable_extension "plpgsql"

  create_table "help_requests", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "address"
    t.float "latitude"
    t.float "longitude"
    t.bigint "user_id", null: false
    t.string "request_type"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "recycled"
    t.index ["user_id"], name: "index_help_requests_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "sender_id", null: false
    t.bigint "receiver_id", null: false
    t.text "content"
    t.datetime "sent_at"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
    t.bigint "help_request_id"
    t.index ["help_request_id"], name: "index_messages_on_help_request_id"
    t.index ["receiver_id"], name: "index_messages_on_receiver_id"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "help_requests", "users"
  add_foreign_key "messages", "help_requests"
  add_foreign_key "messages", "users", column: "receiver_id"
  add_foreign_key "messages", "users", column: "sender_id"
end
