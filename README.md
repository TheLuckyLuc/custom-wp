# Brace Starter WP Theme

## Supports (so far)

-   Tailwind
-   Sass
-   TypeScript
-   SVG Sprites

## Scripts

#### For development

> npm run dev

#### For production

> npm run build

(You'll want to make sure you run the build script before putting anything live if you're using Tailwind, as this will purge any unused classes, which will otherwise massively bloat your project).

## Don't wanna use Tailwind?

You'll want to uninstall the following packages:

> tailwindcss
> @tailwindcss/typography

You'll also want to remove the below statements from the index.scss file found in the /src folder.

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

Lastly you'll need to just make sure you remove "**tailwindcss**" from the "postcss-loader" plugins array in webpack.config.js as below:

    {
        loader: 'postcss-loader',
        options: {
    	    sourceMap: true,
    	    postcssOptions: {
    			plugins: ['tailwindcss', ...(!isDevelopment  ? ['autoprefixer', 'cssnano'] : [])],
    		},
    	},
    },

### What's @tailwindcss/typography?

[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)

## Don't wanna use TypeScript?

You can import normal .js files or .ts files into the **index.ts** file, which can be found in the **/src/js** folder. It'll compile just fine with either. Just make sure not to rename the **index.ts** file unless you update your webpack.config.js.

## SVG Sprites

I just included this by default because I've found it super handy to work with when needing to re-use custom svg files multiple times (apparently more performant than manually inlining them).

Any .svg files that get added to the **/src/img** folder, will get added to a combined **"spritemap.svg"** file in the **dist** folder, which lets you inline any svg files just by referencing them using the **use** element.

If you added an svg file called "twitter.svg" to the /src/img folder for example, you'll then be able to inline it into any file using the below syntax:

    <svg>
        <use xlink:href="<?php echo get_template_directory_uri(); ?>/dist/js/spritemap.svg#sprite-twitter"></use>
    </svg>
