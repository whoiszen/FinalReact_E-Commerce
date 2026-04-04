<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WishlistController;
use Illuminate\Support\Facades\Route;

// ── Public ──────────────────────────────────────────────
Route::get('/', [PageController::class, 'welcome'])->name('welcome');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/community', [PageController::class, 'community'])->name('community');

Route::prefix('products')->name('products.')->group(function () {
    Route::get('/',                          [ProductController::class, 'index'])->name('index');
    Route::get('/search',                    [ProductController::class, 'search'])->name('search');
    Route::get('/category/{category}',       [ProductController::class, 'category'])->name('category');
    Route::get('/{product:slug}',            [ProductController::class, 'show'])->name('show');
});

// ── Authenticated (Customer) ─────────────────────────────
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('customer')->group(function () {
        Route::get('/dashboard', [PageController::class, 'dashboard'])->name('dashboard');

        Route::prefix('cart')->name('cart.')->group(function () {
            Route::get('/',                    [CartController::class, 'index'])->name('index');
            Route::post('/add/{product}',      [CartController::class, 'add'])->name('add');
            Route::patch('/update/{cartItem}', [CartController::class, 'update'])->name('update');
            Route::delete('/remove/{cartItem}',[CartController::class, 'remove'])->name('remove');
            Route::delete('/clear',            [CartController::class, 'clear'])->name('clear');
        });

        Route::get('/checkout',         [OrderController::class, 'checkout'])->name('checkout');
        Route::post('/checkout',        [OrderController::class, 'processCheckout'])->name('checkout.process');

        Route::prefix('orders')->name('orders.')->group(function () {
            Route::get('/',                       [OrderController::class, 'index'])->name('index');
            Route::get('/{order}',                [OrderController::class, 'show'])->name('show');
            Route::post('/{order}/cancel',        [OrderController::class, 'cancel'])->name('cancel');
        });

        Route::prefix('wishlist')->name('wishlist.')->group(function () {
            Route::get('/',                       [WishlistController::class, 'index'])->name('index');
            Route::post('/toggle/{product}',      [WishlistController::class, 'toggle'])->name('toggle');
        });
    });
});

// ── Admin ────────────────────────────────────────────────
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {

    Route::get('/', [Admin\DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('products')->name('products.')->group(function () {
        Route::get('/',                             [Admin\ProductController::class, 'index'])->name('index');
        Route::get('/create',                       [Admin\ProductController::class, 'create'])->name('create');
        Route::post('/',                            [Admin\ProductController::class, 'store'])->name('store');
        Route::get('/{product}/edit',               [Admin\ProductController::class, 'edit'])->name('edit');
        Route::put('/{product}',                    [Admin\ProductController::class, 'update'])->name('update');
        Route::delete('/{product}',                 [Admin\ProductController::class, 'destroy'])->name('destroy');
        Route::post('/{product}/toggle-active',     [Admin\ProductController::class, 'toggleActive'])->name('toggle-active');
        Route::delete('/{product}/remove-image',    [Admin\ProductController::class, 'removeImage'])->name('remove-image');
    });

    Route::prefix('orders')->name('orders.')->group(function () {
        Route::get('/',                             [Admin\OrderController::class, 'index'])->name('index');
        Route::get('/{order}',                      [Admin\OrderController::class, 'show'])->name('show');
        Route::put('/{order}/status',               [Admin\OrderController::class, 'updateStatus'])->name('update-status');
    });
});

require __DIR__ . '/auth.php';
