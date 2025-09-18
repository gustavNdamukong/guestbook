const path = require('path');
const webpack = require('webpack');
const Encore = require('@symfony/webpack-encore');
const HtmlWebpackPlugin = require('html-webpack-plugin');


// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

/*
 * CONFIG #1: Symfony traditional assets (CSS, Bootstrap, etc.)
 */
Encore.reset();

Encore
  .setOutputPath('public/build/')

  // public path used by the web server to access the output path
  .setPublicPath('/build')
  .cleanupOutputBeforeBuild()

  // Each line of .addEntry() will result in one JavaScript file (e.g. app.js)
  // and one CSS file (e.g. app.css) if your JavaScript imports CSS.
  .addEntry('app', './assets/app.js') // Symfony’s original assets dir
  .enableSingleRuntimeChunk()

  // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
  .splitEntryChunks()
  .enableStimulusBridge('./assets/controllers.json')
  .enableSassLoader() // enables Sass/SCSS support
  .enablePostCssLoader()
;

const symfonyConfig = Encore.getWebpackConfig();
symfonyConfig.name = 'symfony';

/*
 * CONFIG #2: SPA build (Preact/React/Vue/whatever you use)
 */
Encore.reset();

Encore
    // Let's put built SPA assets inside 'public/spa/'. Normally, the Symfony default approach is to use public/build 
    // to combine the SPA with the main Symfony app (that reads frontend assets from /public), but we want to totally 
    // separate the SPA application from the Symfony app and API, just like is common with Vue/React microservices.
    // we however want to path to still use Symfony's public dir, hence we make it use a sub dir '/spa' inside public.
  .setOutputPath('public/spa/')
  .setPublicPath('/spa')                    // 👈 the SPA URLs will be served from /spa/...       
  .cleanupOutputBeforeBuild()

  // Each line of .addEntry() will result in one JavaScript file (e.g. app.js)
  // and one CSS file (e.g. app.css) if your JavaScript imports CSS.
  .addEntry('app', './spa/src/app.js')

  // uncomment if you use React
  //.enableReactPreset()
  .enablePreactPreset()
  .enableSingleRuntimeChunk()
  .enableSourceMaps(!Encore.isProduction()) // hashed filenames in prod

  // If you use SCSS in SPA, enable Sass loader:
  .enableSassLoader() // enables Sass/SCSS support

  // Create an index.html inside (eg public/spa/index.html-useful for dev server)
  .addPlugin(new HtmlWebpackPlugin({
  	template: path.resolve(__dirname, 'spa/src/index.ejs'),
  	filename: path.resolve(__dirname, 'public/spa/index.html'), // force into public/spa
    alwaysWriteToDisk: true
  }))
  .addPlugin(new webpack.DefinePlugin({
        // expose a variable to your custom JS code (in other files) which will contain the 
        // URL string or domain name:port of your local application. You can use this same
        // approach to define any other variable to use in your custom JS files. 
        'ENV_API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT || 'https://127.0.0.1:8000'),
    }))
;

const spaConfig = Encore.getWebpackConfig();
spaConfig.name = 'spa';

module.exports = [symfonyConfig, spaConfig];

 





/*
// Here are some other Encore methods worth knowing
Encore
    // Displays build status system notifications to the user
    // .enableBuildNotifications()
    /*
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // configure Babel
    // .configureBabel((config) => {
    //     config.plugins.push('@babel/a-babel-plugin');
    // })

    // enables and configure @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.38';
    })

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()

    .addPlugin(new HtmlWebpackPlugin({ template: 'src/index.ejs', alwaysWriteToDisk: true }))
    .addPlugin(new (require('webpack/lib/LoaderOptionsPlugin'))({ options: {} }))
    .addPlugin(new HtmlWebpackHarddiskPlugin())
    .addPlugin(new webpack.DefinePlugin({
        'process.env.ENV_API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT || 'https://127.0.0.1:8000'),
    }))
;

module.exports = Encore.getWebpackConfig();
*/
