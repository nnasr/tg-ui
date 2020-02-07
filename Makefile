build-dev:
	REACT_APP_APP_URL= ###TBD###\
	REACT_APP_API_ROOT= ###TBD###\
	REACT_APP_DASHBOARD_URL= ###TBD###\
	REACT_APP_VERSION=1.0.0 \
	CI=false \
	npm run build
	aws s3 rm s3://###TBD### --recursive
	aws s3 sync build/ s3://###TBD###
	aws cloudfront create-invalidation --distribution-id=EBLMDOXMMJLUV --paths "/*"
