all: install build preview

install:
	@echo "Installing dependencies..."
	pnpm install

build:
	@echo "Building the project..."
	pnpm run build

preview:
	@echo "Previewing the project..."
	pnpm run preview

dev:
	@echo "Starting development server..."
	pnpm run dev

.PHONY: all install build preview dev