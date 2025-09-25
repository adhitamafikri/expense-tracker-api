PHONY: dev
dev:
	docker compose up -d

PHONY: down
down:
	docker compose down

PHONY: restart
restart:
	docker compose restart

PHONY: dev
dev:
	pnpm dev

