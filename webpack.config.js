const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production', // 또는 'development'
    entry: './src/index.tsx', // 타입스크립트 엔트리 파일 경로
    output: {
        path: path.resolve(__dirname, 'dist'), // 빌드 결과물 경로
        filename: 'bundle.js', // 번들 파일 이름
        publicPath: '/dist/', // 빌드된 파일의 공용 경로 (웹서버 루트)
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'], // 확장자를 해석하여 파일을 가져올 때 사용할 수 있는 확장자 목록
        alias: {
            '@': path.resolve(__dirname, 'src'), // 소스 코드에서 절대 경로로 참조하기 위한 별칭 설정
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, // .ts 또는 .tsx 파일 확장자에 대한 로더 설정
                use: 'ts-loader', // 타입스크립트 로더 설정
                exclude: /node_modules/, // node_modules 디렉토리 제외
            },
            {
                test: /\.scss$/, // .scss 파일 확장자에 대한 로더 설정
                use: [
                    MiniCssExtractPlugin.loader, // CSS를 별도 파일로 추출하는 로더
                    'css-loader', // CSS를 JS로 변환하는 로더
                    'sass-loader', // SCSS를 CSS로 변환하는 로더
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ // CSS를 별도 파일로 추출하기 위한 플러그인 설정
            filename: 'styles.css', // 추출된 CSS 파일 이름
        }),
    ],
};
