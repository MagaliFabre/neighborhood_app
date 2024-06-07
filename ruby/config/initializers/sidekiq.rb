require 'sidekiq'
require 'sidekiq-cron'
require 'yaml'

Sidekiq.configure_server do |config|
  config.on :startup do
    schedule_file = File.expand_path('../sidekiq_schedule.yml', __FILE__)

    if File.exist?(schedule_file)
      Sidekiq::Cron::Job.load_from_hash YAML.load_file(schedule_file)
    end
  end
end
