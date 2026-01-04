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
                    'slug' => $entry->slug(),
                ];
            });
    });
});
