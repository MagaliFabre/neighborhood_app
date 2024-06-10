require 'test_helper'

class HelpRequestTest < ActiveSupport::TestCase
  def setup
    @help_request_one = help_requests(:one)
    @help_request_two = help_requests(:two)
  end

  test "should be valid" do
    assert @help_request_one.valid?
    assert @help_request_two.valid?
  end

  test "should belong to user" do
    assert_equal users(:one), @help_request_one.user
    assert_equal users(:two), @help_request_two.user
  end
end
