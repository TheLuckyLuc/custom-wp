# Brace Starter WP Theme

## Supports (so far)

:heavy_check_mark: Tailwind

:heavy_check_mark: Sass

:heavy_check_mark: TypeScript

:heavy_check_mark: Hot Module Replacement (updates JS & CSS without having to reload the browser). Any PHP file changes will cause a full page reload.

:heavy_check_mark: SVG Sprites

## Scripts

#### Make sure all dependencies are installed first

> npm i

#### For development

> npm run dev

#### For production

> npm run build

(You'll want to make sure you run the build script before putting anything live if you're using Tailwind, as this will purge any unused classes, which will otherwise massively bloat your project).

## Intended "src" folder structure

    src
     - img
     - svg
        | inline (in case you want to inline any SVG files via JS)
     - js
     - sass
     - fonts

## To get Hot Module Replacement & live reloading to work

Look for the following variable in the **webpack.config.js** file & replace it with your development url.

```javascript
const siteUrl = 'http://localhost/your-site';
```

## Uses Tailwind's JIT mode by default

[More info on JIT here](https://tailwindcss.com/docs/just-in-time-mode)

If you want to disable JIT compilation for Tailwind, just delete the following from the **tailwind.config.js** file:

```javascript
{
	mode: 'jit',
},
```

## Don't wanna use Tailwind?

First you'll also want to delete the **tailwind.scss** file from the **/src/sass** folder & delete the import statement for this file, which can be found in the **index.ts** file as follows:

```javascript
import '../sass/tailwind.scss';
```

Next you'll want to uninstall the following NPM packages:

> tailwindcss

> @tailwindcss/typography

Lastly you'll need to just make sure you remove "**tailwindcss**" from the "postcss-loader" plugins array in webpack.config.js as below:

```javascript
{
	loader: 'postcss-loader',
	options: {
		sourceMap: true,
		postcssOptions: {
			plugins: ['tailwindcss', ...(!isDevelopment ? ['autoprefixer', 'cssnano'] : [])],
		},
	},
},
```

### What's @tailwindcss/typography?

[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)

## Don't wanna use TypeScript?

You can import normal .js files or .ts files into the **index.ts** file, which can be found in the **/src/js** folder. It'll compile just fine with either. Just make sure not to rename the **index.ts** file unless you update your webpack.config.js.

File extensions don't need to be included when importing them to index.ts i.e. can just be referenced like:

```javascript
import './filename';
```

## SVG Files

### Inline SVGs

If you want to inline any SVGs via JS, just place them in a folder called "**inline**" inside the "**svg**" folder. This will allow you to pull in the entire SVG file rather than just referencing it via a link.

### SVG Sprites

I just included this by default because I've found it super handy to work with when needing to re-use custom svg files multiple times (apparently more performant than manually inlining them).

Any .svg files that get added to the **/src/svg** folder, will get added to a combined **"spritemap.svg"** file in the root of the **dist** folder, which lets you inline any svg files just by referencing them using the **use** element.

If you added an svg file called "twitter.svg" to the /src/svg folder for example, you'll then be able to inline it into any file using the below syntax:

```php
<svg>
	<use xlink:href="<?php echo get_template_directory_uri(); ?>/dist/spritemap.svg#sprite-twitter"></use>
</svg>
```

### Don't wanna use SVG sprites?

npm uninstall the following package:

> svg-spritemap-webpack-plugin

Then just remove the following block of code in the webpack.config.js file (mentioned twice):

```javascript
 new SVGSpritemapPlugin('src/svg/**/*.svg', {
		output: {
			svg4everybody: true,
		},
	}),
```

Also remove the "**svg-spritemap-webpack-plugin**" import at the top of the file in case you forget.
