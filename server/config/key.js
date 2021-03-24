//개발 환경에 따라 파일 import 를 다르게 해줌
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}