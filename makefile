
#버전관리
release-version:
	(node_modules/.bin/standard-version)
	git push --follow-tags origin main


increas-major-version :
	npm run release -- --release-as major
	git push --follow-tags origin 

increas-minor-version :
	npm run release -- --release-as minor
	git push --follow-tags origin 