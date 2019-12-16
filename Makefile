build-dev:
	REACT_APP_APP_URL=https://occurrence-dev.openpharma.io \
	REACT_APP_API_ROOT=https://api.openpharma.io/ce/v1/ai/tg \
	REACT_APP_DASHBOARD_URL=https://my-dev.openpharma.io \
	REACT_APP_VERSION=1.0.0 \
	CI=false \
	npm run build
	aws s3 rm s3://occurrence-dev.openpharma.io --recursive
	aws s3 sync build/ s3://occurrence-dev.openpharma.io
	aws cloudfront create-invalidation --distribution-id=EBLMDOXMMJLUV --paths "/*"
