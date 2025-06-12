B1:
yarn init
yarn add path
yarn add express
yarn add --dev jest supertest
yarn add cors
B2:
Thêm dòng sau vào script của package.json: "test": "jest"
Chạy test: yarn test
Run server: node calculate.js
Run test:

API for calculate: http://localhost:3000?&number1=1&number2=2&operator=plus

Workflow CI/CD:

- Push code lên GitHub.
- GitHub Actions sẽ tự động chạy workflow CI/CD.
- CI/CD gọi Render deploy lại app API backend.
- API sẽ có dạng: https://calc-api.onrender.com
