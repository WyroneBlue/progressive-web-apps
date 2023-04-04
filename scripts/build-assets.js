import { buildJS } from './helper.js';

const RESOURCE_BASE = './resources';
const PUBLIC_BASE = './public';

const PUBLIC_ASSETS = [
    'fonts',
    'icons',
    'images',
    'manifest.json',
    'sw.js',
];

const ROOT_ASSETS = [
    'manifest.json',
    'sw.js',
];

(function() {
    PUBLIC_ASSETS.forEach((asset) => {
        buildJS([`${RESOURCE_BASE}/${asset}/**/*.*` ], `${PUBLIC_BASE}/${asset}`);
    });

    return gulp.src([
        `./resources/sw.js`,
    ])
    .pipe(minify({
        noSource: true,
        ext: {
            min: '.js'
        },
    }))
    .pipe(gulp.dest('./public'))

    // ROOT_ASSETS.forEach((asset) => {
    //     buildJS([`${RESOURCE_BASE}/${asset}`], PUBLIC_BASE, '.*');
    // });
})

// (function () {

    // return gulp.src([
    //     `./resources/sw.js`,
    // ])
    // .pipe(minify({
    //     noSource: true,
    //     ext: {
    //         min: '.js'
    //     },
    // }))
    // .pipe(gulp.dest('./public'))

    // ROOT_ASSETS.forEach((asset) => {
    //     buildJS([`${RESOURCE_BASE}/${asset}`], PUBLIC_BASE);
    // });

    // buildJS([`./resources/manifest.json`], './public');
    // buildJS([`./resources/sw.js`], './public');

    // buildJS([`${RESOURCE_BASE}/sw.js`], PUBLIC_BASE);
    // buildJS([`${RESOURCE_BASE}/manifest.js`], PUBLIC_BASE);
// })

