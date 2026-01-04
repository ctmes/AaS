<?php

use Illuminate\Support\Facades\Route;

// Route::statamic('example', 'example-view', [
//    'title' => 'Example'
// ]);

Route::group(['prefix' => 'custom-api'], function () {
    Route::get('posts', function () {
        return \Statamic\Facades\Entry::query()
            ->where('collection', 'posts')
            ->where('published', true)
            ->get()
            ->map(function ($entry) {
                return [
                    'id' => $entry->id(),
                    'title' => $entry->get('title'),
                    'excerpt' => $entry->get('excerpt'),
                    'date' => $entry->date(),
                    'slug' => $entry->slug(),
                ];
            });
    });

    Route::get('posts/{slug}', function ($slug) {
        $entry = \Statamic\Facades\Entry::query()
            ->where('collection', 'posts')
            ->where('slug', $slug)
            ->where('published', true)
            ->first();

        if (!$entry) {
            abort(404);
        }

        return [
            'id' => $entry->id(),
            'title' => $entry->get('title'),
            'excerpt' => $entry->get('excerpt'),
            'content' => $entry->get('content'),
            'date' => $entry->date(),
            'slug' => $entry->slug(),
        ];
    });

    Route::get('products', function () {
        return \Statamic\Facades\Entry::query()
            ->where('collection', 'products')
            ->where('published', true)
            ->get()
            ->map(function ($entry) {
                return [
                    'id' => $entry->id(),
                    'title' => $entry->get('title'),
                    'description' => $entry->get('description'),
                    'price' => $entry->get('price'),
                    'gallery' => collect($entry->get('gallery'))->map(fn($img) => \Statamic\Facades\Asset::find($img)?->absoluteUrl())->filter()->values(),
                    'slug' => $entry->slug(),
                ];
            });
    });

    Route::get('products/{slug}', function ($slug) {
        $entry = \Statamic\Facades\Entry::query()
            ->where('collection', 'products')
            ->where('slug', $slug)
            ->where('published', true)
            ->first();

        if (!$entry) {
            abort(404);
        }

        return [
            'id' => $entry->id(),
            'title' => $entry->get('title'),
            'description' => $entry->get('description'),
            'price' => $entry->get('price'),
            'content' => $entry->get('content'),
            'gallery' => collect($entry->get('gallery'))->map(fn($img) => \Statamic\Facades\Asset::find($img)?->absoluteUrl())->filter()->values(),
            'slug' => $entry->slug(),
        ];
    });
});
