build:
	docker-compose up -d db
	docker compose build --build-arg RAILS_MASTER_KEY=$(shell cat ./ruby/config/master.key)
	docker-compose run --rm backend bundle exec rake db:migrate db:fixtures:load
	docker-compose up