# Queue Manager
<img src="https://user-images.githubusercontent.com/25225028/89762507-89312f00-db2b-11ea-813a-9b0c73d92234.png" width="200"/>

**ブラウザ上で動作する整理券式の順番管理システム**  

COVID-19の感染拡大は収束の兆しを見せませんが、経済活動の再開は着実に進んでいます。その中で求めらるのは「いかに３密を避けながら再開するか」。お店によっては多くのお客さんが集まりで店先に行列ができてしまい、整理券を配布するなどして大人数の集中を避けるなど工夫が必要です。そこで、このWebアプリはお手持ちのスマホだけで順番を管理するシステムを提供します。整理券の発券装置など導入に必要な器具は一切なし！順番の管理はすべて電子的に行われ、人と人の接触もありませんので濃厚接触の回避にも役立ちます。  

<img src="https://user-images.githubusercontent.com/25225028/89763352-4a9c7400-db2d-11ea-8252-fbe9bdb2b034.png" width="600" />

## サービスの構成
ブラウザ上のWebアプリ本体以外に、順番を記録するデータベース・データベースを読み書きするAPIサーバ・ユーザ認証を行う外部サービス（[Firebase](https://firebase.google.com/)）から構成されます。

<img src="https://user-images.githubusercontent.com/25225028/89763788-3016ca80-db2e-11ea-9e35-3f24e3ca2719.jpg" style="width:100%;" />

## ユーザ認証
本サービスの正常な運用に対する脅威として、悪意あるデータの書き込み・消去などの荒し行為が懸念されます。そこで、本アプリではユーザ認証機能を加えることでデータ操作を記録します。自分が作成した待ち行列や順番を他人が勝手に操作することは出来ません。  

<img src="https://user-images.githubusercontent.com/25225028/89764580-a49e3900-db2f-11ea-8e16-b35cb5726fbe.png"  width="600" />


# Default README
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
