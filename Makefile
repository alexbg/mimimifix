default:
	npm install
	@if [ ! -d "dist" ]; then\
		mkdir dist;\
	fi
	npm run webpack