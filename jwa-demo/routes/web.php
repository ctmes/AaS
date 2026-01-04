<?php

use Illuminate\Support\Facades\Route;

// Route::statamic('example', 'example-view', [
//    'title' => 'Example'
// ]);

Route::get('debug-config', function () {
    return [
        'api_enabled' => config('statamic.api.enabled'),
        'api_route' => config('statamic.api.route'),
        'api_middleware' => config('statamic.api.middleware'),
        'collections' => \Statamic\Facades\Collection::all()->map->handle()->values(),
        'env_api_enabled' => env('STATAMIC_API_ENABLED'),
    ];
});
